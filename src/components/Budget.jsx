import Header from './Header'
import { useEffect,useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteDataAlert from './materialUIComponents/DeleteDataAlert';



function Budget() {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('accessToken');
    const [BudgetDatas,setBudgetDatas]=useState([])
    const getBudgetDatas =()=>{
      axios.get(`${BASE_URL}/getBudgetData`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })  
      .then(({ data }) => {
        setBudgetDatas(data.data || []); 
      })
      .catch((err) => {
        console.log(err);
        toast.error("Il y a une erreur");
      });
    }

useEffect(()=>{
    getBudgetDatas()
},[])




//Delete budget data
const HandleDelete = (model) => {
    console.log(model)
  axios.delete(`${BASE_URL}/DeleteBudgetData/${model.id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  )
    .then(({ data }) => {
        setBudgetDatas(data.data || []); 
        getBudgetDatas();
    })
    .catch((err) => {
      console.log(err);
      toast.error("Il y a une erreur");
    });
};





  return (
<div id="main-wrapper">
<Header/>
  <div className="content-body">
    <div className="container">
      <div className="row">

                    {/* alert  budget over */}
                    {/* alert  budget over */}
                    {
                     BudgetDatas.map((data,index)=>(
                       <div key={index} style={{width:"60%"}}>
                        {

                          data.amount < 0 || data.amount == 0?
                          <div className="alert alert-danger alert-dismissible fade show">
                          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="me-2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                          <strong>Alert Alert! watch out budget planned for {data.category_name} is over</strong> 
                          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="btn-close">
                                            </button>
                        </div>:""
                        }


                       </div>
                       
                     ))
                     
                    }

                 {/* alert   budget over*/}
                  {/* alert budget over */}

        <div className="col-12">
          <div className="page-title">
            <div className="row align-items-center justify-content-between">
              <div className="col-xl-4">
                <div className="page-title-content">
                  <h3>Budgets</h3>
                  <p className="mb-2">Welcome Ekash Finance Management</p>
                </div>
              </div>
              <div className="col-auto">
                <div className="breadcrumbs"><a href="#">Home </a>
                  <span><i className="fi fi-rr-angle-small-right" /></span>
                  <a href="#">Budgets</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="budgets-tab">
        <div className="row g-0">
          <div className="col-xl-3">
            <div className="nav d-block">
              <div className="row">
              {
                        BudgetDatas.map((data,index)=>
                        <div key={index} className="col-xl-12 col-md-6">
                        <div className="wallet-nav " data-bs-toggle="pill"  data-bs-target={`#a${index + 1}`}   >
                          <div className="wallet-nav-icon">
                          <span><i className="fi fi-rr-money-bill-wave-alt"></i></span>
                          </div>
                          <div className="wallet-nav-text">
                            <h3>{data.category_name}</h3>
                            <p>Start date: {data.start_date}</p>
                            <p>End date: {data.end_date}</p>
                            <p>{data.amount} RWF</p>
                          </div>
                        </div>
                      </div>
                        )
                    }

              </div>
            </div>
            <div className="add-budgets-link">
              <h5 className="mb-0">Add new budget</h5>
              <a href="/createbudget">
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
                          <h4 className="card-title">
                          Planned budget</h4>
                        </div>
                        <div className="card-body">
                          <div className="transaction-table">
                            <div className="table-responsive">
                              <table className="table mb-0 table-responsive-sm">
                                <thead>
                                  <tr>
                                    <th>Category</th>
                                    <th>Subcategory</th>
                                    <th>Start date</th>
                                    <th>End date</th>
                                    <th>Remaining amount</th>
                                    <th>Currency</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {
                                   BudgetDatas.map((data,index)=>(
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
                                 {data.start_date}
                                 </td>
                                 <td>
                                {data.end_date}
                                </td>
                                <td>
                               {data.amount}
                               </td>
                               <td>RWF</td>
                               <td>


                              <DeleteDataAlert HandleDelete={() => HandleDelete(data)}/>
                            
                               </td>
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

export default Budget
