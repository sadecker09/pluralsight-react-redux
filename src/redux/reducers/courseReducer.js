export default function courseReducer(state = [], action) {
  switch (action.type) {
    case "CREATE_COURSE":
      // do not push directly onto state; return updated copy of state
      return [...state, { ...action.course }];
    default: // if reducer receive action it doesn't care about, return unchanged state
      return state;
  }
}
