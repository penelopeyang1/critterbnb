import { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // disable button if credential is less than 4 characters or password is less than 6 characters
    if (credential.length < 4 || password.length < 6) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors({
            message: data.message === 'Invalid credentials' ?
              'The provided credentials were invalid' : data.message
          });
        }
      });
  };

  const demoLogin = () => {
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
      .then(closeModal);
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.message && <p>{errors.message}</p>}
        <button type="submit" disabled={isButtonDisabled}>Log In</button>
        <button className='demo-login' onClick={demoLogin}>
          <img src='' alt='' />
          Login as a Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
