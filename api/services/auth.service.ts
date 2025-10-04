import { authApi } from "../api";
import { ENDPOINTS } from "../constants";

type LoginProps = {
  email: string;
  password: string;
};

type RegisterProps = {
  fullName: string;
  email: string;
  passwordHash: string;
  birthDate: "2025-10-01";
};

type VerificationProps = {
  email: string;
  otpCode: string;
};

type ConfirmResetProps = {
  token: "string";
  newPassword: "string";
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
    const response = await authApi.post(
      `${ENDPOINTS.SEND_RESET_PW_CODE}`,
      email
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching at: ", ENDPOINTS.SEND_RESET_PW_CODE);
    throw error;
  }
};

export const checkResetPassworCode = async (body: ConfirmResetProps): Promise<any> => {
  try {
    const response = await authApi.post(
      `${ENDPOINTS.CHECK_RESET_PW_CODE}`,
      body
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching at: ", ENDPOINTS.CHECK_RESET_PW_CODE);
    throw error;
  }
};
