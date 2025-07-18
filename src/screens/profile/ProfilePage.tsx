import { RootStackParamList } from "@/common/types/rootParamList";
import { Button } from "@/components/ui/Button";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { useProfile } from "@/contexts/ProfileContext";
import { useTheme } from "@/contexts/ThemeContext";
import { profilePageStyles } from "@/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
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

  // Animation values
  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(30);
  const buttonScale = useSharedValue(0.9);

  useEffect(() => {
    if (!isLoading) {
      fadeIn.value = withTiming(1, { duration: 600 });
      slideUp.value = withSpring(0, { damping: 15, stiffness: 150 });
      buttonScale.value = withDelay(
        300,
        withSpring(1, { damping: 12, stiffness: 100 })
      );
    }
  }, [isLoading]);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
      transform: [{ translateY: slideUp.value }],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
      transform: [
        { scale: buttonScale.value },
        { translateY: interpolate(fadeIn.value, [0, 1], [20, 0]) },
      ],
    };
  });

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
        <Animated.View style={containerAnimatedStyle}>
          <ProfileCard profile={profile} />
        </Animated.View>
        <Animated.View
          style={[profilePageStyles.buttonContainer, buttonAnimatedStyle]}
        >
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
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
