import React, {createContext, useContext, useEffect, useState} from 'react';

const FavouritesStorageContext = createContext({});

export const FavouritesStorageProvider = ({children}) => {
  const favouritesStorageKey = 'favourites';

  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem(favouritesStorageKey)) || {});
  useEffect(() => {
    localStorage.setItem(favouritesStorageKey, JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (id) => {
    setFavourites({...favourites, [id]: !favourites[id]});
  };
  const isFavourite = (id) => {
    return !!favourites[id];
  };
  return <FavouritesStorageContext.Provider value={{isFavourite, toggleFavourite}}>
    {children}
  </FavouritesStorageContext.Provider>;
}

/**
 * Hook for using and modifying favourite repositories state.
 */
export const useFavouritesStorage = () => {
  const {isFavourite, toggleFavourite} = useContext(FavouritesStorageContext);
  return {isFavourite, toggleFavourite};
}