import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import axios from "../api/axios";

const useGetUser = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getUser = async () => {
    try {
      const response = await axios.get("/auth/user", { withCredentials: true });

      setAuth(response.data.user);
      localStorage.setItem("loggedIn", "true");

      return response.data.user;
    } catch (error) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return getUser;
};

export default useGetUser;
