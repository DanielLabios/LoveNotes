import React, { useState, useEffect } from 'react'

import moment from 'moment'
import Flatpickr from 'react-flatpickr'

export function SpeechSchedule(props) {
  const userId = props.user.id

  const [errorMessage, setErrorMessage] = useState()
  const [openNewSpeechBox, setOpenNewSpeechBox] = useState(false)
  const [openSpeechBoxOptions, setOpenSpeechBoxOptions] = useState(0)
  const [editSpeechBox, setEditSpeechBox] = useState(0)
  const [confirmDelete, setConfirmDelete] = useState(0)
  const [resetStates, setResetStates] = useState(0)
  const [editSpeech, setEditSpeech] = useState({
    id: null,
    title: '',
    speechKey: '',
    timeSlot: null,
    userId: userId,
  })

  // Create a date one hour before now
  const speechTimeCutOff = moment(new Date()).subtract(1, 'hour')

  const loadSpeeches = props.loadSpeeches

  useEffect(() => {
    setOpenSpeechBoxOptions(0)
    setEditSpeechBox(0)
    setConfirmDelete(0)
    setOpenNewSpeechBox(false)
    setEditSpeech({
      id: null,
      title: '',
      speechKey: '',
      timeSlot: null,
      userId: userId,
    })
    loadSpeeches()
  }, [userId, resetStates, loadSpeeches])

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedSpeech = { ...editSpeech, [fieldName]: value }

    setEditSpeech(updatedSpeech)
  }

  function resetEditSpeech() {
    setEditSpeech({
      id: null,
      title: '',
      speechKey: '',
      timeSlot: null,
      userId: props.user.id,
    })
  }

  async function handleSpeechAdd(event) {
    event.preventDefault()
    const newSpeech = {
      title: editSpeech.title,
      speechKey: editSpeech.speechKey,
      timeSlot: editSpeech.timeSlot,
      userId: props.user.id,
      notes: [],
    }
    const response = await fetch('/api/Speeches/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },

      body: JSON.stringify(newSpeech),
    })
    const json = await response.json()
    if (response.status === 400) {
      const message = Object.values(json.errors).join(' ')

      setErrorMessage(message)
    } else {
      resetEditSpeech()
      setOpenNewSpeechBox(false)
      props.loadSpeeches()
    }
  }

  async function handleSpeechEdit(event, id) {
    event.preventDefault()

    // const response =
    await fetch(`/api/Speeches/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...editSpeech, notes: [] }),
    })

    props.loadSpeeches()
  }

  // useEffect(() => {
  //   loadSpeeches()
  // }, [])

  async function handleSpeechDelete() {
    // const response =
    await fetch(`/api/Speeches/${confirmDelete}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(confirmDelete),
    })
    //setConfirmDelete(0)
    //setOpenSpeechBoxOptions(0)
    //props.loadSpeeches()
  }

  return (
    <>
      <section className="speechSchedule">
        <button
          style={{
            display: props.componentToggleState === 1 ? 'block' : 'none',
          }}
          onClick={function () {
            props.componentToggle(0)
          }}
        >
          Speeches
        </button>
        <section
          style={{
            display: props.componentToggleState === 0 ? 'block' : 'none',
          }}
        >
          <h1>Scheduled Speeches</h1>

          <div>
            {props.speeches
              .filter((speech) =>
                moment(speech.timeSlot).isAfter(speechTimeCutOff)
              )
              .map((speech) => (
                <React.Fragment key={speech.id}>
                  <article
                    onClick={function () {
                      if (
                        openSpeechBoxOptions === speech.id &&
                        editSpeechBox !== speech.id &&
                        confirmDelete !== speech.id
                      ) {
                        setOpenSpeechBoxOptions(0)
                      } else if (
                        editSpeechBox !== 0 ||
                        confirmDelete !== 0 ||
                        openNewSpeechBox === true
                      ) {
                        return
                      } else {
                        setOpenSpeechBoxOptions(speech.id)
                        setOpenNewSpeechBox(false)
                      }
                    }}
                  >
                    <div className="body">
                      <div>
                        {editSpeechBox !== speech.id ? (
                          <>
                            <h4>{moment(speech.timeSlot).format('MMM Do')}</h4>
                            <h4>{moment(speech.timeSlot).format('h:mm')}</h4>
                          </>
                        ) : (
                          <Flatpickr
                            options={{
                              disableMobile: true,
                              enableTime: true,
                              dateFormat: 'Y-m-d H:i K',
                              //minDate: new Date(),
                            }}
                            value={editSpeech.timeSlot}
                            onChange={(time) => {
                              const updatedTime = {
                                ...editSpeech,
                                timeSlot: moment(time[0]).format(
                                  'YYYY-MM-DDTHH:mm:ss'
                                ),
                              }
                              setEditSpeech(updatedTime)
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <h2>
                          Title:{'  '}
                          {editSpeechBox !== speech.id ? (
                            <span>{speech.title}</span>
                          ) : (
                            <input
                              type="text"
                              name="title"
                              value={editSpeech.title}
                              onChange={handleStringFieldChange}
                            ></input>
                          )}
                        </h2>

                        <h2>
                          Speech Key:{'  '}
                          {editSpeechBox !== speech.id ? (
                            <span>{speech.speechKey}</span>
                          ) : (
                            <input
                              type="text"
                              name="speechKey"
                              value={editSpeech.speechKey}
                              onChange={handleStringFieldChange}
                            ></input>
                          )}
                        </h2>
                      </div>
                    </div>
                    <div className="body">
                      <svg
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
                    </div>
                  </article>

                  {openSpeechBoxOptions === speech.id && (
                    <article className="speechButtons">
                      {editSpeechBox !== speech.id ? (
                        <>
                          <button
                            onClick={function () {
                              setEditSpeech({
                                id: speech.id,
                                title: speech.title,
                                speechKey: speech.speechKey,
                                timeSlot: speech.timeSlot,
                                userId: props.user.id,
                              })
                              setEditSpeechBox(speech.id)
                            }}
                          >
                            Edit
                          </button>
                          {confirmDelete !== speech.id ? (
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
                                <button
                                  onClick={() => {
                                    handleSpeechDelete()

                                    setResetStates(resetStates + 1)
                                  }}
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => {
                                    setResetStates(resetStates + 1)
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
                          <button
                            onClick={(event) => {
                              handleSpeechEdit(event, speech.id)
                              setResetStates(resetStates + 1)
                            }}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setResetStates(resetStates + 1)
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </article>
                  )}
                </React.Fragment>
              ))}
            <article
              onClick={() => {
                if (editSpeechBox !== 0 || confirmDelete !== 0) {
                  return
                } else {
                  setOpenNewSpeechBox(true)
                  setOpenSpeechBoxOptions(0)
                }
              }}
            >
              <h1 className="new">New Speech</h1>
              {errorMessage && <p>{errorMessage}</p>}
              {openNewSpeechBox && (
                <>
                  <form
                    className="newSpeech"
                    onSubmit={(event) => {
                      handleSpeechAdd(event)
                      setResetStates(resetStates + 1)
                    }}
                  >
                    <p className="form-input">
                      <label>Title</label>
                      <input
                        type="text"
                        name="title"
                        value={editSpeech.title}
                        onChange={handleStringFieldChange}
                      ></input>
                    </p>
                    <p className="form-input">
                      <label>Speech Key</label>
                      <input
                        type="text"
                        name="speechKey"
                        value={editSpeech.speechKey}
                        onChange={handleStringFieldChange}
                      ></input>
                    </p>
                    <p className="form-input">
                      <label>TimeSlot</label>
                      <Flatpickr
                        options={{
                          disableMobile: true,
                          enableTime: true,
                          //dateFormat:"F j, Y h:i K",
                          dateFormat: 'Y-m-d h:i K',
                          //time_24hr: true,
                          //minDate: new Date(),
                        }}
                        value={editSpeech.timeSlot}
                        onChange={(time) => {
                          console.log(time[0])
                          const updatedTime = {
                            ...editSpeech,
                            timeSlot: moment(time[0]).format(
                              'YYYY-MM-DDTHH:mm:ss'
                            ),
                          }
                          setEditSpeech(updatedTime)
                        }}
                      />
                      <input
                        className="clicker"
                        type="submit"
                        value="Add Speech"
                      />
                    </p>
                    <button
                      className="clicker"
                      onClick={() => {
                        setResetStates(resetStates + 1)
                      }}
                    >
                      cancel
                    </button>
                  </form>
                </>
              )}
            </article>
          </div>
        </section>
      </section>
    </>
  )
}
