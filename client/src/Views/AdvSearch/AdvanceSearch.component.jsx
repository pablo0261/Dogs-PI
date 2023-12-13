// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setAdvancedFilters, getAllTemperaments } from "../../Redux/Actions";

// const AdvancedFilter = () => {
//   const dispatch = useDispatch();
//   const advancedFilters = useSelector((state) => state.advancedFilters);
//   const temperaments = useSelector((state) => state.allTemperaments);

//   const handleToggleDbDogs = () => {
//     dispatch(
//       setAdvancedFilters({
//         ...advancedFilters,
//         showDbDogs: !advancedFilters.showDbDogs,
//       })
//     );
//   };

//   const handleSelect = (e) => {
//     if (!temperaments.includes(e.target.value)) {
//       dispatch(
//         setAdvancedFilters({
//           ...advancedFilters,
//           temperaments: [...advancedFilters.temperaments, e.target.value],
//         })
//       );
//     }
//   };

//   const handleClearFilters = () => {
//     dispatch(setAdvancedFilters({ temperaments: [], showDbDogs: false }));
//   };

//   const handleApplyFilters = () => {
//     const { temperaments, showDbDogs } = advancedFilters;
//     let filteredResults = allDogs;
//     if (temperaments.length > 0) {
//       filteredResults = filteredResults.filter((dog) =>
//         dog.temperaments.some((temp) => temperaments.includes(temp))
//       );
//     }
//     if (showDbDogs) {
//       filteredResults = filteredResults.filter((dog) => dog.isDbDog);
//     }
//     console.log("Resultados filtrados:", filteredResults);
//   };

//   return (
//     <div className="AdvancedFilter">
//       <h3>Advanced Filters</h3>

//       <div>
//         <label>
//           Show Dogs from Database:
//           <input
//             type="checkbox"
//             checked={advancedFilters.showDbDogs}
//             onChange={handleToggleDbDogs}
//           />
//         </label>
//       </div>

//       <div>
//         <label>
//           Select Temperaments:
//           <select
//             multiple
//             value={advancedFilters.temperaments}
//             onChange={handleSelect}
//           >
//             {temperaments.map((temp) => (
//               <option value={temp} key={temp.id}>
//                 {temp}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>

//       <div>
//         <button onClick={handleClearFilters}>Clear Filters</button>
//         <button onClick={handleApplyFilters}>Apply Filters</button>
//       </div>
//     </div>
//   );
// };

// export default AdvancedFilter;
