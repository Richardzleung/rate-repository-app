import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node{
          language,
          name,
          ratingAverage,
          reviewCount, 
          ownerName, 
          description, 
          forksCount, 
          stargazersCount,
          id
        }
      }
    }
  }
`;

export const LOGIN = gql`
  query {
    authorizedUser {
      id
      username
  }
}
`;

export const GET_ONE_REPOSITORY=gql`
  query getRepository($id: ID!){
    repository(id: $id){
      id
      fullName
      url
  }
}
`;