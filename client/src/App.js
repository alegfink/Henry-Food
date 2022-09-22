import './App.css';
import React from "react";
//ver
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage.js'
import Home from './components/Home/Home.js';
import Detail from './components/Detail/Detail.js'
import Form from './components/Form/Form.js'

function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/home" component={Home}/>
    <Route path="/detail/:id" component={Detail}/>
    <Route path="/form" component={Form}/>
    </Switch>
    {/* <div className="App">
      <h1>Henry Food</h1>
    </div> */}
    </BrowserRouter>
  );
}

export default App;
