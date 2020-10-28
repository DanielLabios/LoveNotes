import React, { useEffect } from 'react'
import './scssFiles/custom.scss'
import { HomePage } from './pages/HomePage'
import { LoggedInUser } from './pages/LoggedInUser'
import { AudienceGiveNote } from './pages/AudienceGiveNote'
import { Switch, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'

export function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/user/:id">
          <LoggedInUser />
        </Route>
        <Route exact path="/Notes/:speechKey">
          <AudienceGiveNote />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>
    </>
  )
}
