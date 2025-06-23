import { RootStackParamList } from "@/common/types/rootParamList";
import { Button } from "@/components/ui/Button";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { useProfile } from "@/contexts/ProfileContext";
import { useTheme } from "@/contexts/ThemeContext";
import { profilePageStyles } from "@/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfilePage = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const { profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <SafeAreaView
        style={[
          profilePageStyles.container,
          { backgroundColor: colors.background },
        ]}
      >
        <View style={profilePageStyles.centerContainer}></View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        profilePageStyles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <ScrollView contentContainerStyle={profilePageStyles.content}>
        <ProfileCard profile={profile} />
        <View style={profilePageStyles.buttonContainer}>
          <Button
            title="Edit Profile"
            onPress={() => navigation.navigate("EditProfile")}
            icon={<Ionicons name="create" size={20} color="#FFFFFF" />}
            style={profilePageStyles.button}
          />
          <Button
            title="Back to Home"
            onPress={() => navigation.goBack()}
            variant="secondary"
            icon={
              <Ionicons name="home" size={20} color={colors.textSecondary} />
            }
            style={profilePageStyles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
