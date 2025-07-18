import { StyleSheet } from "react-native";

export const settingsPageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 28,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  settingsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 12,
  },
  button: {
    width: "100%",
  },
  buttonWithIcon: {
    flex: 1,
  },
});
