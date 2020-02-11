import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ConcertsIndex from "./Concerts/ConcertsIndex"
import ConcertShowContainer from "./Concerts/ConcertShowContainer"

export const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ConcertsIndex}/>
          <Route exact path="/concerts" component={ConcertsIndex}/>
          <Route exact path="/concerts/:id" component={ConcertShowContainer}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
