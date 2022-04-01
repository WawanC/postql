import { gql } from "@apollo/client";

export const GET_POSTS_QUERY = gql`
  query getPosts {
    getPosts {
      id
      title
      description
    }
  }
`;

export const CREATE_POST_QUERY = gql`
  mutation CreatePost($title: String!, $description: String!) {
    createPost(title: $title, description: $description)
  }
`;

export const NEW_POST_SUBSCRIPTION_QUERY = gql`
  subscription Subscription {
    newPostSubscription {
      id
      title
      description
    }
  }
`;
