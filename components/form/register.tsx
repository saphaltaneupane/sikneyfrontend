"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";

import axiosInstance from "@/lib/axiosinstance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

interface RegisterFormData {
  username: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Ensure phone is provided
    if (!formData.mobileNumber) {
      toast.error("Phone number is required");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/register", {
        username: formData.username,
        email: formData.email,
        mobileNumber: formData.mobileNumber, // matches your schema
        password: formData.password,
      });

      toast.success(res.data.message || "Registered successfully!");

      setFormData({
        username: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
      });

      router.push("/login");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Registration failed!");
      } else {
        toast.error("Registration failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border border-gray-200 overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-purple-500 py-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Join our <span className="text-yellow-400">CookBook</span> community
          </h1>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                className="border-gray-300 focus:border-orange-400 focus:ring focus:ring-orange-200"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-gray-300 focus:border-orange-400 focus:ring focus:ring-orange-200"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <Label htmlFor="mobileNumber">Phone</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                type="text"
                placeholder="Enter your phone number"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className="border-gray-300 focus:border-orange-400 focus:ring focus:ring-orange-200"
              />
            </div>

            {/* Password */}
            <div className="space-y-1 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border-gray-300 focus:border-orange-400 focus:ring focus:ring-orange-200 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1 relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border-gray-300 focus:border-orange-400 focus:ring focus:ring-orange-200 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-yellow-400 hover:to-orange-500 text-white font-semibold focus:border-orange-400"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            {/* Links */}
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
