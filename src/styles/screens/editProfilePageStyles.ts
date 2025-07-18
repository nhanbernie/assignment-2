import { StyleSheet } from "react-native";

export const editProfilePageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 28,
    flexGrow: 1,
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
  form: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 40,
    gap: 20,
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
