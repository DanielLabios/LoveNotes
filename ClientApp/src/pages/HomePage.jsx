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

  useEffect(() => {
    const logged = isLoggedIn()
    setLoggedIn(logged)
  }, [])

  if (loggedIn === true) {
    const user = getUser()
    usersName = user.userName
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
      window.location.assign('/user/id') //redirect to user page please
    }
  }

  return (
    <>
      <main className="HomePage">
        <header>
          <h1>Toastmasters LoveNotes</h1>
          <h4>(number) speeches given</h4>
          <h4>(number) notes delivered</h4>
        </header>
        <body>
          <section>
            <div>
              <h2>Giving Notes?</h2>

              <form onSubmit={handleSpeechKeySubmit}>
                <input
                  onChange={handleSpeechKeyFieldChange}
                  placeholder="Enter Speech Key"
                  type="text"
                  value={speechKey}
                ></input>

                <input type="submit" value="Submit"></input>
              </form>
              {speechKeyErrorMessage && <p>{speechKeyErrorMessage}</p>}
            </div>
          </section>
          {loggedIn === false ? (
            <section>
              <div>
                <article>
                  <h2>Giving a Speech?</h2>
                  <h4>Or just want an account</h4>
                </article>
                <article>
                  <div>
                    <h1>Sign In Or</h1>
                    <Link to="/signup">
                      <h1>Create An Account</h1>
                    </Link>
                  </div>
                  <div>
                    <form onSubmit={handleFormSubmit}>
                      {errorMessage && <p>{errorMessage}</p>}
                      <input
                        onChange={handleStringFieldChange}
                        placeholder="Username"
                        name="userName"
                        type="text"
                        value={user.userName}
                      ></input>
                      <input
                        onChange={handleStringFieldChange}
                        placeholder="Password"
                        name="password"
                        type="text"
                        value={user.password}
                      ></input>

                      <input type="submit" value="Log In"></input>
                    </form>
                  </div>

                  {/* <h4>I forgot my login</h4> */}
                </article>
              </div>
            </section>
          ) : (
            <section>
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
                        window.location.assign('/user/id')
                      }}
                    >
                      Go!
                    </button>
                  </div>
                </article>
              </div>
            </section>
          )}
        </body>
      </main>
    </>
  )
}
