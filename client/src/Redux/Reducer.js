import {
  GET_ALL,
  GET_BY_ID,
  GET_ALL_TEMP,
  REMOVE_SELECTED_DOG,
  POST_NEW_DOGS,
  ORDER_DOGS,
} from "./Actions";

let initialState = {
  allDogs: [],
  allTemperaments: [],
  dogSelected: [],
  dogName: "",
  createDogs: [],
};

//*Para extraer los temperamentos individualmente
const extractUniqueTemperaments = (temperamentsArray) => {
  const temperamentsStrings = temperamentsArray.map((obj) => obj.temp);
  const allTemperamentsArray = temperamentsStrings.flatMap((tempString) =>
    tempString ? tempString.split(", ") : []
  );
  const uniqueTemperamentsArray = [...new Set(allTemperamentsArray)];
  return uniqueTemperamentsArray;
};

const rootReducer = (state = initialState, { type, payload }) => {
  //en lugar de action hago destructoring y pongo los parametros que me interesan type y payload
  //esto se puede hacer con un IF tambien
  // console.log(payload)
  switch (
    type // ojo si no hago destructoring arriba aqui va =action.type
  ) {
    case GET_ALL:
      return {
        ...state,
        allDogs: payload,
      };

    case GET_ALL_TEMP:
      const uniqueTemperaments = extractUniqueTemperaments(payload);
      return {
        ...state,
        allTemperaments: uniqueTemperaments,
      };

    // case GET_DOG_NAME:
    //   return{
    //     ...state,
    //     dogName: action.payload,
    //     };

    case GET_BY_ID:
      return {
        ...state,
        dogSelected: payload,
      };

    case POST_NEW_DOGS:
      return {
        ...state,
        createDogs: payload,
      };

    case REMOVE_SELECTED_DOG:
      return {
        ...state,
        dogSelected: {},
      };

    case ORDER_DOGS:
      const filterDogs =
        payload === "A-Z"
          ? state.allDogs
              .slice()
              .sort((a, b) =>
                a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
              )
          : state.allDogs
              .slice()
              .sort((a, b) =>
                a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
              );
      return {
        ...state,
        allDogs: filterDogs,
      };

    default:
      return state;
  }
};

export default rootReducer;
