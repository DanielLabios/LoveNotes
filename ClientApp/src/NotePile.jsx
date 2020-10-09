import React, { useState } from 'react'
function NoteListGenerator() {
  const [openClosed, setOpenClosed] = useState(['block', 'none', 'none'])
  return (
    <>
      <li>
        <a style={{ display: 'none' }}>(mail svg here!)</a>
        <div>
          <div style={{ width: '30rem' }}>
            <a>(mail svg here!)</a>
            <h2>From (Mail Author)</h2>
          </div>
          <p>(500 message here)</p>
        </div>
      </li>

      <li>
        <a style={{ display: 'block' }}>(mail svg here!)</a>
        <div>
          <div>
            <a style={{ display: 'none' }}>(mail svg here!)</a>
            <h2>From (Mail Author)</h2>
          </div>
          <p style={{ display: 'none' }}>(500 message here)</p>
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
          <ul className="Note" style={{ display: `${openClosed}` }}>
            <NoteListGenerator />
          </ul>
        </main>
      </section>
    </>
  )
}
