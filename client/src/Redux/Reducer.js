import {  GET_ALL, GET_BY_ID, REMOVE_SELECTED_DOG } from "./Actions";

let initialState = {
  allDogs: [],  
  allTemperaments: [],
  dogSelected:{},
  dogName: "",
  createDogs: [],
};


const rootReducer = (state = initialState, { type, payload }) => {
    //en lugar de action hago destructoring y pongo los parametros que me interesan type y payload
    //esto se puede hacer con un IF tambien
    // console.log(payload)
    switch (
      type // ojo si no hago destructoring arriba aqui va =action.type
    ) {
      case GET_ALL:
        return{
          ...state,
          allDogs: payload,
      };

      // case GET_DOG_NAME:
      //   return{
      //     ...state,
      //     dogName: action.payload,
      //     };

      case GET_BY_ID:
        return{
          ...state,
          dogSelected: payload,
          };

      // case POST_NEW_DOGS:
      //   return{
      //     ...state,
      //     createDogs: action.payload,
      //     };

      case REMOVE_SELECTED_DOG:
        return {
            ...state,
            selectedDog: {}
        }
          





        // case ORDER:
        //   let copy4;
        //   if (payload === "A") {
        //       copy4 = state.allCharacters.sort((a, b) => a.id - b.id); // Ordenar de menor a mayor por ID.
        //     } else if (payload === "D") {
        //       copy4 = state.allCharacters.sort((a, b) => b.id - a.id); // Ordenar de mayor a menor por ID.
        //     }
        //   return{
        //       ...state, myFavorites: copy4,
        //   }
  
      default:
        return state;
    }
  };
  export default rootReducer;