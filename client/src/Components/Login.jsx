import { useEffect } from "react";
import { useAuth } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const twitterLogin = () => {
    window.location.href = "http://localhost:4000/auth/twitter";
  };

  useEffect(() => {
    const loggedInFlag = localStorage.getItem("loggedIn");

    if (loggedInFlag) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black text-white min-h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="https://admin.itsnicethat.com/images/MEPeS1j8IRTti1OF_E9ajuZSAJw=/243516/width-1440/twitter-x-logo-graphic-design-itsnicethat-01.jpeg"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in with your twitter account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-full border border-gray-600 px-3 py-1.5  font-semibold leading-6 text-blue-400"
              onClick={twitterLogin}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
