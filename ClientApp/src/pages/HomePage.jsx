import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { recordAuthentication, isLoggedIn, logout, getUser } from '../auth'
export function HomePage() {
  const [errorMessage, setErrorMessage] = useState()
  const [speechKeyErrorMessage, setSpeechKeyErrorMessage] = useState()
  const [loggedIn, setLoggedIn] = useState(false)

  const [user, setUser] = useState({
    userName: '',
    password: '',
  })
  const [speechKey, setSpeechKey] = useState('')
  let usersName = ''
  let usersId = null

  useEffect(() => {
    const logged = isLoggedIn()
    setLoggedIn(logged)
  }, [])

  if (loggedIn === true) {
    const user = getUser()
    usersName = user.name
    usersId = user.id
  }

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedUser = { ...user, [fieldName]: value }

    setUser(updatedUser)
  }

  function handleSpeechKeyFieldChange(event) {
    setSpeechKey(event.target.value)
  }

  async function handleSpeechKeySubmit(event) {
    event.preventDefault()

    const response = await fetch(`api/Speeches/TimeValid${speechKey}`, {
      method: 'Get',
      headers: { 'content-type': 'application/json' },
    })
    const apiResponse = await response.json()
    if (apiResponse.status === 400) {
      setSpeechKeyErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      window.location.assign(`/Notes/${speechKey}`)
    }
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('api/Sessions', {
      method: 'Post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user),
    })
    const apiResponse = await response.json()

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      recordAuthentication(apiResponse)
      window.location.assign(`/user/${apiResponse.user.id}`) //redirect to user page please
    }
  }

  return (
    <>
      <main className="HomePage">
        <header>
          <h1>Toastmasters LoveNotes</h1>
          {/* <h4>(number) speeches given</h4>
          <h4>(number) notes delivered</h4> */}
        </header>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.36 68.7">
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <path d="M68.38,30.39H55a.59.59,0,0,0-.41.18l-.57.59a.57.57,0,0,0,.41,1H68.32a1.34,1.34,0,0,1,1.34,1.34v18a1.34,1.34,0,0,1-1.34,1.35H3a1.34,1.34,0,0,1-1.35-1.35v-18A1.34,1.34,0,0,1,3,32.12H16.93a.57.57,0,0,0,.41-1l-.57-.59a.59.59,0,0,0-.41-.18H3a3,3,0,0,0-3,3V51.54a3,3,0,0,0,3,3h65.4a3,3,0,0,0,3-3V33.37A3,3,0,0,0,68.38,30.39Z" />
              <path d="M24.71,56.33l-2.88,9.28a.42.42,0,0,1-.63.23L6.42,56.1A.48.48,0,0,0,6.19,56H4.44a.42.42,0,0,0-.23.77l18,11.83a.41.41,0,0,0,.63-.22l3.68-11.84a.42.42,0,0,0-.4-.54h-1A.41.41,0,0,0,24.71,56.33Z" />
              <path d="M23.15,0a13.21,13.21,0,0,0-9.6,4.13,14.48,14.48,0,0,0,0,19.9L34.67,46.15a1.44,1.44,0,0,0,2,0L57.6,24.27A14.6,14.6,0,0,0,59.31,6,13.26,13.26,0,0,0,38.6,4.15l-2.92,3-2.92-3A13.09,13.09,0,0,0,23.15,0Zm0,1.9A10.61,10.61,0,0,1,30.5,4.69l4.12,3.89a1.52,1.52,0,0,0,2.11,0l4.12-3.86c4.08-4.29,11.4-3.9,15.91.83S61,18.17,56.52,22.88C49.51,30.2,43,36.8,36,44.1a.37.37,0,0,1-.53,0l-21-22C11,18.31,10.44,9.78,15,5.07A11.06,11.06,0,0,1,23.14,1.9Z" />
            </g>
          </g>
        </svg>
        <div className="psuedo-element"></div>
        <div className="body">
          <section>
            <div>
              <h2>Giving Notes?</h2>

              <form onSubmit={handleSpeechKeySubmit}>
                <input
                  className="text"
                  onChange={handleSpeechKeyFieldChange}
                  placeholder="Enter Speech Key"
                  type="text"
                  value={speechKey}
                ></input>

                <input className="clicker" type="submit" value="Submit"></input>
              </form>
              {speechKeyErrorMessage && <p>{speechKeyErrorMessage}</p>}
            </div>
          </section>
          {loggedIn === false ? (
            <section>
              <div>
                <div>
                  <article>
                    <h4>To give speeches and see notes</h4>
                  </article>
                  <div>
                    <article>
                      <div>
                        <h4>Don't have an account?</h4>
                        <Link to="/signup">
                          <h1>Create An Account</h1>
                        </Link>
                      </div>
                      {/* <h4>I forgot my login</h4> */}
                    </article>
                    <div>
                      <h2>Sign In</h2>
                      <form onSubmit={handleFormSubmit}>
                        {errorMessage && <p>{errorMessage}</p>}
                        <input
                          className="text"
                          onChange={handleStringFieldChange}
                          placeholder="Username"
                          name="userName"
                          type="text"
                          value={user.userName}
                        ></input>
                        <input
                          className="text"
                          onChange={handleStringFieldChange}
                          placeholder="Password"
                          name="password"
                          type="password"
                          value={user.password}
                        ></input>

                        <input
                          className="clicker"
                          type="submit"
                          value="Log In"
                        ></input>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section>
              <div>
                <div>
                  <article>
                    <h2>Already logged in as, </h2>
                    <h2>{usersName}</h2>
                  </article>
                  <article>
                    <div>
                      <h1>Different User?</h1>
                      <button
                        onClick={() => {
                          logout()
                          window.location.assign('/')
                        }}
                      >
                        Logout
                      </button>
                      <h1>Access Notes and Speeches</h1>
                      <button
                        onClick={() => {
                          window.location.assign(`/user/${usersId}`)
                        }}
                      >
                        Go!
                      </button>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  )
}
