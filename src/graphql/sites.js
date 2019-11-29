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

export const UPDATE_SITE = gql`
  mutation updateSite($id: ID!, $name: String, $url: String, $logoUrl: String) {
    updateSite(id: $id, name: $name, url: $url, logoUrl: $logoUrl) {
      id
      name
      url
      logoUrl
    }
  }
`;
