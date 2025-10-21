import { authApi } from "../api";
import { ENDPOINTS } from "../constants";

type LoginProps = {
  email: string;
  password: string;
};

export type RegisterProps = {
  fullName: string;
  email: string;
  passwordHash: string;
  birthDate: string;
};

type VerificationProps = {
  email: string;
  otpCode: string;
};

type ConfirmResetProps = {
  token: string;
  newPassword: string;
};

type UserPreferenceProps = {
  userId?: number;
  preferredPlaceTypes: string;
  preferredPriceRange: string;
  preferredLocation: string;
  goingWith: string;
  purpose: string;
  requiredFeatures: string;
  note: string;
  venueAtmosphere: string;
  cuisineType: string;
  visitTime: string;
};

export const signIn = async (body: LoginProps): Promise<any> => {
  try {
    const response = await authApi.post(`${ENDPOINTS.LOGIN}`, body);
    return response.data;
  } catch (error) {
    console.log("Error fetching api: ", ENDPOINTS.LOGIN);
    throw error;
  }
};

export const signUp = async (body: RegisterProps): Promise<any> => {
  try {
    const response = await authApi.post(`${ENDPOINTS.REGISTER}`, body);
    return response.data;
  } catch (error) {
    console.log("Error fetching api: ", ENDPOINTS.REGISTER);
    throw error;
  }
};

export const verifyAccount = async (body: VerificationProps): Promise<any> => {
  try {
    const response = await authApi.post(`${ENDPOINTS.VERIFY_ACCOUNT}`, body);
    return response.data;
  } catch (error) {
    console.log("Error fetching at: ", ENDPOINTS.VERIFY_ACCOUNT);
    throw error;
  }
};

export const sendResetPassworCode = async (email: string): Promise<any> => {
  try {
    const response = await authApi.post(`${ENDPOINTS.SEND_RESET_PW_CODE}`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching at: ", ENDPOINTS.SEND_RESET_PW_CODE);
    throw error;
  }
};

export const getUserInfo = async (id: number): Promise<any> => {
  try {
    const response = await authApi.get(`${ENDPOINTS.GET_USER_PROFILE}/${id}`);
    return response.data;
  } catch (error: any) {
    console.log("Error fetching profile detail: ", error);
    throw new Error(error.response?.data?.message || "Failed to get profile");
  }
};

export const checkResetPassworCode = async (
  body: ConfirmResetProps
): Promise<any> => {
  try {
    const response = await authApi.post(
      `${ENDPOINTS.CHECK_RESET_PW_CODE}`,
      body
    );
    return response.data;
  } catch (error: any) {
    console.log("Error fetching at: ", ENDPOINTS.CHECK_RESET_PW_CODE);
    throw new Error(
      error.response?.data?.message || "Failed to check reset password code"
    );
  }
};

export const createUserPreference = async (body: UserPreferenceProps) => {
  try {
    const response = await authApi.post(ENDPOINTS.CREATE_USER_PREFERENCE, body);
    return response.data;
  } catch (error: any) {
    console.log("Error fetching at: ", ENDPOINTS.CHECK_RESET_PW_CODE);
    throw new Error(
      error.response?.data?.message || "Failed to create user preferences"
    );
  }
};
