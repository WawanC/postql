import { gql } from "@apollo/client";

export const GET_POSTS_QUERY = gql`
  query getPosts {
    getPosts {
      id
      title
      description
      image
    }
  }
`;

export const CREATE_POST_QUERY = gql`
  mutation CreatePost($title: String!, $description: String!, $image: Upload) {
    createPost(title: $title, description: $description, image: $image)
  }
`;

export const NEW_POST_SUBSCRIPTION_QUERY = gql`
  subscription Subscription {
    newPostSubscription {
      id
      title
      description
      image
    }
  }
`;
