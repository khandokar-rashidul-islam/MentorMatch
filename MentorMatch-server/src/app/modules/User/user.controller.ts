import { Request, Response } from "express";
import * as userService from "./user.service";
import { userRegistrationSchema } from "./user.validation";
import { RegisterData } from "./user.interface";

export const registerUser = async (req: Request, res: Response) => {

  // console.log("coming from iside",req.body)
  try {
    const parsed = userRegistrationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }

    const registrationData = parsed.data as RegisterData;
    const user = await userService.registerUser(registrationData);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
