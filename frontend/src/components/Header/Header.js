import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../contexts/AuthContext';

const UserDropdown = ({ avatar, setAvatar }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowDropdown(false);
    if (logout()) {
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div className="dropdown-container">
      {/* Avatar */}
      <img
        src={avatar || "img/default_avatar.png"}  // Cập nhật avatar khi có thay đổi
        alt="User Avatar"
        className="user-avatar"
        onClick={() => setShowDropdown(!showDropdown)}
      />

      {/* Dropdown */}
      {showDropdown && (
        <div className="dropdown-menu">
          {/* Header Info */}
          <div className="dropdown-header">
            <img src={avatar || "img/default_avatar.png"} alt="Avatar" className="dropdown-avatar" />
            <div className="dropdown-user-info">
              <span className="dropdown-name">{ 'HHHHH'}</span>
              <span className="dropdown-username">@{'lehoangvu6'}</span>
            </div>
          </div>

          {/* Links */}
          <ul className="dropdown-links">
            <li>
              <Link to="/profile" onClick={() => setShowDropdown(false)}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/write-blog" onClick={() => setShowDropdown(false)}>
                Write Blogs
              </Link>
            </li>
            <li>
              <Link to="/my-posts" onClick={() => setShowDropdown(false)}>
                My Blogs
              </Link>
            </li>
            <li>
              <Link to="/settings" onClick={() => setShowDropdown(false)}>
                Settings
              </Link>
            </li>
            <li className="logout">
              Sign out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  
  const [avatar, setAvatar] = useState('img/default_avatar.png');  // Thêm state avatar

  const openSignin = () => {
    document.querySelector('.overlay').style.display = 'block';
    const signinForm = document.querySelector('.signin-form');
    signinForm.style.display = 'flex';
    setTimeout(() => signinForm.classList.add('showSign'), 10);
    document.body.classList.add('no-scroll');
  };

  const openSignup = () => {
    document.querySelector('.overlay').style.display = 'block';
    const signupForm = document.querySelector('.signup-form');
    signupForm.style.display = 'flex';
    setTimeout(() => signupForm.classList.add('showSign'), 10);
    document.body.classList.add('no-scroll');
  };

  return (
    <header className="fixed-header">
      <div className="content">
        <nav className="navbar">
          <label htmlFor="menu-checkbox" className="toggle-menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
              />
            </svg>
          </label>
          {/* Logo */}
          <Link to="/">
            <img className="logo" src={logo} alt="Logo" />
          </Link>

          {/* Navigation Links */}
          <ul id="pc-nav">
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/myflights">Vé của tôi</Link>
            </li>
            <li>
              <Link to="/news">Tin tức</Link>
            </li>
            <li>
              <Link to="/destination">Dịch vụ</Link>
            </li>
          </ul>

          {/* Actions */}
          <div className="actions">
            
              <>
                <button className="action-link" onClick={openSignup}>
                  Đăng ký
                </button>
                <button className="btn action-btn" onClick={openSignin}>
                  Đăng nhập
                </button>
              </>
            
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
