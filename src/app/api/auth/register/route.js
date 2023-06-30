import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  await connect();

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashPassword = await bcrypt.hash(password, 5);

      const newUser = new User({
        name,
        email,
        password: hashPassword,
      });

      await newUser.save();
      return new NextResponse("User has been created", {
        status: 201,
      });
    } else {
      return new NextResponse("User already existed", {
        status: 500,
      });
    }
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
