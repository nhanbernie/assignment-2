import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface ThemeToggleSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const ThemeToggleSwitch = ({
  value,
  onValueChange,
}: ThemeToggleSwitchProps) => {
  const { colors } = useTheme();

  // Animation values
  const scale = useSharedValue(1);
  const fadeIn = useSharedValue(0);
  const iconRotate = useSharedValue(0);

  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 500 });
    iconRotate.value = withSpring(value ? 360 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [value]);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
      transform: [{ scale: scale.value }],
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${iconRotate.value}deg` }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
        containerAnimatedStyle,
      ]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
      onTouchCancel={handlePressOut}
    >
      <View style={styles.labelContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Animated.View style={iconAnimatedStyle}>
            <Ionicons
              name={value ? "moon" : "sunny"}
              size={24}
              color={colors.primary}
              style={{ marginRight: 12 }}
            />
          </Animated.View>
          <Text style={[styles.label, { color: colors.text }]}>
            {value ? "Dark Mode" : "Light Mode"}
          </Text>
        </View>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Switch between light and dark theme
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: colors.border,
          true: colors.primary,
        }}
        thumbColor="#FFFFFF"
        ios_backgroundColor={colors.border}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
});
