import React, { useState } from 'react'
//import { GiveNote } from './GiveNote'
//import { Link } from 'react-router-dom'

export function AudienceGiveNote() {
  const [newNote, setNewNote] = useState({ Author: null, Body: null })
  const [charCount, setCharCount] = useState(150)

  async function handleFormSubmit(event) {
    event.preventDefault()
    console.log('I submitted')
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
          <section className="GiveNote">
            <div>
              <h1>Give Notes To (Name Of Person)</h1>
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
