import React, { useState, useEffect, useLayoutEffect } from 'react'
//import { useParams } from 'react-router-dom'
//import format from 'date-fns/format' <= bring this in
import { logout, isLoggedIn, getUser } from '../auth'
import { NotePile } from '../components/NotePile.jsx'
import { UserProfile } from '../components/UserProfile.jsx'
import { SpeechSchedule } from '../components/SpeechSchedule'

export function LoggedInUser() {
  const user = getUser()
  const [speeches, setSpeeches] = useState([])

  useEffect(() => {
    loadSpeeches()
  }, [])

  async function loadSpeeches() {
    const url = `/api/Speeches?userId=${user.id}`
    const response = await fetch(url)
    const json = await response.json()
    setSpeeches(json)
    console.log(json)
  }

  // const upcomingSpeech = speeches.reduce((previousspeech, currentspeech) =>
  //   new Date(currentspeech.timeSlot) > new Date() &&
  //   new Date(currentspeech.timeSlot) < new Date(previousspeech.timeSlot)
  //     ? currentspeech
  //     : previousspeech
  // )

  return (
    <>
      <main className="loggedInUser">
        <body>
          <UserProfile speeches={speeches} />
          <SpeechSchedule
            speeches={speeches}
            user={user}
            loadSpeeches={loadSpeeches}
          />
          <NotePile
            speeches={speeches}
            user={user}
            loadSpeeches={loadSpeeches}
          />
        </body>
      </main>
    </>
  )
}
