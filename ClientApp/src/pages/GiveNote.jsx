import React from 'react'
export function GiveNote() {
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
