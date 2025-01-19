import { useForm} from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState,useEffect} from 'react';
import Header from "../Header";




function UpdateCategories({singleData,onUpdate}) {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('accessToken');
  
    
  useEffect(() => {
    if (singleData) {
      setFormData({
        name: "",
  });
    }
  }, [singleData]);

  const { register, handleSubmit } = useForm();
  const [formData, setFormData] = useState({
  name: "",
  });

  const onSubmit = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/UpdateCategoriesData/${singleData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
      },
      });
  
      if (response.data.status === 500) {
        toast.error("Il y a une erreur");
      } else {
        
        toast.success("Edit successful");
        onUpdate()
       
      }
  
      console.log(formData)
    } catch (err) {
      console.log(err);
      toast.error("Erreur technique, essayez plus tard");
    }
  };





  return (
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
                      <h3>Categories</h3>
                      <p className="mb-2">Welcome to your Finance Management</p>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="breadcrumbs"><a href="#">Home </a>
                      <span><i className="fi fi-rr-angle-small-right" /></span>
                      <a href="#">Categories</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-12 col-xl-12">
              <div className="settings-menu">
                <a href="/account">Account</a>
                <a href="/subcategories">subcategories</a>
    
              </div>
              <div className="row">
                <div className="col-xxl-4 col-xl-4 col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">change category called {singleData.name}</h4>
                    </div>
                    <div className="card-body">
                      <div className="create-new-category">
                        <form className="row" onSubmit={handleSubmit(onSubmit)}>
                          <div className="mb-3 col-12">
                            <label className="form-label">New name </label>
                            <input type="text" className="form-control" placeholder="category name"
                          {...register("name", { required: "required" })}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                          </div>

    
                          <div className="col-12">
                            <button className="btn btn-success w-100"> apply change</button>
                          </div>
                        </form>
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

export default UpdateCategories
