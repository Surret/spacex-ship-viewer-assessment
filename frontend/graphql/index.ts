import { Ships } from "./ships";

const apiCalls = {
  queries: {
    ...Ships.query,
  },
  mutations: {
    ...Ships.mutations,
  },
};

export default apiCalls;
