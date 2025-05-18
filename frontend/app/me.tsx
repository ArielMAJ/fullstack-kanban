import React, { useState } from "react";

export default function () {
  const [token, setToken] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Bearer token"
          value={token}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 rounded bg-gray-900 border border-white/20 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFetch}
          disabled={!token || loading}
          className={`w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4`}
        >
          GET /me
        </button>
        {loading && <div className="text-blue-400 mb-2">Loading...</div>}
        {error && (
          <pre className="bg-red-900 text-red-300 p-4 rounded mb-2 whitespace-pre-wrap">
            {error}
          </pre>
        )}
        {data && (
          <pre className="bg-gray-900 text-green-300 p-4 rounded whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};
