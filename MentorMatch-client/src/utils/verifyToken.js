import jwtDecode from "jwt-decode";

export const verifyToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};
