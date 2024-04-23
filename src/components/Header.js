import { signOut } from "firebase/auth";
import { NETFLIX_LOGO } from "../utils/constants";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const user = useSelector(store => store.user);
    // console.group(user.photoURL)
    const navigate = useNavigate();
    const handleSignOut = () =>{
        signOut(auth).then(() => {
            navigate("/");
          }).catch((error) => {
            navigate("/error")
          });
          
    }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center">
      <img className="w-44 mx-auto md:mx-0" src={NETFLIX_LOGO} alt="logo" />
      <div className="flex gap-2">
        {user && <img className="h-10 w-12 rounded-[50%]" src= {user?.photoURL} alt="user-icon"/>}
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold h-10 px-2 rounded"
        onClick={() => {
         handleSignOut();
        }}
      >
        Sign Out
      </button>
      </div>
    </div>
  );
};

export default Header;
