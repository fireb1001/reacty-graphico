import { gql } from "apollo-boost";

export const GET_ACCOUNTS = gql`
  {
    accounts {
      id
      login
      passhint
      site {
        id
        name
      }
      tags {
        hashtag
      }
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount($login: String!, $passhint: String!, $site: ID) {
    createAccount(login: $login, passhint: $passhint, site: $site) {
      id
    }
  }
`;
