import Header from "./Header"
import { useForm} from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Token } from "@mui/icons-material";



function CreateAcount() {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('accessToken');
    const { register, handleSubmit } = useForm();
    const navigate=useNavigate()
    

    const [formData, setFormData] = useState({
      name: "",
      type:"",
      balence:"",
   });
 

   const onSubmit = async () => {

   
    try {
      const response = await axios.post(`${BASE_URL}/CreateAcount`,formData,{
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
                  <h4 className="card-title">Create an acount</h4>
                </div>
                <div className="card-body">

                  <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="row">
                      <div className="mb-3 col-xl-12">
                        <label className="form-label">Account Name</label>
                        <input type="text" className="form-control" placeholder="name" 
                      {...register("name", { required: "ce champs est obligatoire" })}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                      </div>


                      <div className="mb-3 col-xl-12">
                        <label className="form-label">Account Type</label>
                        <input type="text" className="form-control" placeholder="type" 
                      {...register("type", { required: "ce champs est obligatoire" })}
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })} />
                      </div>


                      <div className="mb-3 col-xl-4">
                        <label className="form-label">Balance  </label>
                        <input type="text" className="form-control" placeholder="RWF" 
                      {...register("balence", { required: "ce champs est obligatoire" })}
                      value={formData.balence}
                      onChange={(e) => setFormData({ ...formData, balence: e.target.value })} />
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

export default CreateAcount
