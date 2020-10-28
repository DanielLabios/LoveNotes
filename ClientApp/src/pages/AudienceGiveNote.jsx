import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../components/Header.jsx'
//import { GiveNote } from './GiveNote'
//import { Link } from 'react-router-dom'

export function AudienceGiveNote() {
  const params = useParams()
  const speechKey = String(params.speechKey)
  const [pageDetails, setPageDetails] = useState({})
  const [newNote, setNewNote] = useState({ Author: null, Body: null })
  const [charCount, setCharCount] = useState(150)
  const [errorMessage, setErrorMessage] = useState()
  const [showWrite1More, setShowWrite1More] = useState(false)

  useEffect(() => {
    loadPageDetails()
  }, [])

  useEffect(() => {
    setNewNote({ ...newNote, Body: null })
  }, [showWrite1More])

  async function loadPageDetails() {
    const response = await fetch(`/api/Speeches/${speechKey}`)
    const json = await response.json()
    if (json.status === 400) {
      window.location.assign('/')
    } else {
      setPageDetails(json)
      console.log(json)
    }
  }

  async function handleFormSubmit(event) {
    event.preventDefault()
    const response = await fetch('/api/Notes', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },

      body: JSON.stringify({ ...newNote, speechId: pageDetails.speechId }),
    })

    const apiResponse = await response.json()
    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      setShowWrite1More(true)
    }
  }

  function handleAuthorStringFieldChange(event) {
    const value = event.target.value
    const updatedNote = { ...newNote, Author: value }
    setNewNote(updatedNote)
  }

  function handleBodyStringFieldChange(event) {
    const value = event.target.value

    if (value.length !== 151) {
      const updatedCharCount = 150 - value.length
      setCharCount(updatedCharCount)
      console.log(updatedCharCount)
      const updatedNote = { ...newNote, Body: value }

      setNewNote(updatedNote)
    }
  }
  return (
    <>
      <Header />
      <main className="AudienceGiveNote">
        <body>
          <section>
            <h3>Speech Title</h3>
            <h1>{pageDetails.title}</h1>
            <h3>Speaker Name</h3>
            <h1>{pageDetails.speechPerformerName}</h1>
          </section>
          <section className="GiveNote">
            <div>
              <h1
                onClick={() => {
                  console.log('speechKey')
                }}
              >
                Give Notes To {pageDetails.speechPerformerName}
              </h1>
              <form
                className={showWrite1More ? 'numbuh2' : 'numbuh1'}
                style={{
                  display: 'block',
                  //display: showWrite1More === false ? 'block' : 'none',
                }}
                onSubmit={handleFormSubmit}
              >
                <input
                  placeholder="anonymous..."
                  type="text"
                  name="Author"
                  value={newNote.Author}
                  onChange={handleAuthorStringFieldChange}
                ></input>
                <textarea
                  placeholder={errorMessage && errorMessage}
                  name="Body"
                  value={newNote.Body}
                  onChange={handleBodyStringFieldChange}
                ></textarea>
                <p>{`${charCount} characters left`}</p>
                <input type="submit" value="Submit"></input>
              </form>
              <div
                className={showWrite1More ? 'numbuh2' : 'numbuh1'}
                style={{
                  // display: showWrite1More === false ? 'block' : 'none',
                  display: 'block',
                }}
              >
                <h1>Note Has Been Sent</h1>
                <h3>Do you want to send another?</h3>
                <div>
                  <button
                    onClick={() => {
                      setShowWrite1More(false)
                    }}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      window.location.assign('/')
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </section>
        </body>
      </main>
    </>
  )
}
