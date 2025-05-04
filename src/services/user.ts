import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export type RegisterReq = {
  username: string;
  email: string;
  password: string;
};

export const register = async (req: RegisterReq) => {
  console.log("Password before hashing:", req);

  const salt = await bcrypt.genSalt(10);
  console.log("Salt:", salt);

  const hashedPassword = await bcrypt.hash(req.password, salt);
  console.log("Hashed password:", hashedPassword);

  const existingUser = await User.findOne({ email: req.email });
  if (existingUser) {
    throw new Error("Email já está em uso");
  }

  const user = new User({
    username: req.username,
    email: req.email,
    password: hashedPassword,
  });
  await user.save();
};

export type LoginReq = {
  email: string;
  password: string;
};

export const login = async (req: LoginReq) => {
  const user = await User.findOne({ email: req.email }).select("+password");
  console.log("User found:", user);
  if (user && (await bcrypt.compare(req.password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env["SECRET_KEY"]!, {
      expiresIn: "1h",
    });
    return { token };
  }
  return undefined;
};

export const me = async (userId: number) => {
  const user = await User.findById(userId);

  return user;
};
