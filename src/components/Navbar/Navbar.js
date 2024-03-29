import React, { useState } from 'react';
import './Navbar.css';
import { Badge } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import Modal from '../../Modal';
import Cart from '../../screens/Cart';
import { useCart } from '../ContextReducer';

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  let data=useCart()
  const navigate=useNavigate()

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
const [cartView,setCartView]=useState(false)
const handleCloseCartModal = () => {
  setCartView(false); // Close the cart modal
};
  const handleLogout=()=>{
localStorage.removeItem("authToken")
navigate("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light pt-3 pb-3">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">GoFood</Link>
          <button className="navbar-toggler bg-light" type="button" onClick={toggleNavbar} aria-expanded={isNavbarOpen ? 'true' : 'false'} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken"))?
                 <li className="nav-item">
                 <Link className="nav-link active text-white" aria-current="page" to="/myOrder">MyOrders</Link>
               </li>
              :""}
            </ul>
            {(!localStorage.getItem("authToken"))?
            <div className='d-flex'>
                <Link className="btn bg-white mx-2 button" to="/login">Login</Link>
                <Link className="btn bg-white mx-2 button"  to="/Signup">Signup</Link>
            </div>
            :<div>
              <div className='btn bg-white mx-2 button' onClick={()=>{setCartView(true)}}> <i class="fa-solid fa-cart-shopping mx-1" id="cart-icon"></i>
              <Badge pill bg="danger">{data.length}</Badge>
              {cartView?<Modal onClose={handleCloseCartModal}><Cart/></Modal>:null}
              </div>
              <div className='btn bg-danger text-white mx-2 button' onClick={handleLogout}>Logout</div>
              </div>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
