import React, { useEffect } from 'react';
import { initialState, searchReducer, State } from './logo.reducer';
import { useSessionStorage } from 'react-use';

interface FullLogoContextProviderState extends State {
  setFullLogoInView: () => void;
  removeFullLogoFromView: () => void;
}

export const fullLogoContext = React.createContext<
  FullLogoContextProviderState | undefined
>(undefined);

fullLogoContext.displayName = 'SearchContext';

export const useFullLogo = () => {
  const context = React.useContext(fullLogoContext);
  if (context === undefined) {
    throw new Error(`useFullLogo must be used within a CartProvider`);
  }
  return context;
};

export const FullLogoProvider: React.FC = (props) => {
  const [savedSearch, saveSearch] = useSessionStorage(
    'is_full_logo_in_view',
    JSON.stringify(initialState)
  );

  const [state, dispatch] = React.useReducer(
    searchReducer,
    JSON.parse(savedSearch)
  );

  useEffect(() => {
    saveSearch(JSON.stringify(state));
  }, [state, saveSearch]);

  const setFullLogoInView = () => {
    dispatch({ type: 'SET_FULL_LOGO_IN_VIEW' });
  };

  const removeFullLogoFromView = () => {
    dispatch({ type: 'REMOVE_FULL_LOGO_FROM_VIEW' });
  };

  const value = React.useMemo(
    () => ({ ...state, setFullLogoInView, removeFullLogoFromView }),
    [state]
  );

  return <fullLogoContext.Provider value={value} {...props} />;
};
