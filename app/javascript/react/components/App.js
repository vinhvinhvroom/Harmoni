import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ConcertsIndex from "./Concerts/ConcertsIndex"
import ConcertShowContainer from "./Concerts/ConcertShowContainer"
import SearchIndex from "./Concerts/SearchIndex"

export const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ConcertsIndex}/>
          <Route exact path="/concerts" component={ConcertsIndex}/>
          <Route exact path="/concerts/:id" component={ConcertShowContainer}/>
          <Route exact path="/search" component={SearchIndex}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
