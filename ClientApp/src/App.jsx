import React, { useEffect } from 'react'
import './custom.scss'
import { HomePage } from './pages/HomePage'
import { LoggedInUser } from './pages/LoggedInUser'
import { AudienceGiveNote } from './pages/AudienceGiveNote'
import { Switch, Route } from 'react-router-dom'

export function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/user/id">
          <LoggedInUser />
        </Route>
        <Route exact path="/user/speech/speechid">
          <AudienceGiveNote />
        </Route>
      </Switch>
    </>
  )
}
