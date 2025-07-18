import { UserProfile } from "@/contexts/ProfileContext";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface ProfileListItemProps {
  profile: UserProfile;
  index: number;
  onPress: (profile: UserProfile) => void;
}

export const ProfileListItem = ({
  profile,
  index,
  onPress,
}: ProfileListItemProps) => {
  const { colors } = useTheme();

  // Animation values
  const fadeIn = useSharedValue(0);
  const slideX = useSharedValue(-50);
  const scale = useSharedValue(0.9);
  const pressScale = useSharedValue(1);

  useEffect(() => {
    // Staggered animation based on index
    const delay = index * 100;
    fadeIn.value = withDelay(delay, withTiming(1, { duration: 600 }));
    slideX.value = withDelay(
      delay,
      withSpring(0, { damping: 15, stiffness: 150 })
    );
    scale.value = withDelay(
      delay,
      withSpring(1, { damping: 12, stiffness: 100 })
    );
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
      transform: [
        { translateX: slideX.value },
        { scale: scale.value * pressScale.value },
      ],
    };
  });

  const avatarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(fadeIn.value, [0, 1], [0.8, 1]) }],
    };
  });

  const handlePressIn = () => {
    pressScale.value = withSpring(0.95, { damping: 15, stiffness: 200 });
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  const handlePress = () => {
    runOnJS(onPress)(profile);
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: colors.card,
            shadowColor: colors.text,
          },
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        activeOpacity={1}
      >
        <Animated.View style={[styles.avatarContainer, avatarAnimatedStyle]}>
          <View style={[styles.avatarBorder, { borderColor: colors.primary }]}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          </View>
          <View
            style={[styles.onlineIndicator, { backgroundColor: "#4CAF50" }]}
          />
        </Animated.View>

        <View style={styles.infoContainer}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {profile.name}
          </Text>
          <Text
            style={[styles.bio, { color: colors.textSecondary }]}
            numberOfLines={2}
          >
            {profile.bio}
          </Text>
        </View>

        <View style={styles.chevronContainer}>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.textSecondary}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatarBorder: {
    padding: 2,
    borderRadius: 32,
    borderWidth: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E5E5E5",
  },
  onlineIndicator: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    bottom: 2,
    right: 2,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  chevronContainer: {
    padding: 4,
  },
});
