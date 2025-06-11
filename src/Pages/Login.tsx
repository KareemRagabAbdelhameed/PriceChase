import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import mymage from "../assets/images/whiteLogin.png"
import {faEnvelope} from "@fortawesome/free-solid-svg-icons"
import {faLock,faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from "../validation"
import { Link, useNavigate } from "react-router-dom"
import apiBaseUrl from "../config/axiosConfig"
import Cookies from "js-cookie";
import Swal from "sweetalert2"
import axios from "axios"
import { UserContext } from "../context/context"
const Login = () => {
  const userNow = useContext(UserContext);
  console.log(userNow);
  const navigate = useNavigate();

  const [isLoading,setIsLoading] = useState(false);
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });
  const onSubmit = async(data: any) => {
    console.log(data);
    //  1:Pending
  setIsLoading(true);
  try {
    const response = await apiBaseUrl.post("/user/login",data,{withCredentials : true});
    console.log(response);
    const role = response.data.data.user.role;
        const userDetails = response.data.data.user;
        const adminDetails = response.data.data.user;
        const getProfilePicture = response.data.data.user.profilePicture;

        if(role === "user"){
          userNow?.setAuth(userDetails);
          userNow?.setProfilePicture(getProfilePicture);
        }
        else if(role === "admin"){
          userNow?.setAdminAuth(adminDetails);
          userNow?.setProfilePicture(getProfilePicture);
        }

    Cookies.set("userEmail",data.email,{expires : 7});

    
    if(response.status===200){
      // Redirect to the home page
      Swal.fire({
      title: response.data.message,
      icon: "success",
      draggable: true,
      }).then((result)=>{
      if(result.isConfirmed){
        if(role === "user"){
          navigate("/");
          }
          else if(role === "admin"){
            navigate("/admin");
          }
      }
      });
    }
  } catch (error:unknown) {
    // 3-rejected
if(axios.isAxiosError(error)){
  console.log(error.response);
  Swal.fire({
  icon: "error",
  title: "Failed to Create Account",
  text: error.response?.data.error,
  confirmButtonColor: "#6D95EA",
  });
}
} finally{
      setIsLoading(false);
  }

}
  
  // to make the passord visible or not visible
  const [isVisible, setIsVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="shadow-md dark:bg-gray-700 dark:text-white lg:h-screen w-full max-w-screen-2xl   gap-3 bg-customBlue lg:flex md:flex">
      <div className="md:w-[40%]">
      <h1 className="lg:pt-8 pt-5 text-white text-[40px] font-semibold h-12 text-center">Welcome Back To</h1>
      <Link to={"/"}>
      <img src={mymage} alt="" className="mt-4 w-[70%] lg:w-[100%] mx-auto " />
      </Link>
      </div>
      <div className="shadow-md  dark:bg-gray-900 dark:text-white w-full max-w-[960px]  bg-white rounded-tl-[40px] rounded-tr-[40px] ml-auto lg:rounded-tl-[40px] lg:rounded-bl-[40px] lg:rounded-tr-none md:rounded-tr-none ">
        <h1 className="pt-10 font-bold lg:text-[40px] text-[30px] text-center mb-4">Sign In</h1>
        <form action="" className="w-4/5 mx-auto space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            
            
            <div className="flex flex-col   space-y-1 relative">
                <label htmlFor="email" className="font-medium">Email :</label>
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-10 w-5 h-5 dark:text-gray-900" />
                <input type="email" {...register("email")} className="h-12 border-[1px] border-gray-600 rounded-md pl-12 focus:outline-none focus:border-[2px] focus:border-customBlue "/>
                <p className="block text-red-700 font-semibold text-sm">{errors.email?.message}</p>
            </div>
            
            <div className="flex flex-1 flex-col  space-y-1 relative">
            <label htmlFor="first-name" className="font-medium">Password :</label>
            <FontAwesomeIcon icon={faLock} className="absolute left-4 top-9 w-5 h-5 dark:text-gray-900" />
            <FontAwesomeIcon icon={isVisible?faEyeSlash :faEye} onClick={togglePasswordVisibility} className="absolute right-4 top-9 w-5 h-5 dark:text-gray-900" />
            <input type={isVisible? "text" : "password"} id="first-name" {...register("password")} className="h-12 pl-12 border-[1px] border-gray-600 rounded-md  focus:outline-none focus:border-[2px] focus:border-customBlue" />
            <p className="block text-red-700 font-semibold text-sm">{errors.password?.message}</p>
            {/* <Link to={"/forgot-password"}>
            <span className="cursor-pointer text-customBlue">Forget Password?</span>
            </Link> */}
            </div>
            
            
           
            <div>
            <button
                className={`bg-customBlue w-full rounded-md text-white font-medium mt-5 p-3 flex items-center justify-center 
                ${isLoading ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                        Loading...
                    </>
                ) : (
                    "Login"
                )}
            </button>            <h3 className="mt-2">Don't have an an account? <Link className="text-customBlue font-medium cursor-pointer" to={"/register"}>Sign up</Link></h3>
        </div>
        </form>
        
      </div>
    </div>
  )
}

export default Login