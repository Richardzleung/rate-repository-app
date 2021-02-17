import { useQuery } from '@apollo/react-hooks';

import { GET_ONE_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
  const { data, loading, fetchMore,...result } = useQuery(GET_ONE_REPOSITORY, {
    variables
  });
  
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    console.log({canFetchMore});
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_ONE_REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges
              ],
            },
          },
        };
        console.log({nextResult});
        return nextResult;
      },
    });
  };

  return { 
    repository: data ? data.repository : undefined, 
    fetchMore: handleFetchMore,
    loading: loading,
    ...result 
  };
};

export default useRepository;
