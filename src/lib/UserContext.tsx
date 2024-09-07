"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUser } from "@/lib/actions/user.action";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>; // Function to refetch user
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const response = await getUser();
      setUser(response);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  // Refresh user data when needed
  const refreshUser = async () => {
    await fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
