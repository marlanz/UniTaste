import { getUserInfo } from "@/api/services/auth.service";
import { useCallback, useState } from "react";

interface UserProfile {
  fullName: string;
  email: string;
  avatarUrl?: any;
  bio?: any;
  gender?: any;
  birthDate: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const data = await getUserInfo(id);
      setProfile(data);
      return data;
    } catch (error: any) {
      console.log("Error fetching profile detail", error.message);
      setError("Error fetching profile detail");
    } finally {
    }
  }, []);

  return { profile, loading, error, fetchUserProfile };
};
