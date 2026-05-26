import { Canvas } from "./layout/Canvas.jsx";
import { ToolsPanel } from "./layout/ToolsPanel.jsx";
import { SubmitButton } from "./components/SubmitButton.jsx";
import React from "react";
import { useStore } from "./store.js";

function App() {
  const result = useStore((state) => state.result);

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-linear-to-br from-gray-900 via-black to-purple-900/20">
      <section className="h-full flex-1 p-4 z-10">
        <div className="h-full w-full flex flex-col items-center border border-purple-500/30 rounded-lg shadow-[0_0_30px_rgba(168,85,247,0.15)] bg-purple-900/10 backdrop-blur-md">
          <Canvas />
        </div>
      </section>

      <section className="h-full w-[15%] flex flex-col gap-4 py-4 pr-4 z-20">
        <div className="flex flex-col flex-1 w-full border border-purple-500/30 rounded-lg shadow-[0_0_30px_rgba(168,85,247,0.15)] bg-purple-900/10 backdrop-blur-md overflow-hidden">
          <h2 className="text-lg font-semibold text-center text-white/90 py-3 border-b border-purple-500/30 bg-purple-900/20 shadow-sm">
            Nodes Panel
          </h2>
          <div className="flex-1 overflow-y-auto p-3">
            <ToolsPanel />
          </div>
        </div>

        <div className="flex flex-col h-40 w-full border border-purple-500/30 rounded-lg shadow-[0_0_30px_rgba(168,85,247,0.15)] bg-purple-900/10 backdrop-blur-md overflow-hidden">
          <h3 className="text-lg font-semibold text-center text-white/90 py-3 border-b border-purple-500/30 bg-purple-900/20 shadow-sm">
            Pipeline Analysis Result
          </h3>
          <div className="flex-1 overflow-y-auto p-3 text-white/80">
            {result ? (
              <div className="space-y-2 text-sm">
                <div>Nodes: {result.num_nodes}</div>
                <div>Edges: {result.num_edges}</div>
                <div>DAG: {result.is_dag ? " ✅ Yes" : " ❌ No"}</div>
              </div>
            ) : (
              <div className="text-sm text-center text-purple-300/50 pt-2">
                Submit to see results
              </div>
            )}
          </div>
        </div>
       

        <div className="w-full">
          <SubmitButton />
        </div>
      </section>
    </main>
  );
}

export default App;
