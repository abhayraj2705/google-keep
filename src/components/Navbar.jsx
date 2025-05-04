import { useState } from 'react';
import keepLogo from '../assets/keep-logo.svg';
import menuIcon from '../assets/Menu.svg';
import searchIcon from '../assets/Search.svg';
import refreshIcon from '../assets/refresh.svg';
import listViewIcon from '../assets/List view.svg';
import settingsIcon from '../assets/Setting.svg';
import appsIcon from '../assets/Google menu.svg';
import userIcon from '../assets/userimage.png';

const Navbar = ({ onMenuClick, onViewChange, onSearch, isListView }) => {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <img src={menuIcon} alt="Menu" />
        </button>
        <div className="logo-container">
          <img src={keepLogo} alt="Keep" className="keep-logo" />
          <span>Keep</span>
        </div>
      </div>

      <div className={`search-bar ${searchActive ? 'active' : ''}`}>
        <img src={searchIcon} alt="Search" />
        <input 
          type="text" 
          placeholder="Search"
          onFocus={() => setSearchActive(true)}
          onBlur={() => setSearchActive(false)}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="nav-right">
        <button className="icon-btn">
          <img src={refreshIcon} alt="Refresh" />
        </button>
        <button className="icon-btn" onClick={onViewChange}>
          <img src={listViewIcon} alt="List View" />
        </button>
        <button className="icon-btn">
          <img src={settingsIcon} alt="Settings" />
        </button>
        <button className="icon-btn">
          <img src={appsIcon} alt="Google Apps" />
        </button>
        <button className="icon-btn user-btn">
          <img src={userIcon} alt="User" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;