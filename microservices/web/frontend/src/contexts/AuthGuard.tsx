import React from "react";
import { useRouter } from "next/router";
import useAmplifyUser from "./useAmplifyUser";

export interface AuthGuardContextState {
  loading: boolean;
}

const defaultState: AuthGuardContextState = {
  loading: false,
};
export const AuthGuardContext = React.createContext<AuthGuardContextState>(defaultState);

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard(props: Props) {
  const router = useRouter();
  const isSSR = typeof window === "undefined";
  const pageRequiresAuthenticatedUser = !router.pathname.startsWith("/auth");
  // if our user is authenticated, we will get data back (from either the backend or our local cache).
  // if we do not get data, we are not logged in.
  const { loading, user } = useAmplifyUser();

  if (pageRequiresAuthenticatedUser && (isSSR || loading)) {
    return (
      <AuthGuardContext.Provider
        value={{
          loading: true,
        }}
      >
        {props.children}
      </AuthGuardContext.Provider>
    );
  } else if (pageRequiresAuthenticatedUser && !user) {
    return <div> You must login</div>
  } else {
    return (
      <AuthGuardContext.Provider
        value={{
          loading: false,
        }}
      >
        {props.children}
      </AuthGuardContext.Provider>
    );
  }
}
