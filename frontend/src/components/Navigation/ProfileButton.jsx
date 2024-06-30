import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { Link } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();


  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
        <i className="fas fa-user-circle" />
        <div className='lines'>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li className='hello-user'>Hello, {user.firstName}</li>
        {/* <hr className='divider-line'/> */}
        <li>{user.username}</li>
        <li>{user.email}</li>
        <li>
          <div className='manage'>
            <Link className='manage-spots' to='/spots' onClick={() => setShowMenu(false)}>
              <p>Manage Spots</p>
            </Link>
          </div>
          <div className='divider-line'></div>
          <button className='logout-button' onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
