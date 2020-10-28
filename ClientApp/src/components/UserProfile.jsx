import React, { useState, useEffect } from 'react'
import { authHeader, getUser } from '../auth'
import moment from 'moment'

export function UserProfile(props) {
  const user = getUser()
  const [upcomingSpeech, setUpcomingSpeech] = useState({})

  useEffect(() => {
    loadHeader()
  }, [])

  async function loadHeader() {
    console.log(authHeader())

    const url = '/api/Speeches/upcoming'
    const response = await fetch(url, { headers: { ...authHeader() } })
    const json = await response.json()
    setUpcomingSpeech(json)
  }

  return (
    <>
      <section className="UserProfile">
        <article>
          <h2>Hi {user.name}!</h2>
          <h3>{upcomingSpeech.title}</h3>
          <h3>{moment(`${upcomingSpeech.timeSlot}`).format('MMM Do h:mm')}</h3>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.5 69.66">
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <rect width="83.5" height="53.83" rx="15.63" />
                  <path d="M14.77,58.3,31.82,69.52a.84.84,0,0,0,1.27-.46l3.38-11.22a.84.84,0,0,0-.81-1.09H15.24A.85.85,0,0,0,14.77,58.3Z" />
                </g>
              </g>
            </svg>
            <h2>
              {props.speeches
                .map((speeches) => speeches.unreadNoteCount)
                .reduce((sum, current) => {
                  return sum + current
                }, 0)}{' '}
              Unread Notes
            </h2>
          </div>
        </article>
      </section>
    </>
  )
}
