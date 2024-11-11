"use client";
import React, { useState } from "react";
import axios from "axios";

const LogIn = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userExists, setUserExists] = useState<
    "checking" | "found" | "notFound" | "incorrectPassword" | null
  >(null);

  // עדכון כללי של שדה
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // בדיקת מייל וסיסמא
  const handleEmailCheck = async () => {
    setLoading(true);
    setError(null);
    setUserExists("checking");

    try {
      const { data } = await axios.get(
        `/api/users?email=${formData.email}&password=${formData.password}`
      );

      if (data.exists) {
        setUserExists("found");
      } else if (data.error === "Incorrect password") {
        setUserExists("incorrectPassword");
        setError("Incorrect password");
        setFormData({ ...formData, password: "" }); // לנקות רק את הסיסמה
      } else {
        setUserExists("notFound");
        setError("Email not found, please register.");
      }
    } catch (err) {
      console.error(err);
      setError("Error checking email and password");
    } finally {
      setLoading(false);
    }
  };

  // שליחת טופס
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // נקה שגיאות ישנות

    try {
      // שלח את הנתונים כ-אובייקט כולו
      const response = await axios.post("/api/users", formData);
      console.log(response);

      // אם הכל עבר בהצלחה
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        password: "",
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while submitting the form.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {success && (
          <p className="text-green-500 text-center mb-4">
            User added successfully!
          </p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {(userExists === null || userExists === "incorrectPassword") && (
            <button
              type="button"
              onClick={handleEmailCheck}
              disabled={loading}
              className="w-full py-3 mt-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? "Checking..." : "Check Email"}
            </button>
          )}

          {userExists === "notFound" && (
            <>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 font-medium mb-2"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </>
          )}

          {userExists === "found" && (
            <p className="text-green-500 text-center mt-4">
              User found successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LogIn;
