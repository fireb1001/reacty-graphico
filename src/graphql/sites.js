import { gql } from "apollo-boost";

export const GET_SITES = gql`
  {
    sites {
      id
      name
      url
      logoUrl
    }
  }
`;

export const CREATE_SITE = gql`
  mutation createSite($name: String!, $url: String!, $logoUrl: String) {
    createSite(name: $name, url: $url, logoUrl: $logoUrl) {
      id
    }
  }
`;
