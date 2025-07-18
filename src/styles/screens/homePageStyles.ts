import { StyleSheet } from "react-native";

export const homePageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  greeting: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 42,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  heroCard: {
    padding: 32,
    borderRadius: 28,
    alignItems: "center",
    marginBottom: 48,
    width: "100%",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    fontSize: 17,
    textAlign: "center",
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 48,
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
    gap: 20,
  },
  button: {
    width: "100%",
  },
});
