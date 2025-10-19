import { createContext, useState, useEffect } from "react";

const MemosContext = createContext();

export const MemosProvider = ({ children }) => {
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchMemos = async () => {
    try {
      if (!token) return console.warn("No token, skip fetching");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/memos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Fetch failed " + res.status);
      const data = await res.json();
      setMemos(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      console.log("Deleting:", `${import.meta.env.VITE_API_URL}/memos/${id}`);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/memos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Delete failed");
      const data = await res.json();
      console.log("✅ Deleted:", data);
      alert("Memo deleted successfully");
      fetchMemos();
    } catch (err) {
      console.error("❌ Error creating memo:", err);
      alert("Failed to delete memo.");
    }
  };
  useEffect(() => {
    fetchMemos();
  }, []);

  return (
    <MemosContext.Provider
      value={{ memos, loading, fetchMemos, setLoading, handleDelete }}
    >
      {children}
    </MemosContext.Provider>
  );
};

export default MemosContext;
