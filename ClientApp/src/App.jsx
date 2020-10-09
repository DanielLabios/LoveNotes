import React from 'react'
import './custom.scss'
import { NotePile } from './NotePile.jsx'
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
      <NotePile />
    </>
  )
}
