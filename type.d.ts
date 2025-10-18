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

interface CreateUserPrams {
  email: string;
  password: string;
  name: string;
}

interface SignInParams {
  email: string;
  password: string;
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
  categories: Category[];
  features?: any[];
  reviews?: Review[];
}

export interface Category {
  categoryId: number;
  name: string;
  sourceType: string;
}
export interface Location {
  latitude: number;
  longitude: number;
}

export interface Review {
  reviewId: number;
  restaurantId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  photoReviews: any[];
  restaurant: Restaurant;
}
