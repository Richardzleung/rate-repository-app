import { gql } from 'apollo-boost';

export const AUTHORIZE_USER=gql`
  mutation AuthorizeUser($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password}) {
      accessToken
  }
}
`;

export const CREATE_REVIEW=gql`
  mutation CreateReview($input: CreateReviewInput){
      createReview(review: $input) {
        id,
        rating,
        createdAt,
        text,
        repositoryId
      }
  }
`;

export const CREATE_USER=gql`
  mutation CreateUser($input: CreateUserInput){
    createUser(user: $input){
      id,
      username
    }
  } 
`;