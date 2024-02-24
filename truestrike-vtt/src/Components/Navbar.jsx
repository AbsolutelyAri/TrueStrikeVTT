import React, {useState} from 'react';
import './Navbar.css';
import Button from './Button';
import { useHistory } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  let history = useHistory();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = (to) => {
    history.push(to)
  }
  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-menu"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>
      <div className={`menu-items ${isOpen ? 'open' : ''}`}>
        <Button text="Upload Map" onClick={handleClick("/upload-map")} />
        <Button text="Settings" onClick={handleClick("/settings")} />
      </div>
    </nav>
  )
}

export default Navbar