import { useTheme } from "@/contexts/ThemeContext";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
}

export const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  error,
}: FormInputProps) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  // Animation values
  const focusScale = useSharedValue(1);
  const focusProgress = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: focusScale.value }],
    };
  });

  const animatedInputStyle = useAnimatedStyle(() => {
    const borderColor = error
      ? "#FF3B30"
      : interpolateColor(
          focusProgress.value,
          [0, 1],
          [colors.border, colors.primary]
        );

    return {
      borderColor,
      shadowOpacity: withTiming(isFocused ? 0.15 : 0.05, { duration: 200 }),
    };
  });

  const handleFocus = () => {
    setIsFocused(true);
    focusScale.value = withSpring(1.02, { damping: 15, stiffness: 200 });
    focusProgress.value = withTiming(1, { duration: 200 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusScale.value = withSpring(1, { damping: 15, stiffness: 200 });
    focusProgress.value = withTiming(0, { duration: 200 });
  };

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>

      <Animated.View>
        <TextInput
          style={[
            styles.input,
            multiline && styles.multilineInput,
            {
              backgroundColor: colors.surface,
              color: colors.text,
            },
            animatedInputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? "top" : "center"}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Animated.View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 18,
    fontSize: 16,
    minHeight: 60,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    letterSpacing: 0.5,
  },
  multilineInput: {
    minHeight: 130,
    paddingTop: 18,
    textAlignVertical: "top",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 8,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
