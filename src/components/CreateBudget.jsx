import Header from "./Header"
import { useForm} from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function CreateBudget() {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('accessToken');
    const { register, handleSubmit } = useForm();
    const navigate=useNavigate()

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

    const [formData, setFormData] = useState({
      amount: "",
      start_date:"",
      end_date:"",
      category_name:"",

   });
 

   const onSubmit = async () => {

   
    try {
      const response = await axios.post(`${BASE_URL}/CreateBudget`,formData,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === 500) {
        toast.error("Error");
      } else {
        navigate("/toastbudgetsuccescreated")
  
      }
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    }};



console.log(token)






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
                  <h4 className="card-title">
                  set a budget</h4>
                </div>
                <div className="card-body">

                  <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="row">


                    <div className="mb-3 col-12">
                          <label className="form-label">Category</label>
                          <select className="form-select"  {...register("category_name", { required: "Please select a category" })}
                              value={formData.category_name}
                              onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}>
                         <option value="">Choose...</option>
                        {CategoriesDatas.map((data, index) => (
                        <option key={index} value={data.name}>{data.name}</option>
                       ))
                        }
                       </select>
                      </div>

                    <div className="mb-3 col-xl-12">
                        <label className="form-label">End date</label>
                        <input type="date" className="form-control" placeholder="end date" 
                      {...register("start_date", { required: "ce champs est obligatoire" })}
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
                      </div>


                      <div className="mb-3 col-xl-12">
                        <label className="form-label">End date</label>
                        <input type="date" className="form-control" placeholder="end date" 
                      {...register("end_date", { required: "ce champs est obligatoire" })}
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
                      </div>


                      <div className="mb-3 col-xl-4">
                        <label className="form-label">Limit amount  </label>
                        <input type="text" className="form-control" placeholder="RWF" 
                      {...register("amount", { required: "ce champs est obligatoire" })}
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
                      </div>


                      <div className="text-center col-12">
                        <button type="submit" className="btn btn-success w-100">Save</button>
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

export default CreateBudget
