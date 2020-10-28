import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
export function Signup() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()
  const [newUser, setNewUser] = useState({
    name: '',
    userName: '',
    emailAddress: '',
    password: '',
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedUser = { ...newUser, [fieldName]: value }

    setNewUser(updatedUser)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('api/Users', {
      method: 'Post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })
    const apiResponse = await response.json()
    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      history.push('/')
    }
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
        <p className="form-input">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            name="userName"
            value={newUser.userName}
            onChange={handleStringFieldChange}
          />
        </p>
        <p className="form-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleStringFieldChange}
          />
        </p>
        <p className="form-input">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleStringFieldChange}
          />
        </p>
        <p className="form-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="emailAddress"
            value={newUser.emailAddress}
            onChange={handleStringFieldChange}
          />
        </p>
        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
    </>
  )
}
