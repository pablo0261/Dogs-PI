import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./Reducer";

const store = createStore(//funcion que recibe el reducer
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))//think para manejar asincronismo
  );

  export default store; 