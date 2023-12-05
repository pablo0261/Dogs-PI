import axios from "axios";
export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const FILTER = "FILTER";
export const ORDER = "ORDER";

//*EJEMPLO CON ASYNC AWAIT
const addFav = (character) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav";
  return async (dispatch) => {
    try {
      const {data} = await axios.post(endpoint, character);
      return dispatch({
        type: ADD_FAV, 
        payload: data,
      });
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  };
};

const removeFav = (id) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav/" + id;
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(endpoint);
      return dispatch({
        type: REMOVE_FAV,
        payload: data,
      });
    } catch (error) {
      console.error("Error al eliminar favoritos:", error);
    }
  };
};

//* EJEMPLO CON PROMESAS
// const removeFav = (id) => {
//   const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
//   return (dispatch) => {
//      axios.delete(endpoint).then(({ data }) => {
//         return dispatch({
//            type: 'REMOVE_FAV',
//            payload: data,
//      });
//      });
//   };
// };

// const removeFavorite = (id) => {
//   return {
//     type: REMOVE_FAVORITE,
//     payload: id,
//   };
// };

const filterCards = (gender) => {
  return {
    type: FILTER,
    payload: gender,
  };
};

const orderCards = (orden) => {
  return {
    type: ORDER,
    payload: orden,
  };
};

export { addFav, removeFav, filterCards, orderCards };
