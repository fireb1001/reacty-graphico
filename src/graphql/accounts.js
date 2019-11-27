import { gql } from "apollo-boost";

export const GET_ACCOUNTS = gql`
  {
    accounts {
      login
      passhint
    }
  }
`;
