import { gql } from "apollo-boost";

export const GET_TAGS = gql`
  {
    tags {
      id
      hashtag
      notes
    }
  }
`;
