type Action =
  | {
      type: 'SET_FULL_LOGO_IN_VIEW';
    }
  | {
      type: 'REMOVE_FULL_LOGO_FROM_VIEW';
    };

export interface State {
  isFullLogoInView: boolean;
}

export const initialState: State = {
  isFullLogoInView: false,
};

export function searchReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_FULL_LOGO_IN_VIEW':
      return { ...state, isFullLogoInView: true };
    case 'REMOVE_FULL_LOGO_FROM_VIEW':
      return { ...state, isFullLogoInView: false };
    default:
      return state;
  }
}
