import { gql } from 'graphql-tag';

export const Pagination = gql`
  input PaginationInput {
    limit: Int!
    offset: Int!
  }
`;
