import bcrypt from "bcrypt";
import config from "../config";
import { AdminModel } from "../modules/admin/admin.model";
import { ADMIN_ROLE } from "../modules/admin/admin.constant";

export const seedSuperAdmin = async () => {
  const isSuperAdminExist = await AdminModel.findOne({
    role: ADMIN_ROLE.SUPER_ADMIN,
  });

  if (!isSuperAdminExist) {
    const hashedPassword = await bcrypt.hash(
      config.super_admin_password as string,
      Number(config.bcrypt_salt_rounds)
    );

    const superUser = {
      name: "Super Admin",
      email: config.super_admin_email,
      password: hashedPassword,
      role: ADMIN_ROLE.SUPER_ADMIN,
      isLocked: false,
    };

    await AdminModel.create(superUser);
    console.log(" Super Admin created successfully");
  } 
};
