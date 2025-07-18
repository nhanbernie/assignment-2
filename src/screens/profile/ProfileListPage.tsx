import { RootStackParamList } from "@/common/types/rootParamList";
import { ProfileListItem } from "@/components/ui/ProfileListItem";
import { useProfile, UserProfile } from "@/contexts/ProfileContext";
import { useTheme } from "@/contexts/ThemeContext";
import { profileListPageStyles } from "@/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type ProfileListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProfileList"
>;

interface Props {
  navigation: ProfileListScreenNavigationProp;
}

const ProfileListPage = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const { profiles, selectProfile } = useProfile();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] =
    useState<UserProfile[]>(profiles);

  // Animation values
  const fadeIn = useSharedValue(0);
  const slideDown = useSharedValue(-30);
  const searchScale = useSharedValue(0.9);

  useEffect(() => {
    // Trigger animations on mount
    fadeIn.value = withTiming(1, { duration: 800 });
    slideDown.value = withSpring(0, { damping: 15, stiffness: 150 });
    searchScale.value = withDelay(
      200,
      withSpring(1, { damping: 12, stiffness: 100 })
    );
  }, []);

  useEffect(() => {
    // Filter profiles based on search query
    if (searchQuery.trim() === "") {
      setFilteredProfiles(profiles);
    } else {
      const filtered = profiles.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.bio.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProfiles(filtered);
    }
  }, [searchQuery, profiles]);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
      transform: [
        { translateY: slideDown.value },
        { scale: interpolate(fadeIn.value, [0, 1], [0.9, 1]) },
      ],
    };
  });

  const searchAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
      transform: [{ scale: searchScale.value }],
    };
  });

  const handleProfilePress = (profile: UserProfile) => {
    selectProfile(profile);
    navigation.navigate("Profile");
  };

  const renderProfileItem = ({
    item,
    index,
  }: {
    item: UserProfile;
    index: number;
  }) => (
    <ProfileListItem
      profile={item}
      index={index}
      onPress={handleProfilePress}
    />
  );

  const renderEmptyState = () => (
    <View style={profileListPageStyles.emptyContainer}>
      <Ionicons name="search" size={64} color={colors.textSecondary} />
      <Text style={[profileListPageStyles.emptyText, { color: colors.text }]}>
        No profiles found
      </Text>
      <Text
        style={[
          profileListPageStyles.emptySubtext,
          { color: colors.textSecondary },
        ]}
      >
        Try adjusting your search terms to find what you're looking for
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        profileListPageStyles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Animated.View
        style={[profileListPageStyles.header, headerAnimatedStyle]}
      >
        <Ionicons
          name="people"
          size={32}
          color={colors.primary}
          style={{ marginBottom: 8 }}
        />
        <Text style={[profileListPageStyles.title, { color: colors.text }]}>
          Discover Profiles
        </Text>
        <Text
          style={[
            profileListPageStyles.subtitle,
            { color: colors.textSecondary },
          ]}
        >
          Connect with amazing people in our community
        </Text>
      </Animated.View>

      <Animated.View
        style={[profileListPageStyles.searchContainer, searchAnimatedStyle]}
      >
        <TextInput
          style={[
            profileListPageStyles.searchInput,
            {
              backgroundColor: colors.surface,
              color: colors.text,
              shadowColor: colors.text,
            },
          ]}
          placeholder="Search profiles..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </Animated.View>

      <View style={profileListPageStyles.listContainer}>
        <FlatList
          data={filteredProfiles}
          renderItem={renderProfileItem}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          contentContainerStyle={profileListPageStyles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileListPage;
