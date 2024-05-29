import "./Signup.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState("");
  const [state, setState] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  async function onSignUpFormSubmit(userObj) {
    try {
      let res;
      if (userObj.userType === 'user') {
        res = await axios.post("http://localhost:4000/user-api/user", userObj);
      } else if (userObj.userType === 'author') {
        res = await axios.post('http://localhost:4000/author-api/user', userObj);
      }
      if (res.status === 201) {
        setState(true);
        setSignupSuccess(true);
        setErr("");
        navigate('/signin');
      } else {
        setErr(res.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setErr(error.response?.data?.message || "An unexpected error occurred.");
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow-lg" style={{borderRadius:20}}>
            <div className="card-title text-center border-bottom">
              {signupSuccess ? (
                <div>
                  <p className="lead fs-3 text-center display-4 text-success">
                    User registration success
                  </p>
                  <p className="text-center fs-6 text-secondary">
                    Proceed to <Link to="/signin">Login</Link>
                  </p>
                  <p className="text-center fs-6 text-secondary">
                    Back to <Link to="/">Home</Link>
                  </p>
                </div>
              ) : (
                <h2 className="p-3" style={{color:'var(--crimson)'}}>Signup</h2>
              )}
            </div>
            <div className="card-body">
              {err && (
                <p className="lead text-center text-danger">{err}</p>
              )}

              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                {/* radio */}
                <div className="mb-4">
                  <label
                    htmlFor="user"
                    className="form-check-label me-3"
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--light-dark-grey)",
                    }}
                  >
                    Register as
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="author"
                      value="author"
                      {...register("userType", { disabled: state })}
                    />
                    <label
                      htmlFor="author"
                      className="form-check-label"
                    >
                      Author
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value="user"
                      {...register("userType", { disabled: state })}
                    />
                    <label
                      htmlFor="user"
                      className="form-check-label"                      
                    >
                      User
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    {...register("username", { disabled: state,required:true })}
                  />

                  {errors.username?.type === "required" && (<p className="text-danger">User Name is required</p>)}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    {...register("password", { disabled: state,required:true })}                    
                  />
                {errors.password?.type === "required" && (<p className="text-danger">Password is required</p>)}
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    {...register("email", { disabled: state,required:true })}
                  />

                {errors.email?.type === "required" && (<p className="text-danger">Email is required</p>)}
                </div>

                <div className="text-end">
                  <button type="submit" className="text-light d-block mx-auto rounded" disabled={state} style={{backgroundColor:"#105769",color:"#ffffff"}}>
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
