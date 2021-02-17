import { gql } from 'apollo-boost';

export const REPOSITORY_BASE_FIELDS = gql`
  fragment RepositoryBaseFields on Repository {
    id
    name
    fullName
    stargazersCount
    forksCount
    url
    ownerAvatarUrl
    description
    language
    reviewCount
    ratingAverage
    createdAt
  }
`;

