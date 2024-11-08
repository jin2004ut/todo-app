import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation createTodo($createTodoInput: CreateTodoInput!) {
    createTodo(
      createTodoInput: $createTodoInput
    ) {
      id
      title
      content
      deadline
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($updateTodoInput: UpdateTodoInput!) {
    updateTodo(updateTodoInput:
      $updateTodoInput
    ) {
      id
      title
      content
      deadline
    }
  }
`;

export const DELETE_TODO = gql`
  mutation removeTodo($id: Int!) {
    removeTodo(id: $id) {
      id
      title
      content
      deadline
    }
  }
`;