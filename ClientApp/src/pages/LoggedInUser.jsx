import React from 'react'
import { NotePile } from './NotePile.jsx'
import { UserProfile } from './UserProfile'
//import { Link } from 'react-router-dom'
export function LoggedInUser() {
  return (
    <>
      <main>
        <body>
          <UserProfile />
          <NotePile />
        </body>
      </main>
    </>
  )
}
