import { useEffect,useState } from "react";
import Header from "./Header"
import axios from "axios";
import toast from "react-hot-toast";
import DeleteDataAlert from "./materialUIComponents/DeleteDataAlert";




function Wallet() {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('accessToken');
    const [AcountDatas,setAcountDatas]=useState([])
    const [TransactionDatas,SetTransactionDatas]=useState([])

    const getAcountDatas =()=>{
      axios.get(`${BASE_URL}/getAcountData`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })  
      .then(({ data }) => {
        setAcountDatas(data.data || []); 
      })
      .catch((err) => {
        console.log(err);
        toast.error("Il y a une erreur");
      });
    }

useEffect(()=>{
    getAcountDatas()
},[])


//get transaction histories
const GetransactionDatas =()=>{
  axios.get(`${BASE_URL}/GetTransactionData`,{
    headers: {
        Authorization: `Bearer ${token}`,
    },
})  
  .then(({ data }) => {
    SetTransactionDatas(data.data || []); 
  })
  .catch((err) => {
    console.log(err);
    toast.error("Il y a une erreur");
  });
}

useEffect(()=>{
  GetransactionDatas()
},[])









//Delete account data
const HandleDelete = (model) => {
  console.log(model)
axios.delete(`${BASE_URL}/DeleteAcountData/${model.id}`,{
      headers: {
          Authorization: `Bearer ${token}`,
      },
  }
)
  .then(({ data }) => {
      setAcountDatas(data.data || []); 
      getAcountDatas();
  })
  .catch((err) => {
    console.log(err);
    toast.error("Il y a une erreur");
  });
};





  return (

<div>

  <div id="main-wrapper">

 <Header/>

    <div className="content-body">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-xl-4">
                  <div className="page-title-content">
                    <h3>Wallets</h3>
                    <p className="mb-2">Welcome to your Finance Management</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs"><a href="#">Home </a>
                    <span><i className="fi fi-rr-angle-small-right" /></span>
                    <a href="#">Wallets</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wallet-tab">
          <div className="row g-0">
            <div className="col-xl-3">
              <div className="nav d-block">
                <div className="row">
                    {
                        AcountDatas.map((data,index)=>
                        <div key={index} className="col-xl-12 col-md-6">
                        <div className="wallet-nav " data-bs-toggle="pill"  data-bs-target={`#a${index + 1}`}   >
                          <div className="wallet-nav-icon">
                            <span><i className="fi fi-rr-bank" /></span>
                          </div>
                          <div className="wallet-nav-text">
                            <h3>{data.name}</h3>
                            <p>{data.balance} RWF</p>
                            <DeleteDataAlert HandleDelete={() => HandleDelete(data)}/>
                          </div>
                         
                        </div>

                        
                      </div>
                        )
                    }


                </div>
              </div>
              <div className="add-card-link">
                <h5 className="mb-0">Add new wallet</h5>
                <a href="/createacount">
                  <i className="fi fi-rr-square-plus" />
                </a>
              </div>
            </div>
            <div className="col-xl-9">
              <div className="tab-content wallet-tab-content">
                <div className="tab-pane show active" id="a1">

                  <div className="row">

                    <div className="col-xl-12">
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title">Transaction History</h4>
                        </div>
                        <div className="card-body">
                          <div className="transaction-table">
                            <div className="table-responsive">
                              <table className="table mb-0 table-responsive-sm">
                                <thead>
                                  <tr>
                                    <th>Category</th>
                                    <th>Subcategory</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Currency</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {
                                   TransactionDatas.map((data,index)=>(
                                   <tr key={index}>
                                   <td>
                                   <span className="table-category-icon"><i className="bg-teal-500 fi fi-rr-receipt" />
                                  {data.category_name}
                                  </span>
                                  </td>
                                  <td>
                                  <span className="table-category-icon"><i className="bg-teal-500 fi fi-rr-receipt" />
                                  {data.category_name}
                                  </span>
                                   </td>
                                  <td>
                                 {data.date}
                                 </td>
                                 <td>
                                {data.description}
                                </td>
                                <td>
                               {data.amount}
                               </td>
                               <td>RWF</td>
                               </tr>
                               ))
                                }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                





              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="footer">
    <div className="container">
      <div className="row">
        <div className="col-xl-6">
          <div className="copyright">
            <p>© Copyright
              <a href="#">Eray mutabesha</a> I All Rights Reserved
            </p>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="footer-social">
            <ul>
          
              <li><a href="https://x.com/ErayMutabesha"><i className="fi fi-brands-twitter" /></a></li>
              <li><a href="https://www.linkedin.com/in/eray-mutabesha-186240256/"><i className="fi fi-brands-linkedin" /></a></li>
        
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Wallet

