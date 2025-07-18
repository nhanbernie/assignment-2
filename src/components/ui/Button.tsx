import { useTheme } from "@/contexts/ThemeContext";
import { buttonStyles } from "@/styles";
import React from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline";
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: undefined | React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = ({
  title,
  onPress,
  variant = "primary",
  style,
  textStyle,
  disabled = false,
  icon,
  iconPosition = "left",
}: ButtonProps) => {
  const { colors } = useTheme();

  // Animation values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      duration: 150,
      dampingRatio: 0.8,
    });
    opacity.value = withTiming(0.8, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      duration: 150,
      dampingRatio: 0.8,
    });
    opacity.value = withTiming(1, { duration: 150 });
  };

  const handlePress = () => {
    if (onPress) {
      runOnJS(onPress)();
    }
  };

  const getButtonStyle = () => {
    const baseStyle = {
      backgroundColor: disabled ? colors.textSecondary : colors.primary,
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        };
      case "secondary":
        return {
          backgroundColor: colors.surface,
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: colors.primary,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 2,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return {
          color: "#FFFFFF",
        };
      case "secondary":
        return {
          color: colors.text,
        };
      case "outline":
        return {
          color: colors.primary,
        };
      default:
        return {
          color: "#FFFFFF",
        };
    }
  };
  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity
        style={[buttonStyles.button, getButtonStyle(), style]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={1}
      >
        <View style={buttonStyles.buttonContent}>
          {icon && iconPosition === "left" && (
            <Animated.View style={[buttonStyles.iconContainer, animatedStyle]}>
              {icon}
            </Animated.View>
          )}

          <Text style={[buttonStyles.buttonText, getTextStyle(), textStyle]}>
            {String(title || "")}
          </Text>

          {icon && iconPosition === "right" && (
            <Animated.View style={[buttonStyles.iconContainer, animatedStyle]}>
              {icon}
            </Animated.View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
