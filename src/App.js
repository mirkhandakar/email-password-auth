import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';
import app from "./firebase.init";
import { useState } from "react";


const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);

  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }

  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  }

  const handleRegisteredChange = event => {
    setRegistered(event.target.checked);
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if (!/(?=.*[!#$%&? "])/.test(password)) {
      setError("should contain at least special character");
      return;
    }

    setValidated(true);
    setError('');

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');
        })
        .catch(error => {
          console.log(error);
          setError(error.message);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');
          verifyEmail();
          setUserName();
        })
        .catch(error => {
          console.log(error);
          setError(error.message);
        })
    }

    const setUserName = () => {
      updateProfile(auth.currentUser, {
        displayName: name
      })
        .then(() => {
          console.log('updating name');
        })
        .catch(error => {
          setError(error.message);
        })
    }
    const verifyEmail = () => {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('Email verification send');
        })
    }

    const handlePasswordReset = () => {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('Password request sent');
        })
    }
    event.preventDefault();
  }
  return (
    <div>

      <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="registration w-50 mx-auto mt-5">
        <h2 className="text-primary">{registered ? 'Please Login' : 'Please Register!!!'}</h2>
        {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your Name</Form.Label>
          <Form.Control onBlur={handleEmailBlur} type="text" placeholder="Enter your name" required />
          <Form.Control.Feedback type="invalid">
            Please provide your name.
          </Form.Control.Feedback>
        </Form.Group>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
          <p className="text-danger mt-2">{error}</p>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check onChange={handleRegisteredChange}
            label="Already registered?"
          />
        </Form.Group>
        <Button variant="link">Forgot Password?</Button>
        <br />
        <Button variant="primary" type="submit">
          {registered ? 'Login' : 'Registered'}
        </Button>
      </Form>
    </div>
  );
}

export default App;
