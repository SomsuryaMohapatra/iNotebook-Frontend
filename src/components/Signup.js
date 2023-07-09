import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  const navigate=useNavigate();
  const [signupCredentials, setSignupCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setSignupCredentials({
      ...signupCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signupCredentials.name,
        email: signupCredentials.email,
        password: signupCredentials.password,
      }),
    });
    const json= await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      navigate('/');
      props.showAlert("Account Created Successfully","success");
    }else{
      props.showAlert("Invalid Details","danger");
    }
  };
  return (
    <div className="container">
      <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit} className="my-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            minLength={3}
            onChange={onChange}
            value={signupCredentials.name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value={signupCredentials.email}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            minLength={5}
            onChange={onChange}
            value={signupCredentials.password}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
}
