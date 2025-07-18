import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { mockProfiles } from "@/common/data/mockProfiles";
export interface UserProfile {
  name: string;
  bio: string;
  avatar: string;
}

interface ProfileContextType {
  profile: UserProfile;
  profiles: UserProfile[];
  selectedProfile: UserProfile | null;
  updateProfile: (profile: Partial<UserProfile>) => void;
  selectProfile: (profile: UserProfile) => void;
  isLoading: boolean;
}

const defaultProfile: UserProfile = {
  name: "Alex Johnson",
  bio: "React Native Developer | Tech Enthusiast | Building amazing mobile experiences with passion and creativity",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format&q=80",
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [profiles] = useState<UserProfile[]>(mockProfiles);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem("userProfile");
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const newProfile = { ...profile, ...updates };
      setProfile(newProfile);
      await AsyncStorage.setItem("userProfile", JSON.stringify(newProfile));
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const selectProfile = (profile: UserProfile) => {
    setSelectedProfile(profile);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        profiles,
        selectedProfile,
        updateProfile,
        selectProfile,
        isLoading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
