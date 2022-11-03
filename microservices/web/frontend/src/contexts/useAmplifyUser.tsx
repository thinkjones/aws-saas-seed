import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";

export default function useAmplifyUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get the current logged in user info
  const getUser = async () => {
    const user = await Auth.currentUserInfo();
    if (user) setUser(user);
    setLoading(false);
  };

  // Logout the authenticated user
  const signOut = async () => {
    await Auth.signOut();
    setUser(null);
  };

  // Check if there's any user on mount
  useEffect(() => {
    getUser();
  }, []);

  return {
    loading,
    user,
    signOut
  };
}
