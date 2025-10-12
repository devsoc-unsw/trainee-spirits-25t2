import { FaMapPin, FaUser, FaLock, FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import OAuth from "../components/OAuth";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <FaMapPin className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-gray-800">GeoMemo</h1>
          </div>
          <h2 className="text-xl text-gray-600">Welcome to GeoMemo</h2>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            <OAuth />
          </div>
        </div>
      </div>
    </div>
  );
}
