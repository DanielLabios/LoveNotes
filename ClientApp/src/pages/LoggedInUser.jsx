import React, { useState, useEffect, useLayoutEffect } from 'react'
//import { useParams } from 'react-router-dom'
//import format from 'date-fns/format' <= bring this in
import { logout, isLoggedIn, getUser } from '../auth'
import { NotePile } from '../components/NotePile.jsx'
import { UserProfile } from '../components/UserProfile.jsx'
import { SpeechSchedule } from '../components/SpeechSchedule.jsx'
import { Header } from '../components/Header.jsx'
import { useHistory } from 'react-router-dom'

export function LoggedInUser() {
  const user = getUser()
  const history = useHistory()
  const [speeches, setSpeeches] = useState([])
  const [switchComponent, setSwitchComponent] = useState(0)

  useEffect(() => {
    if (isLoggedIn() === false) {
      history.push('/')
    } else {
      loadSpeeches()
    }
  }, [])

  async function loadSpeeches() {
    const url = `/api/Speeches?userId=${user.id}`
    const response = await fetch(url)
    const json = await response.json()
    setSpeeches(json)
  }

  return (
    <>
      <main className="loggedInUser">
        <body>
          <Header />
          {isLoggedIn() && (
            <>
              <UserProfile speeches={speeches} />
              <SpeechSchedule
                componentToggleState={switchComponent}
                componentToggle={setSwitchComponent}
                speeches={speeches}
                user={user}
                loadSpeeches={loadSpeeches}
              />
              <NotePile
                componentToggleState={switchComponent}
                componentToggle={setSwitchComponent}
                speeches={speeches}
                user={user}
                loadSpeeches={loadSpeeches}
              />
            </>
          )}
        </body>
      </main>
    </>
  )
}
