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
//*FILTER//
filterByTemp: [],
flagFilterByTemp: (false),
filterByOrigin: [],
flagFilterByOrigin: (false),
//*CONSERVAR ESTADO ORIGINAL DE ALL DOGS EN FILTERORIGIN//
filterApi: [],
filterDb: [],
filterTemp: [],
//*POSTDOG//
createDogs: [],
//*RESULTADO DE FILTROS U ORDENAMIENTOS//
dogSelected: [], //*tiene un notFound?
//*ERRORES//
errorsFront: {},
errorsBack: {},

dogName: "",
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

    //*---GET GENERALES---//
    case GET_ALL:
      return {
        ...state,
        allDogs: payload,
        // filterApi: payload,
        // filterDb: payload,
        // filterTemp: payload,
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
        orderAZ:true,
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
        orderWeight:true,
      };

    //*---FILTER---//
    case FILTER_BY_TEMP:
      const selectedTemp = payload.includes("All") ? [] : payload;
      const filteredTemp = state.allDogs.filter((dog) =>
        selectedTemp.every((temp) => dog.temperament?.includes(temp))
      );
      if (selectedTemp.length < 1){
        return{
          ...state,
          filterByTemp: filteredTemp,
          flagFilterByTemp: false,
        }
      }
      if (selectedTemp.length > 0 && filteredTemp.length === 0) {
        return {
          ...state,
          filterByTemp: filteredTemp,
          flagFilterByTemp: true,
          errorsFront: { notFound: true }, //! ver si esto lo mantengo cuando funcionen las flags
        };
      }
      return {
        ...state,
        filterByTemp: filteredTemp,
        flagFilterByTemp: true,
      };

    case FILTER_ORIGIN_DOG:
      const allDogs = state.allDogs;
      const filterOrigin = payload === 'created' ? allDogs.filter((dog) => isNaN(Number(dog.id))) : allDogs.filter((dog) => !isNaN(Number(dog.id)));
      return {
        ...state,
        filterByOrigin: payload === 'All' ? state.allDogs : filterOrigin,
        flagFilterByOrigin: payload !== 'All'? true : false,





      // const copy4 = copy7.filter((dog) => isNaN(Number(dog.id)));
      // const copy5 = copy6.filter((dog) => !isNaN(Number(dog.id)));
      // const copy6 = copy7;
      // const copy7 = state.allDogs;

      // if (payload === "created") {
      //   // return {filterByOrigin: copy5, flagFilterByOrigin: true,};
      //   return { ...state, filterDb: copy6, allDogs: copy4, flagFilterByOrigin: true, };
      // } else if (payload === "Api") {
      //   return { ...state, filterApi: copy4, allDogs: copy5, flagFilterByOrigin: true, };
      //   // return {filterByOrigin: copy4, flagFilterByOrigin: true,};
      // } else {
      //   return { ...state, allDogs: copy7, flagFilterByOrigin: false, };
      //   // return {filterByOrigin: [], flagFilterByOrigin: false,};
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
        dogSelected: {},
      };

    //* --- manejo de errores del front ---//*
    case SET_FRONT_ERROR:
      return {
        ...state,
        errorsFront: { ...state.errorsFront, [payload.field]: payload.message },
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
