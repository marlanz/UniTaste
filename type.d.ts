export interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  style?: string;
  leftIcon?: React.ReactNode;
  textStyle?: string;
  isLoading?: boolean;
}

interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

interface CustomHeaderProps {
  title?: string;
}

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

interface ProfileFieldProps {
  label: string;
  value: string;
  icon: ImageSourcePropType;
}

interface CreateUserPrams {
  email: string;
  password: string;
  name: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface GetMenuParams {
  category: string;
  query: string;
}

export interface Restaurant {
  restaurantId: string;
  name?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  googlePlaceId?: string;
  phone?: string;
  website?: string;
  coverImageUrl?: string;
  googleRating?: number;
  openingHours?: string;
  priceRangeId: number;
  createdAt?: string;
  status?: string;
  bannerAds?: any[];
  bannerBookings?: any[];
  priceRange?: object;
  categories?: any[];
  features?: any[];
  reviews?: object[];
}

export interface Location {
  latitude: number;
  longitude: number;
}
