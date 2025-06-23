import { UserProfile } from "@/contexts/ProfileContext";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface ProfileCardProps {
  profile?: UserProfile;
  showEdit?: boolean;
  onEdit?: () => void;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          shadowColor: colors.text,
        },
      ]}
    >
      <View style={styles.avatarContainer}>
        <View style={[styles.avatarBorder, { borderColor: colors.primary }]}>
          <Image source={{ uri: profile?.avatar }} style={styles.avatar} />
        </View>
        <View
          style={[styles.onlineIndicator, { backgroundColor: "#4CAF50" }]}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.text }]}>
          {profile?.name}
        </Text>
        <Text style={[styles.bio, { color: colors.textSecondary }]}>
          {profile?.bio}
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="document-text" size={20} color={colors.primary} style={{ marginBottom: 4 }} />
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              12
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Posts
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="people" size={20} color={colors.primary} style={{ marginBottom: 4 }} />
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              128
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Following
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="heart" size={20} color={colors.primary} style={{ marginBottom: 4 }} />
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              1.2k
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Followers
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 20,
    marginVertical: 12,
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarContainer: {
    marginBottom: 20,
    position: "relative",
  },
  avatarBorder: {
    padding: 4,
    borderRadius: 60,
    borderWidth: 3,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E5E5E5",
  },
  onlineIndicator: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    bottom: 8,
    right: 8,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  infoContainer: {
    alignItems: "center",
    width: "100%",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 16,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 16,
  },
});
