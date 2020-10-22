import React, { useState, useEffect, useLayoutEffect } from 'react'
import Axios from 'axios'

export function NotePile(props) {
  const [expandedNoteId, setExpanededNoteId] = useState(0)

  // useLayoutEffect(() => {
  //   document.getElementById(whichNote).scrollIntoView()
  // }, [whichNote])

  useEffect(() => {
    async function markNoteRead(id) {
      const response = await fetch(`/api/Notes/${id}/reading`, {
        method: 'POST',
      })

      props.loadSpeeches()
    }

    markNoteRead(expandedNoteId)
  }, [expandedNoteId])

  const unreadNotes = props.speeches.reduce((totalUnreadNotes, speech) => {
    return (
      totalUnreadNotes + speech.unreadNoteCount
      //speech.notes.filter((speech) => speech.opened === false).length
    )
  }, 0)

  return (
    <>
      <section className="NotePile">
        <main>
          <article>
            <h1>NotePile</h1>
          </article>
          <article>
            <b>{unreadNotes} unread notes for (all speeches)</b>
            <ul>
              <b>Filter Notes By Speech</b>
              <select
                onChange={function () {
                  // Something
                }}
              >
                <option value="0"></option>
                {props.speeches.map((speech) => (
                  <option key={speech.id} value={speech.id}>
                    {speech.title}
                  </option>
                ))}
              </select>
            </ul>
          </article>
        </main>
        <main>
          {props.speeches.map((speech) => {
            return (
              <ul className="Note">
                {speech.notes.map((note) => {
                  return (
                    <li
                      onClick={function () {
                        if (expandedNoteId === note.id) {
                          setExpanededNoteId(0)
                        } else {
                          setExpanededNoteId(note.id)
                        }
                      }}
                    >
                      {note.author}
                      <div
                        style={{
                          display:
                            note.id === expandedNoteId ? 'block' : 'none',
                        }}
                      >
                        {note.body}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </main>
      </section>
    </>
  )
}
