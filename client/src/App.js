import './App.css';
<<<<<<< HEAD
import Home from'./Views/Home/Home.component';
import Detail from './Views/Detail/Detail.component';
import Form from './Views/Form/Form.component';
import Landing from './Views/Landing/Landing.component';
import  React  from "react";
import {Route } from "react-router-dom";
import PATHROUTES from "./Helper";

function App() {

  return (
    <div className="App">
      <Route exact path={PATHROUTES.LANDING} component={Landing}/>
      <Route exact path={PATHROUTES.HOME} component={Home}/>
      <Route path={PATHROUTES.DETAIL} component={Detail}/>
      <Route path={PATHROUTES.FORM} component={Form}/>
=======

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
>>>>>>> main
    </div>
  );
}

export default App;
