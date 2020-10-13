import React, { useState, useEffect, useLayoutEffect } from 'react'
import Axios from 'axios'
function NoteListGenerator(props) {
  return (
    <>
      {props.notes
        .sort((a, b) => {
          return b.id - a.id
        })
        .map((note, index) => (
          <li key={index} id={index} onClick={() => props.click(index)}>
            <a
              style={{
                display: props.states
                  .filter((state, i) => i === index)
                  .map((state) => state.liATag),
              }}
            >
              {`${note.opened}` ? 'yes' : 'no'}
            </a>
            <div>
              <div
                style={{
                  width: props.states
                    .filter((state, i) => i === index)
                    .map((state) => state.divDivTag),
                }}
              >
                <a
                  style={{
                    display: props.states
                      .filter((state, i) => i === index)
                      .map((state) => state.divATag),
                  }}
                >
                  (mail svg here!)
                </a>
                <h2>From {note.author}</h2>
              </div>
              <p
                style={{
                  display: props.states
                    .filter((state, i) => i === index)
                    .map((state) => state.divPTag),
                }}
              >
                {note.body}
              </p>
            </div>
          </li>
        ))}
    </>
    // ======Closed Note HTML Structure======
    //   <li onClick={() => console.log(notes)}>
    //     <a style={{ display: 'none' }}>(mail svg here!)</a>
    //     <div>
    //       <div style={{ width: '30rem' }}>
    //         <a style={{ display: 'block' }}>(mail svg here!)</a>
    //         <h2>From (Mail Author)</h2>
    //       </div>
    //       <p style={{ display: 'block' }}>(500 message here)</p>
    //     </div>
    //   </li>

    //======Open Note HTML Structure======

    //   <li>
    //     <a style={{ display: 'block' }}>(mail svg here!)</a>
    //     <div>
    //       <div style={{ width: '25rem' }}>
    //         <a style={{ display: 'none' }}>(mail svg here!)</a>
    //         <h2>From (Mail Author)</h2>
    //       </div>
    //       <p style={{ display: 'none' }}>(500 message here)</p>
    //     </div>
    //   </li>
  )
}

export function NotePile() {
  const [notes, setNotes] = useState([])
  const [openClosedNotePile, setOpenClosedNotePile] = useState('block')
  const [openClosedNote, setOpenClosedNote] = useState([])

  function createOpenClosedNoteStates(json) {
    const state = {
      liATag: 'block',
      divDivTag: '25rem',
      divATag: 'none',
      divPTag: 'none',
    }
    let allStates = []
    for (let index = 0; index < json.length; index++) {
      allStates.push(state)
    }
    return allStates
  }

  useEffect(() => {
    async function loadNotes() {
      const url = '/api/Note'
      const response = await fetch(url)
      const json = await response.json()
      setNotes(json)
      //console.log(json.length)
      setOpenClosedNote(createOpenClosedNoteStates(json))
    }
    loadNotes()
  }, [])

  // useLayoutEffect(() => {
  //   document.getElementById(whichNote).scrollIntoView()
  // }, [whichNote])

  function openedClosedNote(whichNote) {
    let allStates = []
    const closedState = {
      liATag: 'block',
      divDivTag: '25rem',
      divATag: 'none',
      divPTag: 'none',
    }
    const openState = {
      liATag: 'none',
      divDivTag: '30rem',
      divATag: 'block',
      divPTag: 'block',
      opened: 'true',
    }
    for (let index = 0; index < openClosedNote.length; index++) {
      if (index === whichNote) {
        allStates.push(openState)
      } else allStates.push(closedState)
      setOpenClosedNote(allStates)
      // document.getElementById(whichNote).scrollIntoView()
    }
  }

  function openedClosedNotePile() {
    if (openClosedNotePile === 'none') {
      setOpenClosedNotePile('block')
    } else setOpenClosedNotePile('none')
  }
  return (
    <>
      <section className="NotePile">
        <main>
          <article>
            <h1>Your Note Pile</h1>
            <a onClick={() => openedClosedNotePile()}>arrow svg here</a>
          </article>
          <article>
            <b>(6) unread notes for (all speeches)</b>
            <browse>(browse by component here)</browse>
          </article>
        </main>
        <main>
          <ul className="Note" style={{ display: `${openClosedNotePile}` }}>
            <NoteListGenerator
              notes={notes}
              click={openedClosedNote}
              states={openClosedNote}
            />
          </ul>
        </main>
      </section>
    </>
  )
}
