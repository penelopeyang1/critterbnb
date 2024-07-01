import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  useEffect(() => {
    // disable button if credential is less than 4 characters or password is less than 6 characters
    setIsButtonDisabled(!email || !firstName || !lastName || !confirmPassword ||
      username.length < 4 || password.length < 6)
  }, [email, username, firstName, lastName, password, confirmPassword]);

  return (
    <div className='signup-form'>
      <div className='signup-header'>
        <h1 className='sign-up'>Sign Up</h1>
        <div className='divider-line'></div>
      </div>

      <div className='signup-inputs'>
        <form className='inputs' onSubmit={handleSubmit}>
          <label className='user-email'>
            {/* Email */}
            <input
              type="text"
              className='user-email-input'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <div className='email-error'>
            {errors.email && <p>{errors.email}</p>}
          </div>
          <label className='username'>
            {/* Username */}
            <input
              type="text"
              className='username-input'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <div className='username-error'>
            {errors.username && <p>{errors.username}</p>}
          </div>
          <label className='first-name'>
            {/* First Name */}
            <input
              type="text"
              className='firstname-input'
              placeholder='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <div className='firstname-error'>
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>
          <label className='last-name'>
            {/* Last Name */}
            <input
              type="text"
              className='lastname-input'
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <div className='lastname-error'>
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>
          <label className='password'>
            {/* Password */}
            <input
              type="password"
              className='password-input'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className='password-error'>
            {errors.password && <p>{errors.password}</p>}
          </div>
          <label className='confirm-password'>
            {/* Confirm Password */}
            <input
              type="password"
              className='conf-pass-input'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <div className='conf-pass-error'>
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className='sign-up-button' disabled={isButtonDisabled}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
