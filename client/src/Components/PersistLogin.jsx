import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthProvider";
import useGetUser from "../hooks/useGetUser";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const getUser = useGetUser();

  useEffect(() => {
    let isMounted = true;

    const verify = async () => {
      try {
        await getUser();
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.username ? verify() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="bg-black min-h-screen flex justify-center items-center">
          ...Loading
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
