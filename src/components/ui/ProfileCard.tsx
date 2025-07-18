import { UserProfile } from "@/contexts/ProfileContext";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface ProfileCardProps {
  profile?: UserProfile;
  showEdit?: boolean;
  onEdit?: () => void;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  const { colors } = useTheme();

  // Animation values
  const fadeIn = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const avatarScale = useSharedValue(0);
  const statsOpacity = useSharedValue(0);
  const slideUp = useSharedValue(30);

  useEffect(() => {
    // Trigger animations on mount
    fadeIn.value = withTiming(1, { duration: 600 });
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    avatarScale.value = withDelay(
      200,
      withSpring(1, { damping: 10, stiffness: 100 })
    );
    statsOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
    slideUp.value = withSpring(0, { damping: 15, stiffness: 150 });
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
      transform: [{ scale: scale.value }, { translateY: slideUp.value }],
    };
  });

  const avatarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: avatarScale.value }],
    };
  });

  const statsAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: statsOpacity.value,
      transform: [
        { translateY: interpolate(statsOpacity.value, [0, 1], [20, 0]) },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          shadowColor: colors.text,
        },
        cardAnimatedStyle,
      ]}
    >
      <Animated.View style={[styles.avatarContainer, avatarAnimatedStyle]}>
        <View style={[styles.avatarBorder, { borderColor: colors.primary }]}>
          <Image source={{ uri: profile?.avatar }} style={styles.avatar} />
        </View>
        <View
          style={[styles.onlineIndicator, { backgroundColor: "#4CAF50" }]}
        />
      </Animated.View>

      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.text }]}>
          {profile?.name}
        </Text>
        <Text style={[styles.bio, { color: colors.textSecondary }]}>
          {profile?.bio}
        </Text>
        <Animated.View style={[styles.statsContainer, statsAnimatedStyle]}>
          <View style={styles.statItem}>
            <Ionicons
              name="document-text"
              size={20}
              color={colors.primary}
              style={{ marginBottom: 4 }}
            />
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              12
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Posts
            </Text>
          </View>
          <View
            style={[
              styles.statDivider,
              { backgroundColor: colors.textSecondary + "30" },
            ]}
          />
          <View style={styles.statItem}>
            <Ionicons
              name="people"
              size={20}
              color={colors.primary}
              style={{ marginBottom: 4 }}
            />
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              128
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Following
            </Text>
          </View>
          <View
            style={[
              styles.statDivider,
              { backgroundColor: colors.textSecondary + "30" },
            ]}
          />
          <View style={styles.statItem}>
            <Ionicons
              name="heart"
              size={20}
              color={colors.primary}
              style={{ marginBottom: 4 }}
            />
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              1.2k
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Followers
            </Text>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 28,
    borderRadius: 24,
    marginVertical: 16,
    alignItems: "center",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  avatarContainer: {
    marginBottom: 24,
    position: "relative",
  },
  avatarBorder: {
    padding: 5,
    borderRadius: 68,
    borderWidth: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#E5E5E5",
  },
  onlineIndicator: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    bottom: 8,
    right: 8,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  infoContainer: {
    alignItems: "center",
    width: "100%",
  },
  name: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  bio: {
    fontSize: 17,
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 24,
    paddingHorizontal: 16,
    letterSpacing: 0.2,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 8,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  statDivider: {
    width: 1,
    height: 45,
    marginHorizontal: 20,
    alignSelf: "center",
  },
});
