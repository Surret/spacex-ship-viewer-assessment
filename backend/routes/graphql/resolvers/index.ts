import { User } from './user';
import { BlockApp } from './blockApp';
import { Ship } from './ship';

const resolvers = {
  Query: {
    ...User.query,
    ...BlockApp.query,
    ...Ship.query,
  },
  Mutation: {
    ...User.mutation,
    ...BlockApp.mutation,
    ...Ship.mutation,
  },
};

export { resolvers };
