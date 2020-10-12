import React from 'react'
import { Link } from 'react-router-dom'
export function HomePage() {
  return (
    <>
      <main className="HomePage">
        <header>
          <h1>Toastmasters LoveNotes</h1>
          <h4>(number) speeches given</h4>
          <h4>(number) notes delivered</h4>
        </header>
        <body>
          <section>
            <div>
              <h2>Giving Notes?</h2>
              <input type="text" value="Enter Speech Title Here"></input>
              <Link to="/user/speech/speechid">
                <input type="submit" value="Submit"></input>
              </Link>
            </div>
          </section>
          <section>
            <div>
              <article>
                <h2>Giving a Speech?</h2>
                <h4>Or just want an account</h4>
              </article>
              <article>
                <div>
                  <h1>Sign In Or</h1>
                  <h1>Create An Account</h1>
                </div>
                <div>
                  <input type="text" value="Username"></input>
                  <input type="text" value="password"></input>
                  <Link to="/user/id">
                    <input type="submit" value="Log In"></input>
                  </Link>
                </div>

                <h4>I forgot my login</h4>
              </article>
            </div>
          </section>
        </body>
      </main>
    </>
  )
}
