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
    <div className='login-form'>
      <div className='login-header'>
        <h1 className='login'>Log In</h1>
        <div className='divider-line'></div>
      </div>

      <div className='login-inputs'>
        <form className='inputs' onSubmit={handleSubmit}>
          <label className='user-email'>
          {/* Username or Email */}
            <input
              type="text"
              className='user-email-input'
              placeholder='Username or Email'
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label className='password'>
            {/* Password */}
            <input
              className='password-input'
              placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className='error-message'>
            {errors.message && <p>{errors.message}</p>}
          </div>
          <button className="login-button" type="submit" disabled={isButtonDisabled}>Log In</button>
          <button className='demo-login' onClick={demoLogin}>
            Login as a Demo User
            <img className='timmy-icon' src='../../../timmy-icon.png' alt='' />
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
