import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const GET_ALL = "GET_ALL";
export const GET_ALL_TEMP = "GET_ALL_TEMP";
export const GET_BY_ID = "GET_BY_ID";
export const REMOVE_SELECTED_DOG = "REMOVE_SELECTED_DOG";
export const POST_NEW_DOGS = "POST_NEW_DOGS";
export const ORDER_DOGS = "ORDER_DOGS";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
export const FILTER_BY_TEMP = "FILTER_BY_TEMP";
export const FILTER_ORIGIN_DOG = "FILTER_ORIGIN_DOG";
export const GET_CREATE_DOG = "GET_CREATE_DOG";
// export const SET_ADVANCED_FILTERS = "SET_ADVANCED_FILTERS";

const getAllDogs = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/dogs");
      return dispatch({
        type: GET_ALL,
        payload: data,
      });
    } catch (error) {
      console.log("Error getting all dogs");
    }
  };
};

const getAllTemperaments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/temperaments");
      return dispatch({
        type: GET_ALL_TEMP,
        payload: data,
      });
    } catch (error) {
      console.log("Error getting temperament", error);
    }
  };
};

// const getDogName = (name) => {
//   const endpoint = `/dogs?name=${name}`;
//   console.log(endpoint)
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(endpoint);
//       return dispatch({
//         type: GET_DOG_NAME,
//         payload: data,
//         });
//         } catch (error) {
//           console.log('Error getting dog name');
//           }
//         }
//       }

const getDogById = (id) => {
  const endpoint = `/dogs/${id}`;
  return async (dispatch) => {
    try {
      // console.log('Endpoint de la API:', endpoint);
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log("Error getting one dog by id");
    }
  };
};

const removeSelectedDog = () => {
  return {
    type: REMOVE_SELECTED_DOG,
  };
};

const postDogs = (dataCreated) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/dogs", dataCreated);
      console.log(response.data)
      dispatch({
        type: POST_NEW_DOGS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error posting dogs:", error);
      console.error("Detalles del error:", error.response.data);
    }
  };
};

const orderDogs = (value) => {
  return {
    type: ORDER_DOGS,
    payload: value,
  };
};

const filterByW = (value) => {
  return {
    type: FILTER_BY_WEIGHT,
    payload: value,
  };
};

const FilterByTemp = (value) => {
  return {
    type: FILTER_BY_TEMP,
    payload: value,
  };
};

const FilterOriginDog = (value) => {
  return {
    type: FILTER_ORIGIN_DOG,
    payload: value,
  };
};

export {
  getAllDogs,
  getDogById,
  removeSelectedDog,
  getAllTemperaments,
  postDogs,
  orderDogs,
  filterByW,
  FilterByTemp,
  FilterOriginDog,
};
