import Home from'./Views/Home/Home.component';
import Detail from './Views/Detail/Detail.component';
import Form from './Views/Form/Form.component';
import Landing from './Views/Landing/Landing.component';
import {Route } from "react-router-dom";
import PATHROUTES from "./Helper";
import './App.css';


function App() {
  return (
    <div className="App">
      <Route exact path={PATHROUTES.LANDING} component={Landing}/>
      <Route exact path={PATHROUTES.HOME} component={Home}/>
      <Route path={PATHROUTES.DETAIL} component={Detail}/>
      <Route path={PATHROUTES.FORM} component={Form}/>
    </div>
  );
}

export default App;
