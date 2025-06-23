import { RootStackParamList } from "@/common/types/rootParamList";
import { Button } from "@/components/ui/Button";
import { ThemeToggleSwitch } from "@/components/ui/ThemeToggleSwitch";
import { useTheme } from "@/contexts/ThemeContext";
import { settingsPageStyles } from "@/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
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
  return (
    <SafeAreaView
      style={[
        settingsPageStyles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View style={settingsPageStyles.content}>
        <View style={settingsPageStyles.header}>
          <Ionicons
            name="settings"
            size={32}
            color={colors.primary}
            style={{ marginBottom: 8 }}
          />
          <Text style={[settingsPageStyles.title, { color: colors.text }]}>
            Settings
          </Text>
        </View>
        <View style={settingsPageStyles.settingsContainer}>
          <ThemeToggleSwitch value={isDark} onValueChange={toggleTheme} />
        </View>
        <View style={settingsPageStyles.buttonContainer}>
          <Button
            title="Back to Home"
            onPress={() => navigation.goBack()}
            variant="secondary"
            icon={
              <Ionicons name="home" size={20} color={colors.textSecondary} />
            }
            style={settingsPageStyles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsPage;
