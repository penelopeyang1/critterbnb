import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ? (
    <div className='logged-in'>
      <Link className='create-spot-link' to='/spots/new'>
        Create a New Spot
      </Link>
      <ProfileButton className='prof-button' user={sessionUser}/>
    </div>
  ) : (
    <div className='auth-buttons'>
      <div className='login-button-wrapper'>
        <OpenModalButton
          className='login-button'
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </div>
      <div className='signup-button-wrapper'>
        <OpenModalButton
          className='signup-button'
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    </div>
  );

  return (
    <div className='nav-elements'>
        <Link className='logo' to='/'>
          <img className='logo-png' src='../../../bold-logo.png' alt='Logo' />
        </Link>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
