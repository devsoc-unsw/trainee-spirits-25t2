import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const linkTo = () => {
    if (user) navigate("/app");
    else navigate("/login");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')", // 🌊 你可以换成任何背景
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />

      {/* Navbar */}
      <Navbar variant="light" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 drop-shadow-lg">
          Welcome to <span className="text-amber-400">GeoMemo</span>
        </h1>
        <p className="max-w-xl text-lg sm:text-xl text-gray-100 mb-10 leading-relaxed">
          Capture your thoughts, memories, and ideas — wherever you go.
        </p>

        <button
          onClick={linkTo}
          className="
            px-10 py-4 text-lg font-semibold tracking-wide rounded-full
            bg-gradient-to-r from-amber-400 to-amber-600
            hover:from-amber-500 hover:to-amber-700
            shadow-lg hover:shadow-amber-500/40
            transform hover:scale-105 active:scale-95
            transition-all duration-300 ease-out
          "
        >
          Start Exploring
        </button>
      </div>

      {/* Decorative gradient bottom */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-amber-600/40 to-transparent" />
    </div>
  );
}

export default Home;
