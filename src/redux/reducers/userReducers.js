const reducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER":
      state = JSON.parse(localStorage.getItem("user"));
      return state;
    default:
      return state;
  }
};

export default reducer;
