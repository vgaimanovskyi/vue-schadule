export default {
  state: {
    error: "",
  },
  mutations: {
    SET_NEW_ERROR(state, newError) {
      state.error = newError;
    },
    CLEAR_ERROR(state) {
      state.error = "";
    },
  },
  getters: {
    getError: (state) => state.error,
  },
};
