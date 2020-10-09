import React, { useState } from 'react'
function NoteListGenerator() {
  return (
    <>
      <li>
        <a>(mail svg here!)</a>
        <div>
          <h2>From (Mail Author)</h2>
          <p>(500 message here)</p>
        </div>
      </li>
      <li>
        <a>(mail svg here!)</a>
        <div>
          <h2>From (Mail Author)</h2>
          <p>(500 message here)</p>
        </div>
      </li>
      <li>
        <a>(mail svg here!)</a>
        <div>
          <h2>From (Mail Author)</h2>
          <p>(500 message here)</p>
        </div>
      </li>
      <li>
        <a>(mail svg here!)</a>
        <div>
          <h2>From (Mail Author)</h2>
          <p>(500 message here)</p>
        </div>
      </li>
      <li>
        <a>(mail svg here!)</a>
        <div>
          <h2>From (Mail Author)</h2>
          <p>(500 message here)</p>
        </div>
      </li>
      <li>
        <a>(mail svg here!)</a>
        <div>
          <h2>From (Mail Author)</h2>
          <p>(500 message here)</p>
        </div>
      </li>
    </>
  )
}

export function NotePile() {
  const [openClosed, setOpenClosed] = useState('block')

  function openedClosedNotePile() {
    if (openClosed === 'none') {
      setOpenClosed('block')
    } else setOpenClosed('none')
    console.log(openClosed)
  }
  return (
    <>
      <section className="NotePile">
        <div>
          <article>
            <h1>Your Note Pile</h1>
            <a onClick={() => openedClosedNotePile()}>arrow svg here</a>
          </article>
          <article>
            <b>(6) unread notes for (all speeches)</b>
            <browse>(browse by component here)</browse>
          </article>
        </div>
        <div>
          <ul style={{ display: `${openClosed}` }}>
            <NoteListGenerator />
          </ul>
        </div>
      </section>
    </>
  )
}
