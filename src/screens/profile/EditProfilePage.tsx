import { RootStackParamList } from "@/common/types/rootParamList";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/Button";
import { useProfile, UserProfile } from "@/contexts/ProfileContext";
import { useTheme } from "@/contexts/ThemeContext";
import { editProfilePageStyles } from "@/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React from "react";
import { ScrollView, Text, View } from "react-native";
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
        <View style={editProfilePageStyles.header}>
          <Ionicons
            name="create"
            size={32}
            color={colors.primary}
            style={{ marginBottom: 8 }}
          />
          <Text style={[editProfilePageStyles.title, { color: colors.text }]}>
            Edit Profile
          </Text>
        </View>

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
            <View style={editProfilePageStyles.form}>
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
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfilePage;
