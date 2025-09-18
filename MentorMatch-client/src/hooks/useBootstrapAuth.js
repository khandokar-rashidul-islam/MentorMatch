import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { authApi } from "../redux/features/auth/authApi";
import { logout, setUser } from "../redux/features/auth/authSlice";

export const useBootstrapAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const { data, isLoading, isError } = authApi.useGetMeQuery(null, {
    skip: false, // always run query to get fresh user info
    refetchOnMountOrArgChange: true, // ensures fresh fetch on remount
  });

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
