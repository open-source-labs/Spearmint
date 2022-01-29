import React, { useContext, useState} from 'react';
import { Button, TextField } from '@material-ui/core';
import styles from './ProjectLoader.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import { setGuest } from '../../context/actions/globalActions';
import OpenFolder from '../../components/OpenFolder/OpenFolderButton';
import { RiSpyLine, RiGithubFill } from 'react-icons/ri'

const { ipcRenderer } = require('electron');
// const remote = require('@electron/remote/main')

function ProjectLoader() {
  const [{ idFileDirectoryOpen }, dispatchToGlobal] = useContext(GlobalContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const addHttps = (url) => {
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
      return url;
    } if (url.startsWith('localhost')) {
      url = `http://${url}`;
      return url;
    }
    url = `https://${url}`;
    return url;
  };

  // updates state when user enters username as login input
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // updates state when user enters password as login input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // guest login
  const handleGuestLogin = () => {
    // dispatch to global context
    dispatchToGlobal(setGuest(true));
    // set logged in to true
    setIsLoggedIn(true);
    // set current username to guest
    setUsername('Guest');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.length < 4 && password.length < 4) {
      setError(true);
      setMessage('Username and Password must be longer than 4 characters');
      return;
    }
    else if (username.length < 4){
      setError(true);
      setMessage('Username must be longer than 4 characters')
      return;
    }
    else if (password.length < 4){
      setError(true);
      setMessage('Password must be longer than 4 characters')
      return;
    }

    handleLogout();
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ssid) {
          setIsLoggedIn(true);
        } else if (typeof data === 'string') {
          setError(true);
          setMessage(data);
        } else {
          setError(true);
          setMessage('Login Failed: Unknown');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleGithubLogin = () => {
    // create new window for github login
    fetch('http://localhost:3001/auth/github', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const { url } = res;
        // how we trigger the Main Process in electron to show our window
        ipcRenderer.send('Github-Oauth', url);
      })
      .catch((err) => console.log(err));
  };

  // Listens for event from electron.jsx line 205
  ipcRenderer.on('github-new-url', (event, cookies) => {
    // console.log('github-new-url channel heard something!!', cookies);
    // console.log('dotcom_user:', dotcom_user);
    setIsLoggedIn(true);
    setUsername(cookies[0].value);
  });

  const handleSignup = (e) => {
    e.preventDefault();
    if (username.length < 4 && password.length < 4) {
      setError(true);
      setMessage('Username and Password must be longer than 4 characters');
      return;
    }
    else if (username.length < 4){
      setError(true);
      setMessage('Username must be longer than 4 characters')
      return;
    }
    else if (password.length < 4){
      setError(true);
      setMessage('Password must be longer than 4 characters')
      return;
    }

    fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    fetch('http://localhost:3001/logout')
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const renderLogin = () => (
    <div className={styles.contentBox}>
      <form id={styles.loginForm} onSubmit={handleLogin}>
        <TextField
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          label="Username"
          variant="outlined"
          size="small"
          error={error}
        />
        <TextField
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          helperText={message}
          error={error}
        />
        <div id={styles.buttonBox}>
          <Button variant="outlined" type="submit" onClick={handleLogin} id={styles.loginBtn}>
            Log In
          </Button>
          <Button variant="outlined" type="button" onClick={handleSignup} id={styles.signInBtn}>
            Sign up
          </Button>
        </div>
        <div id={styles.altButtonsBox}>
          <Button variant="outlined" id={styles.guestBtn} onClick={handleGuestLogin}>
            <span>Login as Guest</span>
            <RiSpyLine size={'1.25rem'}/>
          </Button>
          <Button variant="outlined" id={styles.gitBtn} onClick={handleGithubLogin}>
            <span>Login with GitHub</span>
            <RiGithubFill size={'1.25rem'}/>
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div id={styles.projectLoaderlight}>
      <section id={styles.upperPart}>
        <h1 id={styles.title}>spearmint</h1>
        <svg
          id={styles.leaf}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"
          />
        </svg>
        <span id={styles.slogan}>testing, simplified</span>
      </section>

      <section id={styles.lowerPart}>
        {/* Open Project Directory If User is Logged In */}
        {!isLoggedIn ? (
          renderLogin()
        ) : (
          <div className={styles.contentBox}>
            <span id={styles.welcomeText}>
              Welcome <span id={styles.userText}>{username}</span>!
            </span>
            <span id={styles.openFolderSpan}>
              Select your application
              <OpenFolder />
            </span>
            <Button variant="contained" type="button" onClick={handleLogout} id={styles.loginBtn}>
              LOGOUT
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProjectLoader;
