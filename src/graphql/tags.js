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

export const CREATE_TAG = gql`
  mutation createTag($hashtag: String!, $notes: String) {
    createTag(hashtag: $hashtag, notes: $notes) {
      id
      hashtag
      notes
    }
  }
`;
