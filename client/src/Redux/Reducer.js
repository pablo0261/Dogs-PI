import {
  //*-----GET----//
  GET_ALL,
  GET_BY_ID,
  GET_ALL_TEMP,
  //*-----ORDER----//
  REMOVE_SELECTED_DOG,
  ORDER_DOGS,
  FILTER_BY_WEIGHT,
  //*-----FILTER----//
  FILTER_BY_TEMP,
  FILTER_ORIGIN_DOG,
  //*-----POST----//
  POST_NEW_DOGS,
} from "./Actions";

let initialState = {
  allDogs: [],
  allTemperaments: [],
  dogName: "",
  createDogs: [],
  filterApi: [],
  filterDb: [],
  filterTemp: [],
  dogSelected: [],
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
  switch (
    type // ojo si no hago destructoring arriba aqui va =action.type
  ) {
    case GET_ALL:
      return {
        ...state,
        allDogs: payload,
        filterApi: payload,
        filterDb: payload,
        filterTemp: payload,
      };

    case GET_ALL_TEMP:
      const uniqueTemperaments = extractUniqueTemperaments(payload);
      return {
        ...state,
        allTemperaments: uniqueTemperaments,
      };

    case GET_BY_ID:
      return {
        ...state,
        dogSelected: payload,
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

    case FILTER_BY_WEIGHT:
      const copy2 = state.allDogs.slice();
      if (payload === "weightMax") {
        copy2.sort((a, b) => {
          return b.weightMax && a.weightMax ? b.weightMax - a.weightMax : 0;
        });
      } else {
        copy2.sort((a, b) => {
          return a.weightMin && b.weightMin ? a.weightMin - b.weightMin : 0;
        });
      }
      return {
        ...state,
        allDogs: copy2,
      };

    case FILTER_BY_TEMP:
      const selectedTemps = payload === "All" ? [] : payload
      const filteredTemp = state.allDogs.filter((dog) =>
        selectedTemps.every((temp) => dog.temperament?.includes(temp))
      );
      return {
        ...state,
        dogSelected: [filteredTemp]
      };

    case FILTER_ORIGIN_DOG:
      const copy4 = state.filterApi.filter((dog) => isNaN(Number(dog.id)));
      const copy5 = state.filterDb.filter((dog) => !isNaN(Number(dog.id)));
      const copy6 = state.allDogs;
      const copy7 = state.filterTemp;

      if (payload === "created") {
        return { ...state, filterDb: copy6, allDogs: copy4 };
      } else if (payload === "Api") {
        return { ...state, filterApi: copy4, allDogs: copy5 };
      } else {
        return { ...state, allDogs: copy7 };
      }

    case POST_NEW_DOGS:
      return {
        ...state,
        createDogs: [...state.createDogs, payload],
      };

    case REMOVE_SELECTED_DOG:
      return {
        ...state,
        dogSelected: {},
      };
      

    default:
      return state;
  }
};

export default rootReducer;
