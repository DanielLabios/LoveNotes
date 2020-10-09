import React from 'react'
import './custom.scss'
import { NotePile } from './NotePile.jsx'
function GiveNote() {
  return (
    <>
      <section className="GiveNote">
        <h1>Give Notes To (Name Of Person)</h1>
        <div>
          <input type="text" value="Note From... (Optional)"></input>
          <input type="text" value="Note Here"></input>
          <p>500 characters left</p>
          <input type="submit"></input>
        </div>
      </section>
    </>
  )
}
function UserProfile() {
  return (
    <>
      <section className="UserProfile">
        <div>
          <h1>Hello Carol OpenHeimer</h1>
          <article>
            <h3>Open Feedback Period:</h3>
            <h2>(Speech Title)</h2>
          </article>
        </div>
        <div>
          <a>(HardCodePerson Here)</a>
          <button>
            <a>(hamburger svg here!)</a>
            <a>(arrow svg here)</a>
          </button>
        </div>
      </section>
    </>
  )
}

export function App() {
  return (
    <>
      <UserProfile />
      <GiveNote />
      <NotePile />
    </>
  )
}
