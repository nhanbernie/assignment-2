import { RootStackParamList } from "@/common/types/rootParamList";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/Button";
import { useProfile, UserProfile } from "@/contexts/ProfileContext";
import { useTheme } from "@/contexts/ThemeContext";
import { editProfilePageStyles } from "@/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import validationSchema from "./hooks/validationSchema";
type EditProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditProfile"
>;

interface Props {
  navigation: EditProfileScreenNavigationProp;
}

const EditProfilePage = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const { profile, updateProfile } = useProfile();

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

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
      transform: [{ scale: scale.value }, { translateY: slideUp.value * 0.5 }],
    };
  });

  const handleSubmit = async (values: Pick<UserProfile, "name" | "bio">) => {
    await updateProfile(values);
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={[
        editProfilePageStyles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <ScrollView contentContainerStyle={editProfilePageStyles.content}>
        <Animated.View
          style={[editProfilePageStyles.header, headerAnimatedStyle]}
        >
          <Animated.View style={iconAnimatedStyle}>
            <Ionicons
              name="create"
              size={32}
              color={colors.primary}
              style={{ marginBottom: 8 }}
            />
          </Animated.View>
          <Text style={[editProfilePageStyles.title, { color: colors.text }]}>
            Edit Profile
          </Text>
        </Animated.View>

        <Formik
          initialValues={{
            name: profile.name,
            bio: profile.bio,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Animated.View
              style={[editProfilePageStyles.form, formAnimatedStyle]}
            >
              <FormInput
                label="Full Name"
                value={values.name}
                onChangeText={handleChange("name")}
                placeholder="Enter your full name"
                error={touched.name && errors.name ? errors.name : undefined}
              />
              <FormInput
                label="Bio"
                value={values.bio}
                onChangeText={handleChange("bio")}
                placeholder="Tell us about yourself... What makes you unique?"
                multiline
                numberOfLines={4}
                error={touched.bio && errors.bio ? errors.bio : undefined}
              />
              <View style={editProfilePageStyles.buttonContainer}>
                <Button
                  title="Save Changes"
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                  icon={<Ionicons name="checkmark" size={20} color="#FFFFFF" />}
                  style={editProfilePageStyles.button}
                />

                <Button
                  title="Cancel"
                  onPress={() => navigation.goBack()}
                  variant="secondary"
                  icon={
                    <Ionicons
                      name="close"
                      size={20}
                      color={colors.textSecondary}
                    />
                  }
                  style={editProfilePageStyles.button}
                />
              </View>
            </Animated.View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfilePage;
