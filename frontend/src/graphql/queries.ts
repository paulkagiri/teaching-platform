import { gql } from "@apollo/client";

/**
 * GraphQL query to fetch books.
 */
export const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;
