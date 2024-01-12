// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import {
//   orderDogs,
//   orderByW,
//   filterOriginDog,
// } from "../../Redux/Actions";

// const useHome = () => {

//     const [selectedTemperaments, setSelectedTemperaments] = useState([]); //*estado para mostrar los temp seleccionados
    
//     const dispatch = useDispatch();
// const handleOrder = (e) => {
//     dispatch(orderDogs(e.target.value));
//   };

//   const handlerOrderW = (e) => {
//     dispatch(orderByW(e.target.value));
//   };

//   const handlerFilterOrigin = (e) => {
//     dispatch(filterOriginDog(e.target.value));
//   };

//   const handlerFilterTemp = (e) => {
//     e.preventDefault();
//     const selectedTemp = e.target.value;
//     if (!selectedTemperaments.includes(selectedTemp)) {
//         setSelectedTemperaments((prevTemperaments) => [
//             ...prevTemperaments,
//             selectedTemp,
//         ]);
//         console.log("selectedTemp", selectedTemp)
//       console.log("selectedTemperaments:", selectedTemperaments);
//     }
//   };

//   const handleRemoveTemperament = (deleteTemp) => {
//     const updatedTemperaments = selectedTemperaments.filter(
//       (temp) => temp !== deleteTemp
//     );
//     setSelectedTemperaments(updatedTemperaments);
//   };

//   return {
//     handleOrder,
//     handlerOrderW,
//     handlerFilterOrigin,
//     handlerFilterTemp,
//     handleRemoveTemperament,
//   };
// };

// export default useHome;
