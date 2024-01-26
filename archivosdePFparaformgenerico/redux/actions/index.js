import axios from "axios";


export const GET_INFO_USER = "GET_INFO_USER";
export const POST_NEW_INFO_USER = "POST_NEW_INFO_USER";
export const SET_ERROR_BACK = "SET_ERROR_BACK";
export const EDIT_INFO_USER = "EDIT_INFO_USER";


//*---GET GENERALES---//

const infoDetailProveedor = (id) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/people/${id}`);
        dispatch({
          type: GET_INFO_USER,
          payload: data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

const handleContratService = (item) => {
    return async () => {
      try {
        await axios.post(`/people/${item}`);//*Verificar si el post iria a la misma ruta
        
      } catch (error) {
        console.log(error);
      }
    };
  };

  //*---POST_NEW_INFO_USER---//
const postUserData = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/XXXXXX", userData);//*Verificar a que ruta enviar el post para que modifique el objeto person del back
      dispatch({
        type: POST_NEW_INFO_USER,
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

const handleEditProfile = (formData) => {
  return async (dispatch) => {
    try {
    dispatch({
      type: EDIT_INFO_USER,
      payload: formData,
    });
  } catch (error) {
    console.error(error);
  }
};
};



  export {
    infoDetailProveedor,
    handleContratService,
    postUserData,
    handleEditProfile,
  }