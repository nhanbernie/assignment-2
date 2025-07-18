import { RootStackParamList } from "@/common/types/rootParamList";
import { Button } from "@/components/ui/Button";
import { ThemeToggleSwitch } from "@/components/ui/ThemeToggleSwitch";
import { useTheme } from "@/contexts/ThemeContext";
import { settingsPageStyles } from "@/styles";
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

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Settings"
>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

const SettingsPage = ({ navigation }: Props) => {
  const { colors, isDark, toggleTheme } = useTheme();

  // Animation values
  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(40);
  const scale = useSharedValue(0.9);
  const iconRotate = useSharedValue(0);

  useEffect(() => {
    // Trigger animations on mount
    fadeIn.value = withTiming(1, { duration: 700 });
    slideUp.value = withSpring(0, { damping: 15, stiffness: 150 });
    scale.value = withDelay(
      200,
      withSpring(1, { damping: 12, stiffness: 100 })
    );
    iconRotate.value = withDelay(
      300,
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

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${iconRotate.value}deg` }],
    };
  });

  const settingsAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
      transform: [{ scale: scale.value }, { translateY: slideUp.value * 0.5 }],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
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
      style={[
        settingsPageStyles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View style={settingsPageStyles.content}>
        <Animated.View style={[settingsPageStyles.header, headerAnimatedStyle]}>
          <Animated.View style={iconAnimatedStyle}>
            <Ionicons
              name="settings"
              size={32}
              color={colors.primary}
              style={{ marginBottom: 8 }}
            />
          </Animated.View>
          <Text style={[settingsPageStyles.title, { color: colors.text }]}>
            Settings
          </Text>
        </Animated.View>
        <Animated.View
          style={[settingsPageStyles.settingsContainer, settingsAnimatedStyle]}
        >
          <ThemeToggleSwitch value={isDark} onValueChange={toggleTheme} />
        </Animated.View>
        <Animated.View
          style={[settingsPageStyles.buttonContainer, buttonAnimatedStyle]}
        >
          <Button
            title="Back to Home"
            onPress={() => navigation.goBack()}
            variant="secondary"
            icon={
              <Ionicons name="home" size={20} color={colors.textSecondary} />
            }
            style={settingsPageStyles.button}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsPage;
