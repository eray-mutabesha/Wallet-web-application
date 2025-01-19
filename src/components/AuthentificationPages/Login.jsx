import { useForm} from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";







function Login() {

  const BASE_URL = import.meta.env.VITE_API_URL;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  // Protection des routes et des pages
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/dashboard");
      window.location.reload();
    }
  }, [navigate]);

  // Fonction d'envoi du formulaire
  const onSubmit = (data) => {
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
          toast.success("Connection successful");
        } else {
          toast.error("Email ou mot de passe incorrect");
        }
      })
      .catch((err) => {
        if (err.response) {
          // Erreur du serveur
          console.error("Erreur du serveur:", err.response.data);
          toast.error(`Erreur : ${err.response.data.message || 'Erreur inconnue'}`);
        } else if (err.request) {
          // Aucune réponse du serveur
          console.error("Aucune réponse du serveur:", err.request);
          toast.error("Problème de connexion au serveur.");
        } else {
          // Erreur lors de la configuration de la requête
          console.error("Erreur:", err.message);
          toast.error("Une erreur inconnue est survenue.");
        }
      });
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
              <h4>Sign In</h4>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">

                  <div className="col-12 mb-3">
                    <label className="form-label">Email</label>
                    <input
                          type="text"
                          className="form-control"
                          placeholder="email"
                          {...register("email", { required: "Ce champ est obligatoire" })}
                        />
                        {errors.email && <span style={{ color: "red" }}>This field is required</span>}
                  </div>



                  <div className="col-12 mb-3">
                    <label className="form-label">Password</label>
                        <input
                            type="password"
                            id="dz-password"
                            className="form-control"
                            defaultValue=""
                            {...register("password", { required: "Ce champ est obligatoire" })}
                          />
                          {errors.password && <span style={{ color: "red" }}> This field is required</span>}
                  </div>


                </div>
                <div className="mt-3 d-grid gap-2"><button type="submit" className="btn btn-primary me-8 text-white">Sign In</button></div>
              </form>
              <p className="mt-3 mb-0 undefined">Don't have an account?<a className="text-primary" href="/signup"> Sign up</a></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Login
