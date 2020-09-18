import React from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Dashboard from './components/dashboard/dashboard'
import Details from './components/details/detail'


function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route exact path='/'>
        <Dashboard/>
      </Route>
      <Route path='/word/:id' component={Details}>
      </Route>
     </Switch>
    </BrowserRouter>
  );
}

export default App;
