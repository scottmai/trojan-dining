import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="images/duck-waddling.gif" className="App-logo" alt="logo" />

        <Username />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// a custom component to make a request to the backend and request the user's username
function Username() {
  // this is how we store the state of the component
  // the 'username' starts out as null
  // but can be changed by calling the setUsername() function 
  // when the state changes, the component re-renders to reflect the change
  const [username, setUsername] = useState(null)
  const [error, setError] = useState(false)

  // useEffect causes this function to run only once, the first time the component renders
  // so we only make this request once
  useEffect(async () => {
    try {
      // use the axios library to make a request to the backend
      const response = await axios.get('http://localhost:8000/username/')
      if (response.statusText === "OK") {
        const usernameFromResponse = response.data.username;
        // update the state, causing the component to re-render
        setUsername(usernameFromResponse)
        setError(false)
      }
      else {
        // if there was a problem with the request, set the error state to true
        setError(true)
      }
    }
    catch {
      // an exception will be thrown if the backend is not running
      setError(true)
    }
  }, [])

  // if the error state is true, display this text.
  if (error) {
    return <div>
      There was an error fetching from the backend - make sure it is running.
    </div>
  }

  // at first, username is null, so we display this text
  if (username == null) {
    return <div>
      Hacking your device...
    </div>
  }
  // but once the username state is updated, we display it
  else {
    return <div>
      Hello {username}!
    </div>
  }
}

export default App;
