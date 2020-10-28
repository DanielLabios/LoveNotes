import React, { useState, useEffect } from 'react'

export function NotePile(props) {
  const [expandedNoteId, setExpanededNoteId] = useState(0)
  const [speechIdFilter, setSpeechIdFilter] = useState(0)
  const unreadNotes = props.speeches.reduce((totalUnreadNotes, speech) => {
    return totalUnreadNotes + speech.unreadNoteCount
  }, 0)

  // useLayoutEffect(() => {
  //   document.getElementById(whichNote).scrollIntoView()
  // }, [whichNote])

  useEffect(() => {
    async function markNoteRead(id) {
      // const response =
      await fetch(`/api/Notes/${id}/reading`, {
        method: 'POST',
      })

      props.loadSpeeches()
    }

    markNoteRead(expandedNoteId)
  }, [expandedNoteId])

  async function handleNoteDelete(noteId) {
    // const response =
    await fetch(`/api/Notes/${noteId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(noteId),
    })
  }

  return (
    <>
      <section className="NotePile">
        <div
          style={{
            display: props.componentToggleState === 0 ? 'block' : 'none',
          }}
          onClick={function () {
            props.componentToggle(1)
          }}
        >
          Notes
        </div>
        <section
          style={{
            display: props.componentToggleState === 1 ? 'block' : 'none',
          }}
        >
          <main>
            <article>
              <h1>NotePile</h1>
            </article>
            <article>
              <ul>
                <b>Filter Notes By Speech</b>
                <select
                  onChange={function (event) {
                    console.log(event.target.value)
                    setSpeechIdFilter(parseInt(event.target.value))
                  }}
                >
                  <option value="0">
                    {' '}
                    All Speeches ({unreadNotes} unread)
                  </option>
                  {props.speeches.map((speech) => (
                    <option key={speech.id} value={speech.id}>
                      {speech.title} ({speech.unreadNoteCount} unread)
                    </option>
                  ))}
                </select>
              </ul>
            </article>
          </main>
          <main>
            {props.speeches
              .filter((speech) =>
                speechIdFilter === 0
                  ? speech === speech
                  : speech.id === speechIdFilter
              )
              .map((speech) => {
                return (
                  <ul className="Note">
                    {speech.notes.map((note) => {
                      return (
                        <>
                          <div>
                            <div>
                              <li
                                onClick={function () {
                                  if (expandedNoteId === note.id) {
                                    setExpanededNoteId(0)
                                  } else {
                                    setExpanededNoteId(note.id)
                                  }
                                }}
                              >
                                From {note.author} . . .
                                <div
                                  style={{
                                    display:
                                      note.id === expandedNoteId
                                        ? 'block'
                                        : 'none',
                                    width:
                                      note.id === expandedNoteId
                                        ? 'auto'
                                        : '0rem',
                                  }}
                                >
                                  <p>{note.body}</p>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 77.31 14.12"
                                  >
                                    <g id="Layer_2" data-name="Layer 2">
                                      <g id="Layer_1-2" data-name="Layer 1">
                                        <rect width="77.31" height="14.12" />
                                      </g>
                                    </g>
                                  </svg>
                                  <button
                                    onClick={() => {
                                      handleNoteDelete(note.id)
                                    }}
                                  >
                                    Del
                                  </button>
                                </div>
                              </li>
                            </div>
                          </div>
                          <svg
                            style={{
                              fill:
                                note.opened === false ? '#772432' : '#a9b2b1',
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 41.38 24.15"
                          >
                            <g id="Layer_2" data-name="Layer 2">
                              <g id="Layer_1-2" data-name="Layer 1">
                                <path d="M.72,2.9l31.88,21A1.59,1.59,0,0,0,35,23L41.31,2a1.59,1.59,0,0,0-1.52-2H1.59A1.58,1.58,0,0,0,.72,2.9Z" />
                              </g>
                            </g>
                          </svg>
                        </>
                      )
                    })}
                  </ul>
                )
              })}
          </main>
        </section>
      </section>
    </>
  )
}
