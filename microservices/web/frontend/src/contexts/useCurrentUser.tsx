import React from "react";
import { gql, useQuery } from '@apollo/client';

const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        getCurrentUser {
            id
            name
            email
        }
    }
`;

const onlyCapitalLetters = (str: string) => {
  return (str || '').replace(/[^A-Z]+/g, "");
}

const useCurrentUser = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  return {
    loading,
    error,
    ...data?.getCurrentUser,
    initials: onlyCapitalLetters(data?.getCurrentUser?.name)
  }
}

export default useCurrentUser
