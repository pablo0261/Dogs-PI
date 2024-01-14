import axios from "axios";
axios.defaults.baseURL = "https://pi-dogs-34mc.onrender.com";

export const GET_ALL = "GET_ALL";
export const GET_ALL_TEMP = "GET_ALL_TEMP";
export const GET_BY_ID = "GET_BY_ID";
export const ORDER_DOGS = "ORDER_DOGS";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
export const FILTER_BY_TEMP = "FILTER_BY_TEMP";
export const FILTER_ORIGIN_DOG = "FILTER_ORIGIN_DOG";
export const GET_CREATE_DOG = "GET_CREATE_DOG";
export const POST_NEW_DOGS = "POST_NEW_DOGS";
export const REMOVE_SELECTED_DOG = "REMOVE_SELECTED_DOG";
export const SET_FRONT_ERROR = "SET_FRONT_ERROR";
export const CLEAR_FRONT_ERROR = "CLEAR_FRONT_ERROR";
export const SET_ERRORS = "SET_ERRORS";
export const SET_ERROR_BACK = "SET_ERROR_BACK";
export const CLEAR_ERROR_BACK = "CLEAR_ERROR_BACK";

//*---GET GENERALES---//

const getAllDogs = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/dogs");
      return dispatch({
        type: GET_ALL,
        payload: data,
      });
    } catch (error) {
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
    }
  };
};

const getDogById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/dogs/${id}`);
      return dispatch({
        type: GET_BY_ID,
        payload: data,
      });
    } catch (error) {
    }
  };
};

//*---ORDER---//
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

//*---FILTER---//
const filterDogsByTemp = (value) => {
  return {
    type: FILTER_BY_TEMP,
    payload: value,
  };
};

const filterOriginDog = (value) => {
  return {
    type: FILTER_ORIGIN_DOG,
    payload: value,
  };
};


//*---POST---//
const postDogs = (dataCreated) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/dogs", dataCreated);
      dispatch({
        type: POST_NEW_DOGS,
        payload: response.data,
      });
      
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch({
          type: SET_ERROR_BACK,
          payload: error.response.data,
        });
        throw error.response.data;
      }
    }
  };
};


//*---MANEJO DE ESTADOS GLOBALES---//
const removeSelectedDog = () => {
  return {
    type: REMOVE_SELECTED_DOG,
  };
};

const resetAll = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/dogs");
      const { data2 } = await axios.get("/temperaments");
      dispatch({
        type: GET_ALL,
        payload: data,
      });
      dispatch({
        type: GET_ALL_TEMP,
        payload: data2,
      });
    } catch (error) {
    }
  };
};

//* --- manejo de errores del front ---//*
const setFrontError = (message) => ({
  type: 'SET_FRONT_ERROR',
  payload: message,
});

const clearFrontError = () => ({
  type: 'CLEAR_FRONT_ERROR',
});

//* --- manejo de errores del back ---//*
const setErrorBack = (message) => {
  return {
    type: "SET_ERROR_BACK",
    payload: { message },
  };
};

const clearErrorBack = (module) => ({
  type: "CLEAR_ERROR_BACK",
  payload: { module },
});

export {
  getAllDogs,
  getDogById,
  removeSelectedDog,
  getAllTemperaments,
  postDogs,
  orderDogs,
  filterByW,
  filterDogsByTemp,
  filterOriginDog,
  resetAll,
  setFrontError,
  clearFrontError,
  setErrorBack,
  clearErrorBack,
};
