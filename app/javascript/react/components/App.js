import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ConcertsIndex from "./Concerts/ConcertsIndex"

export const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ConcertsIndex}/>
          <Route exact path="/concerts" component={ConcertsIndex}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
