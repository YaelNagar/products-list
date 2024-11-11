import connect from "@/app/lib/db/mongoDB";
import User from "@/app/lib/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  const password = url.searchParams.get("password");

  // בדיקת אם יש ערכים עבור המייל והסיסמה
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    await connect(); // התחברות למסד הנתונים
    const user = await User.findOne({ email });

    // אם לא נמצא משתמש עם המייל הזה
    if (!user) {
      return NextResponse.json({ exists: false }, { status: 200 });
    }

    // השוואה ישירה של הסיסמה שהמשתמש הזין עם הסיסמה שמאוחסנת
    if (password === user.password) {
      return NextResponse.json({ exists: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { exists: false, error: "Incorrect password" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check email and password" },
      { status: 500 }
    );
  }
}




export async function POST(request: NextRequest) {
  try {
    await connect();
    const { firstName, lastName, email, address, password } = await request.json();

    // בדוק אם יש כבר משתמש עם אותו מייל
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists, please use a different email." },
        { status: 400 }
      );
    }

    const newUser = new User({ firstName, lastName, email, address, password });
    await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      user: { firstName, lastName, email, address, password },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 }
    );
  }
}