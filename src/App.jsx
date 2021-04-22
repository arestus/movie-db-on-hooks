import React from 'react'
import {Route, Switch} from 'react-router-dom'
import './App.css';
import { Home } from './components/home/Home'
import { MovieDetail } from './components/movieDetail/MovieDetail'

export function App() {
  return (
    <main>
      <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/movie/:id' component={MovieDetail}/>
    </Switch>
    </main>
  )
}

export default App
