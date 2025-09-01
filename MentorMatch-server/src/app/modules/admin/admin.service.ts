// admin.service.ts
import { AdminModel } from "./admin.model";
import bcrypt from "bcrypt";
import config from "../../config";
import { TAdminRole } from "./admin.constant";
import { createToken } from "../auth/auth.utils";
import { JwtPayload } from "../auth/auth.interface";


//* Admin creation function

export const createAdmin = async (data: {
  name: string;
  email: string;
  password: string;
  role: TAdminRole;
}) => {
  const { name, email, password, role } = data;

  const existingAdmin = await AdminModel.findOne({ email });
  if (existingAdmin) throw new Error("Admin with this email already exists");

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  const newAdmin = await AdminModel.create({
    name,
    email,
    password: hashedPassword,
    role,
    isLocked: false,
  });

  return newAdmin;
};

//* Admin login function

export const loginAdmin = async (email: string, password: string) => {
  const admin = await AdminModel.findOne({ email });
  if (!admin) throw new Error("Invalid credentials");
  if (admin.isLocked) throw new Error("Admin account is locked");

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const jwtPayload: JwtPayload = {
    userId: admin._id, 
    activeRole: admin.role, // "superAdmin" or "admin"
    role: [admin.role], // wrap in array
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return { admin, accessToken, refreshToken };
};