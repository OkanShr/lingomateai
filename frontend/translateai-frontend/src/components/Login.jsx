import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../store/authentication";
import "./login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const loginFunction = async (e) => {
    e.preventDefault();
    console.log(loginDetails);

    try {
      const response = await loginUser(loginDetails);
      console.log(`this is the response: ${response}`);
      if (typeof response === "string") {
        // If response is a string, it means there was an error returned from loginUser
        setError(response);
      } else {
        // Successful login
        console.log(response);
        setError("");

        // Response contains 'access_token' and 'token_type'
        const { access_token, user } = response;

        // Store the token in localStorage
        dispatch(
          login({
            token: access_token,
            user: {
              userId: user.id,
              username: user.username,
            },
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="bg-custom-beige-light h-screen flex items-center justify-center">
      <div className="rounded-lg overflow-hidden shadow-lg bg-white max-w-md w-full mb-14">
        <div className="relative h-44 bg-cover bg-center bg-image">
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h1 className="text-4xl font-bold text-white">Sign In</h1>
          </div>
        </div>
        <div className="p-8">
          <Form className="flex flex-col" onSubmit={loginFunction}>
            <Form.Group className="mb-4" controlId="formBasicUsername">
              <Form.Label className="font-medium text-gray-700">
                Username
              </Form.Label>
              <Form.Control
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, username: e.target.value })
                }
                type="text"
                className="rounded-lg bg-gray-200 mt-1 p-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="username"
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label className="font-medium text-gray-700">
                Password
              </Form.Label>
              <Form.Control
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, password: e.target.value })
                }
                type="password"
                className="rounded-lg bg-gray-200 mt-1 p-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="password"
                required
              />
            </Form.Group>
            {error ? (
              <p className="text-center text-red-500 rounded-xl mb-1 p-2">
                {error}
              </p>
            ) : (
              ""
            )}

            <button className="w-full mt-4 py-2 bg-custom-green shadow-lg text-white font-semibold rounded-lg hover:bg-custom-green-light">
              Log in
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
