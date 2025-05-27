import gql from "graphql-tag";

const ships = gql`
  query ships {
    ships {
    id
    class
    name
    }
  }
`;

const query = { ships };
const mutations = {};
const Ships = { query, mutations };
export { Ships };
