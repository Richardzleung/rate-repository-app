import { gql } from 'apollo-boost';

import { REPOSITORY_BASE_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
  repositories {
    edges {
      node {
        ...RepositoryBaseFields
        ratingAverage
        reviewCount
      }
    }
  }
}

${REPOSITORY_BASE_FIELDS}
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
      ...RepositoryBaseFields
  }
}

${REPOSITORY_BASE_FIELDS}
`;