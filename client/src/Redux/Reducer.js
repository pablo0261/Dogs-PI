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
  //*-----ERRORS----//
  SET_FRONT_ERROR,
  CLEAR_FRONT_ERROR,
  SET_ERROR_BACK,
  CLEAR_ERROR_BACK,
} from "./Actions";

let initialState = {
//*GENERALES//
allDogs: [],
allTemperaments: [],
//*ORDER//
flagOrderAZ: (false),
flagOrderWeight: (false),
orderDog: [],
//*FILTER//
filterByTemp: [],
flagFilterByTemp: (false),
filterByOrigin: [],
flagFilterByOrigin: (false),
//*POSTDOG//
createDogs: [],
//*RESULTADO DE FILTROS U ORDENAMIENTOS//
dogSelected: [], 
//*ERRORES//
errorsFront: [],
errorsBack: {},
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
  switch (
    type 
  ) {

    //*---GET GENERALES---//
    case GET_ALL:
      return {
        ...state,
        allDogs: payload,
        dogSelected:payload,
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

    //*---ORDER---//
    case ORDER_DOGS:
      const orderDogs =
        payload === "A-Z"
          ? state.dogSelected
              .slice()
              .sort((a, b) =>
                a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
              )
          : state.dogSelected
              .slice()
              .sort((a, b) =>
                a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
              );
      return {
        ...state,
        dogSelected: orderDogs,
        flagOrderAZ:true,
      };

    case FILTER_BY_WEIGHT:
      const copy2 = state.dogSelected.slice();
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
        dogSelected: copy2,
        flagOrderWeight:true,
      };

    //*---FILTER---//
    case FILTER_BY_TEMP:
      const dogSelected = state.dogSelected
      const selectedTemp = payload.includes("All") ? [] : payload;
      const filteredDog = dogSelected.filter((dog) => {
    const dogTemperaments = dog.temperament || [];
    return selectedTemp.every((temp) => dogTemperaments.includes(temp));
  });
      if (selectedTemp.length < 1){
        return{
          ...state,
          flagFilterByTemp: false,
          filterByTemp: filteredDog,
          errorsFront: "",
        }
      }
      if (filteredDog.length === 0) {
        return {
          ...state,
          flagFilterByTemp: true,
          filterByTemp: [],
          errorsFront: "No dogs were found with those temperaments", 
        };
      }
      return {
        ...state,
        flagFilterByTemp: true,
        filterByTemp: filteredDog,
        errorsFront: "",
      };

    case FILTER_ORIGIN_DOG:
      const allDogs = state.allDogs;
      const filterOrigin = payload === 'created' ? allDogs.filter((dog) => isNaN(Number(dog.id))) : allDogs.filter((dog) => !isNaN(Number(dog.id)));
      return {
        ...state,
        dogSelected: payload === 'All' ? allDogs : filterOrigin,
        flagFilterByOrigin: payload !== 'All'? true : false,
      }

    //*---POST---//
    case POST_NEW_DOGS:
      return {
        ...state,
        createDogs: [...state.createDogs, payload],
        ...state,
        errorsBack: {
          ...state.errorsBack,
          errorsBack: payload,
        },
      };

    //*---MANEJO DE ESTADOS GLOBALES---//
    case REMOVE_SELECTED_DOG:
      return {
        ...state,
        dogSelected: [],
      };

    //* --- manejo de errores del front ---//*
    case SET_FRONT_ERROR:
      return {
        ...state,
        errorsFront: payload,
      };

    case CLEAR_FRONT_ERROR:
      return {
        ...state,
        errorsFront: { ...state.errorsFront, [payload.field]: null },
      };

    //* --- MANEJO DE ERRORES DEL BACK ---//*
    case SET_ERROR_BACK:
      return {
        ...state,
          errorsBack: payload,
      };

    case CLEAR_ERROR_BACK:
      return {
        ...state,
        errorsBack: { ...state.errorsBack, payload: null },
      };

    default:
      return state;
  }
};

export default rootReducer;
