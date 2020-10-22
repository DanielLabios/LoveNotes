import React, { useState, useEffect, useLayoutEffect } from 'react'
import { logout, authHeader, getUser } from '../auth'
import moment from 'moment'

function handleLogout() {
  logout()
  window.location.assign('/')
}

export function UserProfile(props) {
  const user = getUser()
  const [upcomingSpeech, setUpcomingSpeech] = useState({})

  useEffect(() => {
    loadSpeech()
  }, [])

  async function loadSpeech() {
    console.log(authHeader())
    const url = '/api/Speeches/upcoming'
    const response = await fetch(url, { headers: { ...authHeader() } })
    const json = await response.json()
    setUpcomingSpeech(json)
    console.log(json)
  }

  // const unreadNoteCount = props.speeches.reduce((totalUnreadNotes, speech) => {
  //   return (
  //     totalUnreadNotes +
  //     speech.notes.filter((speech) => speech.opened === false).length
  //   )
  // }, 0)

  return (
    <>
      <section className="UserProfile">
        <article>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.36 68.7">
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path d="M68.38,30.39H55a.59.59,0,0,0-.41.18l-.57.59a.57.57,0,0,0,.41,1H68.32a1.34,1.34,0,0,1,1.34,1.34v18a1.34,1.34,0,0,1-1.34,1.35H3a1.34,1.34,0,0,1-1.35-1.35v-18A1.34,1.34,0,0,1,3,32.12H16.93a.57.57,0,0,0,.41-1l-.57-.59a.59.59,0,0,0-.41-.18H3a3,3,0,0,0-3,3V51.54a3,3,0,0,0,3,3h65.4a3,3,0,0,0,3-3V33.37A3,3,0,0,0,68.38,30.39Z" />
                  <path d="M24.71,56.33l-2.88,9.28a.42.42,0,0,1-.63.23L6.42,56.1A.48.48,0,0,0,6.19,56H4.44a.42.42,0,0,0-.23.77l18,11.83a.41.41,0,0,0,.63-.22l3.68-11.84a.42.42,0,0,0-.4-.54h-1A.41.41,0,0,0,24.71,56.33Z" />
                  <path d="M23.15,0a13.21,13.21,0,0,0-9.6,4.13,14.48,14.48,0,0,0,0,19.9L34.67,46.15a1.44,1.44,0,0,0,2,0L57.6,24.27A14.6,14.6,0,0,0,59.31,6,13.26,13.26,0,0,0,38.6,4.15l-2.92,3-2.92-3A13.09,13.09,0,0,0,23.15,0Zm0,1.9A10.61,10.61,0,0,1,30.5,4.69l4.12,3.89a1.52,1.52,0,0,0,2.11,0l4.12-3.86c4.08-4.29,11.4-3.9,15.91.83S61,18.17,56.52,22.88C49.51,30.2,43,36.8,36,44.1a.37.37,0,0,1-.53,0l-21-22C11,18.31,10.44,9.78,15,5.07A11.06,11.06,0,0,1,23.14,1.9Z" />
                </g>
              </g>
            </svg>
            <h1>LoveNotes</h1>
          </div>
          <svg
            className="menuIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12.96 56.51"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <circle cx="6.48" cy="28.25" r="6.48" />
                <circle cx="6.48" cy="50.03" r="6.48" />
                <circle cx="6.48" cy="6.48" r="6.48" />
              </g>
            </g>
          </svg>
        </article>

        <article>
          <h2>Hi {user.userName}!</h2>
          <h3>{upcomingSpeech.title}</h3>
          <h3>
            {moment(`${upcomingSpeech.timeSlot}`).format('MMM Do h:mm')}pm
          </h3>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.5 69.66">
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <rect width="83.5" height="53.83" rx="15.63" />
                  <path d="M14.77,58.3,31.82,69.52a.84.84,0,0,0,1.27-.46l3.38-11.22a.84.84,0,0,0-.81-1.09H15.24A.85.85,0,0,0,14.77,58.3Z" />
                </g>
              </g>
            </svg>
            <h2>{upcomingSpeech.unreadNoteCount} Unread Notes</h2>
          </div>
        </article>
      </section>
    </>
  )
}
