import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
  button: {
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
});
