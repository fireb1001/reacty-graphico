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
        id
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

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($id: ID!) {
    deleteAccount(id: $id) {
      id
    }
  }
`;

export const UPDATE_ACCOUNT = gql`
  mutation updateAccount(
    $id: ID!
    $login: String
    $passhint: String
    $site: ID
    $tags: [ID!]
  ) {
    updateAccount(
      id: $id
      login: $login
      passhint: $passhint
      site: $site
      tags: $tags
    ) {
      id
    }
  }
`;
