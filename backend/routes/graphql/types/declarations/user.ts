import { gql } from 'graphql-tag';

export const User = gql`
  type User {
    id: ID!
    email: String!
    contactNumber: String
    firstName: String
    lastName: String
    profileImage: String
    block: Boolean
    createdAt: Date
  }

  input UserInput {
    userId: String!
  }
`;
