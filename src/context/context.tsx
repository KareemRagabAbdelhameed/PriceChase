// src/context/UserContext.tsx
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// src/context/interfaces.ts
export interface IUser {
  id: string;
  firstName: string;
  email: string;
  role: 'user' | 'admin' | "";
  profilePicture?: {
    url: string;
  };
  // Add other user properties as needed
}

export interface IUserContext {
  auth: IUser | null;
  setAuth: React.Dispatch<React.SetStateAction<IUser | null>>;
  adminAuth: IUser | null;
  setAdminAuth: React.Dispatch<React.SetStateAction<IUser | null>>;
  profilePicture: string;
  setProfilePicture: React.Dispatch<React.SetStateAction<string>>;
}

export interface IProps {
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContext | null>(null);

export const UserProvider: React.FC<IProps> = ({ children }) => {
  const [auth, setAuth] = useState<IUser | null>(null);
  const [adminAuth, setAdminAuth] = useState<IUser | null>(null);
  const [profilePicture, setProfilePicture] = useState("");

  // Load state from cookies on initial render
  useEffect(() => {
    const loadFromCookies = () => {
      try {
        const storedAuth = Cookies.get("auth");
        const storedAdminAuth = Cookies.get("adminAuth");
        const storedProfilePicture = Cookies.get("profilePicture");

        if (storedAuth) {
          setAuth(JSON.parse(storedAuth));
        }
        if (storedAdminAuth) {
          setAdminAuth(JSON.parse(storedAdminAuth));
        }
        if (storedProfilePicture) {
          setProfilePicture(storedProfilePicture);
        }
      } catch (error) {
        console.error("Failed to parse cookie data:", error);
        // Clear invalid cookies
        Cookies.remove("auth");
        Cookies.remove("adminAuth");
        Cookies.remove("profilePicture");
      }
    };

    loadFromCookies();
  }, []);

  // Save state to cookies whenever it changes
  useEffect(() => {
    if (auth) {
      Cookies.set("auth", JSON.stringify(auth), { expires: 7, secure: true });
    } else {
      Cookies.remove("auth");
    }
  }, [auth]);

  useEffect(() => {
    if (adminAuth) {
      Cookies.set("adminAuth", JSON.stringify(adminAuth), { 
        expires: 7, 
        secure: true 
      });
    } else {
      Cookies.remove("adminAuth");
    }
  }, [adminAuth]);

  useEffect(() => {
    if (profilePicture) {
      Cookies.set("profilePicture", profilePicture, { expires: 7 });
    } else {
      Cookies.remove("profilePicture");
    }
  }, [profilePicture]);

  return (
    <UserContext.Provider
      value={{
        auth,
        setAuth,
        adminAuth: adminAuth,
        setAdminAuth: setAdminAuth,
        profilePicture,
        setProfilePicture,
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};