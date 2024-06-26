import React, { useContext } from "react";
import { LoginContext } from "./LoginContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import {
 createUserWithEmailAndPassword
}from "firebase/auth"

 
export default function SignUpPage() {
  
  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(LoginContext);


  const handleLogin = (event) => {
    event.preventDefault();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
      
  };

  function handleNavigate() {
    navigate("/dashboard");
  }

  function handleEmailChange(event){
    setEmail(event.target.value)
  }

  function handlePasswordChange(event){
    setPassword(event.target.value)
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-6xl py-2 text-center font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
        CollabSphere
      </h1>
      <p className="text-center text-gray-700 text-xl mb-8">
        Navigate the workflow seas with ease!
      </p>
      <form onSubmit={handleLogin} className="signin">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mb-[8rem]">
          <div class="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p class="text-xl text-align-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </p>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  Enter your email
                </label>
                <input
                  placeholder="Username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="username"
                  type="email"
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900">
                  Set password
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="password"
                  type="password"
                  onChange={handlePasswordChange}
                />
              </div>
              <button
                class="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
                type="submit"
                onClick={handleNavigate}
              >
                Create account
              </button>

              <p>
                Already have an account? <Link to="/">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
