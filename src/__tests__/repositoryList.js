import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { RepositoryListContainer } from '../components/RepositoryList';
import { SignInContainer } from '../components/SignInForm';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // eslint-disable-next-line no-unused-vars
      const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      //debug();
      
      expect(getAllByTestId("full-name")[0]).toHaveTextContent("jaredpalmer/formik");
      expect(getAllByTestId("full-name")[1]).toHaveTextContent("async-library/react-async");
      expect(getAllByTestId("description")[0]).toHaveTextContent("Build forms in React, without the tears");
      expect(getAllByTestId("description")[1]).toHaveTextContent("Flexible promise-based React data loader");
      expect(getAllByTestId("stars")[0]).toHaveTextContent("21.9k");
      expect(getAllByTestId("stars")[1]).toHaveTextContent("1.8k");
      expect(getAllByTestId("forks")[0]).toHaveTextContent("1.6k");
      expect(getAllByTestId("forks")[1]).toHaveTextContent("69");
      expect(getAllByTestId("reviews")[0]).toHaveTextContent("3");
      expect(getAllByTestId("reviews")[1]).toHaveTextContent("3");
    });
  });

  describe('Sign-In', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {  
      const login = {
        username: 'kalle',
        password: 'password'
      };
      const onSubmit = jest.fn();
      const { getByTestId } = render(<SignInContainer credentials={login} onSubmit={onSubmit(login)} />);
      
      await waitFor(() => {
        fireEvent.press(getByTestId('signOnButton'));
      });
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password',
    });
    });
  });
});