import { RootStackParamList } from "@/common/types/rootParamList";
import { Button } from "@/components/ui/Button";
import { useProfile } from "@/contexts/ProfileContext";
import { useTheme } from "@/contexts/ThemeContext";
import { homePageStyles } from "@/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomePage = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const { profile } = useProfile();

  // Animation values
  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(50);
  const scale = useSharedValue(0.8);
  const rotate = useSharedValue(0);

  useEffect(() => {
    // Trigger animations on mount
    fadeIn.value = withTiming(1, { duration: 800 });
    slideUp.value = withSpring(0, { damping: 15, stiffness: 150 });
    scale.value = withDelay(
      200,
      withSpring(1, { damping: 12, stiffness: 100 })
    );
    rotate.value = withDelay(
      400,
      withSpring(360, { damping: 10, stiffness: 80 })
    );
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
      transform: [
        { translateY: slideUp.value },
        { scale: interpolate(fadeIn.value, [0, 1], [0.9, 1]) },
      ],
    };
  });

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
      transform: [{ scale: scale.value }, { translateY: slideUp.value * 0.5 }],
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  const buttonContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
      transform: [
        { translateY: slideUp.value * 0.3 },
        { scale: interpolate(fadeIn.value, [0, 1], [0.95, 1]) },
      ],
    };
  });

  return (
    <SafeAreaView
      style={[homePageStyles.container, { backgroundColor: colors.background }]}
    >
      <View style={homePageStyles.content}>
        <Animated.View style={[homePageStyles.header, headerAnimatedStyle]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Ionicons
              name="hand-right"
              size={24}
              color={colors.textSecondary}
              style={{ marginRight: 8 }}
            />
            <Text
              style={[homePageStyles.greeting, { color: colors.textSecondary }]}
            >
              Welcome back
            </Text>
          </View>
          <Text style={[homePageStyles.title, { color: colors.text }]}>
            {profile.name}!
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            homePageStyles.heroCard,
            { backgroundColor: colors.card, shadowColor: colors.text },
            cardAnimatedStyle,
          ]}
        >
          <Animated.View style={iconAnimatedStyle}>
            <Ionicons
              name="rocket"
              size={32}
              color={colors.primary}
              style={{ marginBottom: 12 }}
            />
          </Animated.View>
          <Text style={[homePageStyles.heroTitle, { color: colors.text }]}>
            Ready to explore?
          </Text>
          <Text
            style={[
              homePageStyles.heroSubtitle,
              { color: colors.textSecondary },
            ]}
          >
            Manage your profile and customize your experience
          </Text>
        </Animated.View>

        <Animated.View
          style={[homePageStyles.buttonContainer, buttonContainerAnimatedStyle]}
        >
          <Button
            title="View Profile"
            onPress={() => navigation.navigate("Profile")}
            icon={<Ionicons name="person" size={20} color="#FFFFFF" />}
            style={homePageStyles.button}
          />
          <Button
            title="Settings"
            onPress={() => navigation.navigate("Settings")}
            variant="secondary"
            icon={
              <Ionicons
                name="settings"
                size={20}
                color={colors.textSecondary}
              />
            }
            style={homePageStyles.button}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
