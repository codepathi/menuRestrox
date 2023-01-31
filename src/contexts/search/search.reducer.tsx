type Action =
  | {
      type: 'SET_SEARCH_COMP_IN_VIEW';
    }
  | {
      type: 'REMOVE_SEARCH_COMP_FROM_VIEW';
    };

export interface State {
  isSearchCompInView: boolean;
}

export const initialState: State = {
  isSearchCompInView: false,
};

export function searchReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_SEARCH_COMP_IN_VIEW':
      return { ...state, isSearchCompInView: true };
    case 'REMOVE_SEARCH_COMP_FROM_VIEW':
      return { ...state, isSearchCompInView: false };
    default:
      return state;
  }
}
