import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection }) => {
  const { data, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderDirection, orderBy } 
  });
  console.log('hook',{data});

  return { repositories: data ? data.repositories : undefined, ...result };
};

export default useRepositories;
