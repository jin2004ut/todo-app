import { gql } from "@apollo/client";

export const LIST_TODOS = gql`
  query {
    todos {
      id
      title
      content
      deadline
    }
  }
`;