import { useState } from "react";
import fetchPokemonApi from "./scripts/fetchPokemonApi"; // or: import { fetchPokemonApi } from '../scripts/fetchPokemonApi';

export default function PokemonFetcher(): React.ReactElement {
  const [name, setName] = useState("");
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Enter a Pokémon name");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await fetchPokemonApi(trimmed.toLowerCase());
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 50,
        backgroundColor: "#f0f0f0",
        padding: 20,
        borderRadius: 10,
      }}
    >
      {" "}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleFetch();
        }}
        style={{
          padding: 10,
          fontSize: 16,
          width: 200,
          marginRight: 10,
          borderRadius: 5,
          border: "1px solid #",
        }}
        placeholder="e.g. pikachu"
        aria-label="pokemon name"
      />{" "}
      <button
        style={{
          padding: 10,
          fontSize: 16,
          borderRadius: 5,
          border: "1px solid #ccc",
        }}
        onClick={handleFetch}
        disabled={loading}
      >
        {" "}
        {loading ? "Loading…" : "Fetch"}{" "}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {data && (
        <pre
          style={{
            textAlign: "left",
            maxHeight: 500,
            overflow: "auto",
            padding: 10,
            backgroundColor: "#000",
            color: "#0f0",
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
