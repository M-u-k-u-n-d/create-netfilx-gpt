import Header from "./Header";
import { BG_IMG } from "../utils/constants";
import { useRef, useState } from "react";
import { checkValidData, isNameValid } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const name = useRef(null),
    email = useRef(null),
    password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data
    let message = "";
    if (isSignIn) {
      message = checkValidData(email.current.value, password.current.value);
    } else
      message = isNameValid(
        name.current.value,
        email.current.value,
        password.current.value
      );
    setError(message);
    if (message) return;

    // Sign/Sign Up Logic

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          updateProfile(user, {
            displayName: name.current.value,
             photoURL: "https://avatars.githubusercontent.com/u/111234972?v=4",
          }).then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid:uid, email:email, name: displayName, photoURL: photoURL}));
          navigate("/browse");
          }).catch((error) => {
              setError(error.message)
          });
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + " " + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <div className=" bg-black">
      <Header />
      <img
        className="absolute filter brightness-50 min-h-screen min-w-full object-cover h-[200vh]"
        src={BG_IMG}
        alt="background-img"
      />
      <div
        className="absolute m-[30vh] ml-[35vw]
      bg-black w-[30vw] opacity-80 text-white rounded-lg shadow-lg  p-20 pt-10"
      >
        <h1 className="text-3xl font-bold text-white mb-10">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4 items-center"
        >
          {!isSignIn && (
            <input
              ref={name}
              type="text"
              placeholder="Enter Your Name"
              className="pl-6 h-14 bg-black border rounded-md w-full"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email or Phone Number"
            className="pl-6 h-14 bg-black border rounded-md w-full"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="pl-6 h-14 bg-black border rounded-md w-full"
          />
          <p className="text-red-500">{error}</p>

          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 w-full"
            onClick={() => {
              handleButtonClick();
            }}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <h3 className="text-sm mt-4 mb-2">OR</h3>
          <h3 className="text-sm mb-4">Forgot password?</h3>
        </form>

        <p className="text-sm text-white mt-16">
          {isSignIn ? "New to Netflix" : "Already Registered?"}
          <span
            className="cursor-pointer text-sky-300 font-semibold text-md"
            onClick={() => {
              setIsSignIn(!isSignIn);
              setError("");
            }}
          >
            {" "}
            {isSignIn ? "Sign Up Now" : "Sign In Now"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
