import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
//import { GiveNote } from './GiveNote'
//import { Link } from 'react-router-dom'

export function AudienceGiveNote() {
  const params = useParams()
  const speechKey = String(params.speechKey)
  const [pageDetails, setPageDetails] = useState({})
  const [newNote, setNewNote] = useState({ Author: null, Body: null })
  const [charCount, setCharCount] = useState(150)

  useEffect(() => {
    loadPageDetails()
  }, [])

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

      body: JSON.stringify({ ...newNote, speechId: 10 }),
    })
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
      <main>
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
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  name="Author"
                  value={newNote.Author}
                  onChange={handleAuthorStringFieldChange}
                ></input>
                <textarea
                  name="Body"
                  value={newNote.Body}
                  onChange={handleBodyStringFieldChange}
                ></textarea>
                <p>{`${charCount} characters left`}</p>
                <input type="submit" value="Submit"></input>
              </form>
            </div>
          </section>
        </body>
      </main>
    </>
  )
}
