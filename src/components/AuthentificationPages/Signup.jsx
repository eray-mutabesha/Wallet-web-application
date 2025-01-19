import { useForm} from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";











function Signup() {

  const navigate = useNavigate()
  // routes protection
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/dashboard");
      window.location.reload();
    }
  }, [navigate]);


     //the .env with path to the express server  start 
      const BASE_URL = import.meta.env.VITE_API_URL;
      //the .env with path to the express server  end

     
      const { register, handleSubmit } = useForm();
      const [formData, setFormData] = useState({
       name: "",
       email: "",
       password:"",
       password_confirm:"",

     });
     


     const onSubmit = async (data) => {
      if (data.password !== data.password_confirm) {
        toast.error("Passwords do not match");
        return;
      }
     
      try {
        const res = await axios.post(`${BASE_URL}/CheckingAcount`, {
          email: data.email,
          password: data.password,
        });
    
        if (res.data.exists) {
          toast.error("An account already exists with this Email");
          return;
        }

        const response = await axios.post(`${BASE_URL}/InsertUserData`,{
          name:data.name,
          email:data.email,
          password:data.password
        });
    
        if (response.data.status === 500) {
          toast.error("Il y a une erreur");
        } else {
          axios.post(`${BASE_URL}/CheckingAcount`, {
            email: data.email,
            password: data.password
          })
          .then((res) => {
            if (res.data.exists) {
              // Store the token in localStorage
              localStorage.setItem("accessToken", res.data.token);
    
              navigate("/dashboard");
              window.location.reload();
              toast.success("Successful registration");
            } else {
              toast.error("Email ou mot de passe incorrect");
            }
          })

          setFormData(
            {
              name: "",
              email: "",
              password:""
            }
          )
        }
      } catch (err) {
        console.log(err);
        toast.error("Erreur technique, essayez plus tard");
      }
    };












  return (
<div className="authincation">
  <div className="container">
    <div className="row justify-content-center align-items-center g-0">
      <div className="col-xl-8">
        <div className="row g-0">
          <div className="col-lg-6">
            <div className="welcome-content">
              <div className="welcome-title">
                <div className="mini-logo">
                  <a href="index.html">
                    <img src="images/logo-white.png" alt width={30} /></a>
                </div>
                <h3>Welcome to your wallet application</h3>
              </div>
              <div className="privacy-social">
                <div className="privacy-link">
                    <p>welcome to the world where simple waste of money is identified and avoided </p>
                </div>
                <div className="intro-social">
                  <ul>
                    <li><a href="#"><i className="fi fi-brands-facebook" /></a></li>
                    <li><a href="#"><i className="fi fi-brands-twitter-alt" /></a></li>
                    <li><a href="#"><i className="fi fi-brands-linkedin" /></a></li>
                    <li><a href="#"><i className="fi fi-brands-pinterest" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="auth-form">
              <h4>Sign Up</h4>
              <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="row">


                  <div className="col-12 mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" placeholder="your full name" 
                      {...register("name", { required: "ce champs est obligatoire" })}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                  </div>


                  <div className="col-12 mb-3"><label className="form-label">Email</label>
                  <input type="text" className="form-control" placeholder="your email adress" 
                      {...register("email", { required: "ce champs est obligatoire" })}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                  </div>



                  <div className="col-12 mb-3"><label className="form-label">Password</label>
                          <input type="password" id="dz-password" className="form-control" defaultValue="Password" 
                        {...register("password", { required: "ce champs est obligatoire" })}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
                  </div>


                  <div className="col-12 mb-3"><label className="form-label">Confirm your password</label>
                          <input type="password" id="dz-password" className="form-control" defaultValue="Password" 
                        {...register("password_confirm", { required: "ce champs est obligatoire" })}
                        value={formData.password_confirm}
                        onChange={(e) => setFormData({ ...formData, password_confirm: e.target.value })}/>
                  </div>

                </div>
                <div className="mt-3 d-grid gap-2"><button type="submit" className="btn btn-primary me-8 text-white">Sign Up</button></div>
              </form>


              <p className="mt-3 mb-0 undefined">Already have an account?<a className="text-primary" href="/"> Sign In</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Signup
