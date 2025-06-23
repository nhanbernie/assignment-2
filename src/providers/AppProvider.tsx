import { ProfileProvider } from "@/contexts/ProfileContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
