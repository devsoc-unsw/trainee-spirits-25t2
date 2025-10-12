import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const linkTo = () => {
    if (user) {
      navigate("/app");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-amber-300 h-screen w-full flex items-center justify-center">
      <button onClick={linkTo}>Welcome</button>
    </div>
  );
}

export default Home;
