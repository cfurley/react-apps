import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <p>{count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Count: {count}
      </button>
    </>
  );
}

export default App;
