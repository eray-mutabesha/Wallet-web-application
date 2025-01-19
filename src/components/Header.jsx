import { useEffect,useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";



function Header() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('accessToken');
  const [UserDatas,SetUserDatas]=useState([])


  const GetUserDatas =()=>{
    axios.get(`${BASE_URL}/GetUserData`,{
      headers: {
          Authorization: `Bearer ${token}`,
      },
  })  
    .then(({ data }) => {
      SetUserDatas(data.data || []); 
    })
    .catch((err) => {
      console.log(err);
      toast.error("error");
    });
  }

useEffect(()=>{
  GetUserDatas()
},[])

const handledeconnexion = ()=>{
  localStorage.clear()
 navigate("/")
}







  return (
    <div>
          <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="header-content">
              <div className="header-left">
                <div className="brand-logo"><a className="mini-logo" href="index.html"><img src="images/logoi.png" alt width={40} /></a></div>

              </div>
              <div className="header-right">
                <div className="dark-light-toggle" onClick={() => themeToggle()}>
                  <span className="dark"><i className="fi fi-rr-eclipse-alt" /></span>
                  <span className="light"><i className="fi fi-rr-eclipse-alt" /></span>
                </div>

                <div className="dropdown profile_log dropdown">
                  <div data-bs-toggle="dropdown">
                    <div className="user icon-menu active"><span><i className="fi fi-rr-user" /></span></div>
                  </div>
                  <div tabIndex={-1} role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu dropdown-menu-end">
                    <div className="user-email">
                      <div className="user">
                     
                        <div className="user-info">
                          <h5>{UserDatas[0]?.name}</h5>
                          <span>{UserDatas[0]?.email}</span>
                        </div>
                      </div>
                    </div>

                    <a className="dropdown-item" href="/wallet">
                      <span><i className="fi fi-rr-wallet" /></span>
                      Wallets
                    </a>

                    <a className="dropdown-item logout"  onClick={handledeconnexion}>
                      <span><i className="fi fi-bs-sign-out-alt" /></span>
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>





    <div className="sidebar">
      <div className="brand-logo"><a className="full-logo" href="index.html"><img src="images/logoi.png" alt width={30} /></a>
      </div>
      <div className="menu">
        <ul>
          <li>
            <a href="/dashboard">
              <span>
                <i className="fi fi-rr-dashboard" />
              </span>
              <span className="nav-text">Home</span>
            </a>
          </li>

          <li>
            <a href="/Categories">
              <span>
                <i className="fi fi-sr-bullseye-arrow" />
              </span>
              <span className="nav-text">Categories</span>
            </a>
          </li>

          <li>
            <a href="/wallet">
              <span>
                <i className="fi fi-rr-wallet" />
              </span>
              <span className="nav-text">Wallets</span>
            </a>
          </li>
          <li>
            <a href="/budget">
              <span>
                <i className="fi fi-rr-donate" />
              </span>
              <span className="nav-text">Budgets</span>
            </a>
          </li>


 
          <li>
            <a href="/transaction">
              <span>
                <i className="fi fi-rr-user-headset" />
              </span>
              <span className="nav-text">Transaction</span>
            </a>
          </li>


        </ul>
      </div>
    </div>

    </div>
  )
}

export default Header
