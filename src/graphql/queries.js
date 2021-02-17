import { gql } from 'apollo-boost';

import { REPOSITORY_BASE_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderDirection: OrderDirection 
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $after: String
    $first: Int
    ) {
      repositories(
        orderDirection: $orderDirection,
        orderBy: $orderBy
        searchKeyword: $searchKeyword
        after: $after
        first: $first
      ) {
        edges {
          node {
            ...RepositoryBaseFields
          }
          cursor
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
    }

${REPOSITORY_BASE_FIELDS}
`;

export const GET_ONE_REPOSITORY=gql`
  query getRepository(
    $id: ID!
    $after: String
    $first: Int
    ) {
      repository( id: $id ){
        reviews(after: $after, first: $first) {
          edges {
            node {
              id
              text
              rating
              createdAt
              user {
                id
                username
              }
            }
            cursor
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
          }
        }
      ...RepositoryBaseFields
      }
}
${REPOSITORY_BASE_FIELDS}
`;

export const GET_AUTHORIZED_USER=gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      # user fields...
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            text
            createdAt
            repository {
              fullName
              id
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
}
`;