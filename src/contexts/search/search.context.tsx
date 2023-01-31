import React, { useEffect } from 'react';
import { initialState, searchReducer, State } from './search.reducer';
import { useSessionStorage } from 'react-use';

interface SearchContextProviderState extends State {
  setSearchCompInView: () => void;
  removeSearchCompFromView: () => void;
}

export const searchContext = React.createContext<
  SearchContextProviderState | undefined
>(undefined);

searchContext.displayName = 'SearchContext';

export const useSearch = () => {
  const context = React.useContext(searchContext);
  if (context === undefined) {
    throw new Error(`useSearch must be used within a CartProvider`);
  }
  return context;
};

export const SearchProvider: React.FC = (props) => {
  const [savedSearch, saveSearch] = useSessionStorage(
    'is_search_comp_in_view',
    JSON.stringify(initialState)
  );

  const [state, dispatch] = React.useReducer(
    searchReducer,
    JSON.parse(savedSearch)
  );

  useEffect(() => {
    saveSearch(JSON.stringify(state));
  }, [state, saveSearch]);

  const setSearchCompInView = () => {
    dispatch({ type: 'SET_SEARCH_COMP_IN_VIEW' });
  };

  const removeSearchCompFromView = () => {
    dispatch({ type: 'REMOVE_SEARCH_COMP_FROM_VIEW' });
  };

  const value = React.useMemo(
    () => ({ ...state, setSearchCompInView, removeSearchCompFromView }),
    [state]
  );

  return <searchContext.Provider value={value} {...props} />;
};
