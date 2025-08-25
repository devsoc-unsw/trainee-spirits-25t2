import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/memos")
      .then((res) => res.json())
      .then((data) => setMemos(Array.isArray(data) ? data : []))
      .catch((err) => setError(err?.message || "Failed to load memos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading memos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Memos</h2>
      {memos.length === 0 ? (
        <p>No memos found.</p>
      ) : (
        <ul>
          {memos.map((m, idx) => (
            <li key={m._id || m.id || idx}>
              {(m.title || "(no title)") + " — "}
              {(m.city || "?") + ", " + (m.country || "?")}
            </li>
          ))}
        </ul>
      )}
      <pre style={{ marginTop: 12 }}>{JSON.stringify(memos, null, 2)}</pre>
    </div>
  );
}

function About() {
  return <p>About</p>;
}
function Login() {
  return <p>Login</p>;
}

function NotFound() {
  return <p>Not Found</p>;
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
