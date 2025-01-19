import Header from "./Header"
import { useForm} from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState,useEffect} from 'react';
import DeleteDataAlert from "./materialUIComponents/DeleteDataAlert";
import UpdateCategories from "./updateDataPages/UpdateCategories";



function Categories() {
    const token = localStorage.getItem('accessToken');
    const BASE_URL = import.meta.env.VITE_API_URL;
    const { register, handleSubmit } = useForm();
    const [formData, setFormData] = useState({
      name: ""
   });

   //post categories data
   const onSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/InsertCategoriesData`, formData,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.status === 500) {
        toast.error("Il y a une erreur");
      } else {
       
        toast.success("Category created successfully");
        GetCategoriesDatas()
        setFormData({
            name:""
        }
        )
      }
      
    } catch (err) {
      console.log(err);
      toast.error("Erreur technique, essayez plus tard");
    }
    
  };


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



//Delete categories data
const HandleDelete = (model) => {
    console.log(model)
  axios.delete(`${BASE_URL}/DeleteCategoriesData/${model.id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  )
    .then(({ data }) => {
        SetCategoriesDatas(data.data || []); 
      GetCategoriesDatas();
    })
    .catch((err) => {
      console.log(err);
      toast.error("Il y a une erreur");
    });
};




//update category using props 
const [singleData,setSingleData] = useState([])
const [FormVisible,setFormVisible] =useState(false)
const handleUpdate = () => {
  setFormVisible(false);
  GetCategoriesDatas();
};

const HandleEdit=(model)=>{
    setSingleData(model)
    setFormVisible(true)
  }
  
if(FormVisible == false){
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
            <a href="/wallet">Account</a>
            <a href="/subcategories">subcategories</a>
            <a href="/budget">Manage my budget</a>
          </div>
          <div className="row">
            <div className="col-xxl-4 col-xl-4 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Create a new categories</h4>
                </div>
                <div className="card-body">
                  <div className="create-new-category">
                    <form className="row" onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3 col-12">
                        <label className="form-label">Name </label>
                        <input type="text" className="form-control" placeholder="category name"
                      {...register("name", { required: "required" })}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      </div>



                      <div className="col-12">
                        <button className="btn btn-success w-100">Create new category</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Categories</h4>
                </div>
                <div className="card-body">
                  <div className="category-type">
                    <ul>

                     {
                        CategoriesDatas.map((data,index)=>(
                            <li key={index}>
                            <div className="left-category">
                            <span className="drag-icon"><i className="fi fi-ss-grip-lines" /></span>
                              <span className="category-icon"><i className="bg-green-500 fi fi-rr-add-document" /> {data.name}</span>
                            </div>
                            <div className="right-category">
                              <span onClick={() => HandleEdit(data)}><i className="fi fi-rs-pencil" /></span>
                              <DeleteDataAlert HandleDelete={() => HandleDelete(data)}/>
                            </div>
                          </li>
                        ))
                     }


                    </ul>
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

  )}
  else{
    return <UpdateCategories singleData={singleData}  onUpdate={handleUpdate}/>
  }
}

export default Categories
