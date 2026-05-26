import { useStore } from "../store";

export const SubmitButton = () => {

  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const setResult = useStore((state) => state.setResult);

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8000/pipelines/parse", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        nodes,
        edges,
      }),
    });

    const data = await response.json();
    setResult(data); // Store the result for display
  };

  return (
    <button
      onClick={handleSubmit}
      className="
        w-full py-2 px-4 bg-purple-800 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors cursor-pointer"
    >
      Submit
    </button>
  );
};
