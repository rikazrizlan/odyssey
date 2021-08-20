import React, {useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Button, makeStyles, Modal} from '@material-ui/core';
import MeditationImg from '../images/meditation.png';
import Logo from '../images/logo.png';
import {useAuth} from '../contexts/AuthContext';
import '../App.css';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    maxWidth: 400,
    width: "70%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 4
  },
}));


function App() {

  //signup & login
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const { signup, login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSignUp(e) {
    e.preventDefault()

    try {
        setError("");
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value).then(cred => {
          console.log(cred);
          //the following line can be used to create a document to store some user data gathered during the signup process
          // return db.collection('users').doc(cred.user.uid).set({
          //   username: usernameRef.current.value
            return cred.user.updateProfile({
              displayName: usernameRef.current.value
          }).then(() => {
            history.push("/home");
          });
        })
    } catch {
        setError("Failed to create an account");
    }
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault()

    try {
        setError("");
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value);
        history.push('/home');
    } catch {
        setError("Failed to sign in");
    }
    setLoading(false);
}

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="App">
      {/* Sign Up form */} 
      <Modal
          open={open}
          onClose={() => setOpen(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <center>let's get started!</center>  
            <form onSubmit={handleSignUp} className="signup-form">
              <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" ref={usernameRef} required/>
              </div>
              <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" ref={emailRef} required/>
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" ref={passwordRef} required/>
              </div>
              <Button disabled={loading} type="submit" className="btn signup-btn" variant="contained" color="primary">Sign Up</Button>
            </form>
          </div>
      </Modal>
      {/* Sign Up form */}

      {/* Login form */}
      <Modal
          open={openLogin}
          onClose={() => setOpenLogin(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <center>Ready to go!</center>  
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" ref={emailRef} required/>
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" ref={passwordRef} required/>
              </div>
              <Button disabled={loading} type="submit" className="btn" variant="contained" color="primary">Login</Button>
            </form>       
          </div>
      </Modal>
      {/* Login form */}

      {/* Navigation bar */}
      <header>
        <img className="logo" src={Logo} alt="Travel"/>
        <div className="burger"></div>
        <ul className="navigation">
              <Button className="navBtn" variant="contained" color="primary" onClick={() => setOpenLogin(true)}>Login</Button>
              <Button className="navBtn" variant="outlined" onClick={() => setOpen(true)}>Sign Up</Button>
        </ul>
      </header>
      {/* Navigation bar */}

      {/* Home banner */}
      <section className="banner" id="banner">
          <h5>{error}</h5>
          <div className="content"> 
            <div className="info">
              <h2>Get Connected With Your Inner Core.</h2>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id alias optio pariatur, quia laudantium sapiente nam quaerat illo veritatis voluptates itaque cupiditate ipsum exercitationem consectetur, vel qui iste provident placeat.</p>
              <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>Get Started</Button>
            </div>
            <img src={MeditationImg} alt="Meditating"/>
          </div>
      </section>
      {/* Home banner */}
    </div>

  );
}

export default App;
