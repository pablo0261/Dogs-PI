import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const GET_ALL = "GET_ALL";
// export const GET_DOG_NAME = "GET_DOG_NAME";
// export const GET_BY_ID = "GET_BY_ID";
// export const POST_NEW_DOGS = "POST_NEW_DOGS";


//*EJEMPLO CON ASYNC AWAIT

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

// const getAllTemperaments = () => {
//   const endpoint = "/temperaments";
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(endpoint);
//       return dispatch({
//         type: GET_ALL,
//         payload: data,
//         });
//         } catch (error) {
//           console.log('Error getting temperament');
//           }
//           };
//           };

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

// const getDogById = (id) => {
//   const endpoint = `/dogs/${id}`;
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(endpoint);
//       return dispatch({
//         type: GET_BY_ID,
//         payload: data,
//         });
//         } catch (error) {
//           console.log('Error getting one dog by id');
//           }
//           }
// }     

// const  postDogs = (data) => {
//   const endpoint = '/dogs';
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.post(endpoint, data);
//       return dispatch({
//         type: POST_NEW_DOGS,
//         payload: data,
//         })
//         } catch (err) {
//           console.log("ERROR", err);
//           }
//           }
// }
// const orderCards = (orden) => {
//   return {
//     type: ORDER,
//     payload: orden,
//   };
// };

export { getAllDogs };
