import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      console.log("✅ Logged out successfully");
      navigate("/login"); 
    } catch (error) {
      console.error("❌ Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-red-300 rounded-lg shadow-sm text-red-600 bg-white hover:bg-red-50 active:bg-red-100 transition"
    >
      <img
        src="https://www.svgrepo.com/show/533641/logout.svg"
        alt="Logout icon"
        className="w-5 h-5"
      />
      <span className="font-medium">Log out</span>
    </button>
  );
};

export default Logout;
