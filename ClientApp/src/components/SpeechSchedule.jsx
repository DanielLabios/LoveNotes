import React, { useState, useEffect, useLayoutEffect } from 'react'
//import { Link } from 'react-router-dom'
import moment from 'moment'
import Flatpickr from 'react-flatpickr'

export function SpeechSchedule(props) {
  const [openNewSpeechBox, setOpenNewSpeechBox] = useState(false)
  const [openSpeechBoxOptions, setOpenSpeechBoxOptions] = useState(0)
  const [editSpeechBox, setEditSpeechBox] = useState(0)
  const [confirmDelete, setConfirmDelete] = useState(0)
  const [newSpeech, setNewSpeech] = useState({
    title: '',
    speechKey: '',
    timeSlot: null,
    userId: `${props.user.id}`,
  })

  function openNewSpeech() {
    setOpenNewSpeechBox(true)
  }

  function handleFormSubmit() {
    setOpenNewSpeechBox(false)
  }

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedSpeech = { ...newSpeech, [fieldName]: value }

    setNewSpeech(updatedSpeech)
  }

  // function handleDateSet() {
  //   setTestState()
  // }

  return (
    <>
      <section className="speechSchedule">
        <h1>Scheduled Speeches</h1>

        <div>
          {props.speeches.map((speech) => (
            <>
              <article>
                <body>
                  <div>
                    {editSpeechBox != speech.id ? (
                      <>
                        <h4>{moment(speech.timeSlot).format('MMM Do')}</h4>
                        <h4>{moment(speech.timeSlot).format('h:mm')}pm</h4>
                      </>
                    ) : (
                      <Flatpickr
                        options={{
                          //static: true,
                          disableMobile: true,
                          enableTime: true,
                          dateFormat: 'Y-m-d H:i',
                        }}
                        value={newSpeech.timeSlot}
                        onChange={(time) => {
                          const updatedTime = {
                            ...newSpeech,
                            timeSlot: time[0],
                          }
                          setNewSpeech(updatedTime)
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <h2>
                      Title:{'  '}
                      {editSpeechBox != speech.id ? (
                        <span>{speech.title}</span>
                      ) : (
                        <input
                          type="text"
                          name="title"
                          value={newSpeech.title}
                          onChange={handleStringFieldChange}
                        ></input>
                      )}
                    </h2>

                    <h2>
                      Speech Key:{'  '}
                      {editSpeechBox != speech.id ? (
                        <span>{speech.speechKey}</span>
                      ) : (
                        <input
                          type="text"
                          name="speechKey"
                          value={newSpeech.speechKey}
                          onChange={handleStringFieldChange}
                        ></input>
                      )}
                    </h2>
                  </div>
                </body>
                <body>
                  <svg
                    onClick={function () {
                      if (openSpeechBoxOptions === speech.id) {
                        setOpenSpeechBoxOptions(0)
                      } else {
                        setOpenSpeechBoxOptions(speech.id)
                      }
                    }}
                    className="menuIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12.96 56.51"
                  >
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <circle cx="6.48" cy="28.25" r="6.48" />
                        <circle cx="6.48" cy="50.03" r="6.48" />
                        <circle cx="6.48" cy="6.48" r="6.48" />
                      </g>
                    </g>
                  </svg>
                </body>
              </article>

              {openSpeechBoxOptions === speech.id && (
                <article className="speechButtons">
                  {editSpeechBox != speech.id ? (
                    <>
                      <button
                        onClick={function () {
                          setNewSpeech({
                            title: speech.title,
                            speechKey: speech.speechKey,
                            timeSlot: speech.timeSlot,
                            userId: `${props.user.id}`,
                          })
                          setEditSpeechBox(speech.id)
                        }}
                      >
                        Edit
                      </button>
                      {confirmDelete != speech.id ? (
                        <button
                          onClick={() => {
                            setConfirmDelete(speech.id)
                          }}
                        >
                          Delete
                        </button>
                      ) : (
                        <div>
                          <h3>Are You Sure?</h3>
                          <div>
                            <button>Yes</button>
                            <button
                              onClick={() => {
                                setConfirmDelete(0)
                                setOpenSpeechBoxOptions(0)
                              }}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <button>Save</button>
                      <button
                        onClick={function () {
                          setNewSpeech({
                            title: '',
                            speechKey: '',
                            timeSlot: null,
                            userId: `${props.user.id}`,
                          })
                          setEditSpeechBox(0)
                          setOpenSpeechBoxOptions(0)
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </article>
              )}
            </>
          ))}
          <article>
            <h1 onClick={openNewSpeech}>New Speech</h1>
            {openNewSpeechBox && (
              <form onSubmit={handleFormSubmit}>
                <p className="form-input">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newSpeech.title}
                    onChange={handleStringFieldChange}
                  ></input>
                </p>
                <p className="form-input">
                  <label>Speech Key</label>
                  <input
                    type="text"
                    name="speechKey"
                    value={newSpeech.speechKey}
                    onChange={handleStringFieldChange}
                  ></input>
                </p>
                <p className="form-input">
                  <label>Schedule</label>
                  <input
                    type="datetime-local"
                    name="timeSlot"
                    value={newSpeech.timeSlot}
                    onChange={handleStringFieldChange}
                  ></input>
                  <input type="submit" value="Add Speech" />
                </p>
              </form>
            )}
          </article>
        </div>
      </section>
    </>
  )
}
