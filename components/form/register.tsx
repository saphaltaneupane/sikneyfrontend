"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

// 1. Define the Validation Schema using Yup
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9\s\-\+\(\)]+$/, "Invalid phone format")
    .nullable(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignupPage() {
  const router = useRouter();

  // 2. Initialize Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        console.log("Signup Data:", values);

        // Simulate API Call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        router.push("/dashboard");
      } catch (error) {
        setStatus("Signup failed. Please try again."); // For general form errors
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-orange-50 to-green-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500">Start building your CookBook today</p>
        </div>

        {/* Global Error Message */}
        {formik.status && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {formik.status}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5" noValidate>
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              {...formik.getFieldProps("username")}
              className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-colors ${
                formik.touched.username && formik.errors.username
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-orange-400"
              }`}
              placeholder="Enter your username"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.username}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              {...formik.getFieldProps("email")}
              className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-colors ${
                formik.touched.email && formik.errors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-orange-400"
              }`}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone (Optional)
            </label>
            <input
              type="tel"
              {...formik.getFieldProps("phone")}
              className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-colors ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-orange-400"
              }`}
              placeholder="Enter your phone number"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              {...formik.getFieldProps("password")}
              className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-colors ${
                formik.touched.password && formik.errors.password
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-orange-400"
              }`}
              placeholder="Min 6 characters"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? "Creating Account..." : "Sign up"}
          </button>

          {/* Login link */}
          <div className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-orange-600 hover:text-orange-700 font-semibold"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
