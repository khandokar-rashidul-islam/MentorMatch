import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { authApi } from "../redux/features/auth/authApi";
import { logout, setUser } from "../redux/features/auth/authSlice";


export const useBootstrapAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const { data, isLoading, isError } = authApi.useGetMeQuery(null, {
    skip: !!user, // skip query if user already in Redux
  });

//   console.log("useBootstrapAuth hook running");
//   console.log("user from Redux:", user);
//   console.log("isLoading:", isLoading);
//   console.log("isError:", isError);

  useEffect(() => {
    if (data?.data?.user) {
      dispatch(
        setUser({
          user: data.data.user,
        })
      );
    } else if (isError) {
      dispatch(logout());
    }
  }, [data, isError, dispatch]);

  return { user, isLoading };
};
