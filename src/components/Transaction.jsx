import Header from "./Header"
import { useForm} from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function Transaction() {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('accessToken');

    //get account data
    const [AcountDatas,setAcountDatas]=useState([])

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



//Get categories datas
const [CategoriesDatas,SetCategoriesDatas]=useState([])
const GetCategoriesDatas = () => {
  axios.get(`${BASE_URL}/GetCategoriesData`,{
      headers: {
          Authorization: `Bearer ${token}`,
      },
  })
    .then(({ data }) => {
      SetCategoriesDatas(data.data || []); 
    })
    .catch((err) => {
      console.log(err);
      toast.error("Il y a une erreur");
    });
};

useEffect(()=>{
  GetCategoriesDatas()
},[])


//Get subcategories datas
const [SubcategoriesDatas,SetsubcategoriesDatas]=useState([])
const GetSubcategoriesDatas = () => {
  axios.get(`${BASE_URL}/GetsubcategoriesData`,{
      headers: {
          Authorization: `Bearer ${token}`,
      },
  })
    .then(({ data }) => {
      SetsubcategoriesDatas(data.data || []); 
    })
    .catch((err) => {
      console.log(err);
      toast.error("Il y a une erreur");
    });
};

useEffect(()=>{
  GetSubcategoriesDatas()
},[])




const { register, handleSubmit } = useForm();
const navigate=useNavigate()


const [formData, setFormData] = useState({
    account_id: "",
    account_name:"",
    type:"",
    amount:"",
    category_name:"",
    description:""


});

const onSubmit = async () => {


try {
  const response = await axios.post(`${BASE_URL}/CreateTransaction`,formData,{
    headers: {
        Authorization: `Bearer ${token}`,
    },
  });
  if (response.data.status === 500) {
    toast.error("Error");
  } else {
    navigate("/toastacountsuccescreated")

  }
} catch (err) {
  console.log(err);
  toast.error("Server Error");
}};













  return (
<div>
  <div id="main-wrapper">
{/* header and side bar */}
<Header/>
{/* header and side bar */}
    <div className="content-body">
      <div className="verification section-padding">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-xl-5 col-md-6">







            <div className="card">
  <div className="card-header">
    <h4 className="card-title">Make a New Transaction</h4>
  </div>
  <div className="card-body">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">

        {/* Account Selection */}
        <div className="mb-3 col-xl-12">
          <label className="form-label">Account</label>
          <select
            className="form-control"
            {...register("account_id", { required: "Please select an account" })}
            value={formData.account_id}
            onChange={(e) => setFormData({ ...formData, account_id: e.target.value })}  >
                         <option value="">Choose...</option>
                        {AcountDatas.map((data, index) => (
                        <option key={index} value={data.id}>{data.name}</option>
                       ))
                        }
          </select>
        </div>






        {/* Transaction Type */}
        <div className="mb-3 col-xl-12">
          <label className="form-label">Transaction Type</label>
          <select
            className="form-control"
            {...register("type", { required: "Please select transaction type" })}
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="">Select Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        {/* Amount */}
        <div className="mb-3 col-xl-4">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="Amount (e.g., 100)"
            {...register("amount", { required: "Please enter an amount" })}
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>

        {/* Category Selection */}
        <div className="mb-3 col-xl-12">
          <label className="form-label">Category</label>
          <select
            className="form-control"
            {...register("category_name", { required: "Please select a category" })}
            value={formData.category_name}
            onChange={(e) => setFormData({ ...formData, category_name: e.target.value })} >

                         <option value=""><p></p>Choose...</option>
                        {CategoriesDatas.map((data, index) => (
                        <option key={index} value={data.name}>{data.name}</option>
                       ))
                        }
          </select>
        </div>

        {/* Subcategory Selection */}
        <div className="mb-3 col-xl-12">
          <label className="form-label">Subcategory</label>
          <select
            className="form-control"
            {...register("subcategory_name", { required: "Please select a subcategory" })}
            value={formData.subcategory_name}
            onChange={(e) => setFormData({ ...formData, subcategory_name: e.target.value })}
          >
                          <option value="">Choose...</option>
                        {SubcategoriesDatas.map((data, index) => (
                        <option key={index} value={data.name}>{data.name}</option>
                       ))
                        }
          </select>
        </div>

        {/* Description */}
        <div className="mb-3 col-xl-12">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Describe the transaction"
            {...register("description", { required: "Please provide a description" })}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center col-12">
          <button type="submit" className="btn btn-success w-100">
            Save Transaction
          </button>
        </div>

      </div>
    </form>
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
</div>

  )
}

export default Transaction
