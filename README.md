# Pipeline Builder & Analyzer

A full-stack node-based visual programming interface that allows users to build, connect, and analyze pipelines. Users can drag and drop different types of nodes onto a canvas, connect them with interactive edges, and submit the pipeline to a backend service to evaluate its structural properties (such as whether it forms a Directed Acyclic Graph).

## 🚀 Features

- **Interactive Canvas**: Drag and drop visual node editor powered by React Flow.
- **Diverse Node Types**: Includes specialized nodes tailored for pipeline construction:
  - **Input / Output**: Pipeline entry and exit points.
  - **LLM**: Queries a Large Language Model.
  - **API**: Configurable HTTP request node.
  - **Math**: Applies mathematical operations.
  - **Filter**: Routes data based on specific conditions.
  - **Text**: Formats text with template variables.
  - **Delay & Merge**: Utility nodes for flow control.
- **Advanced Graph Controls**:
  - Custom controls, minimap, and background styling matching a dark glowing theme.
  - Two-step deletion confirmation for both nodes and edges to prevent accidental data loss.
  - Global state management using Zustand.
- **Pipeline Analysis**: Backend API validates the graph layout, returning edge counts, node counts, and DAG (Directed Acyclic Graph) validation.

## 🛠️ Tech Stack

**Frontend:**
- [React](https://reactjs.org/) (Vite)
- [@xyflow/react (React Flow)](https://reactflow.dev/) for canvas routing and graph UI.
- [Zustand](https://github.com/pmndrs/zustand) for fast, un-opinionated state management.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- [Lucide React](https://lucide.dev/) for beautiful, consistent iconography.

**Backend:**
- [Python](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/) for high-performance REST APIs.
- [NetworkX](https://networkx.org/) for graph theory and complex network analysis.
- Pydantic for data validation.

## 📂 Project Structure

```text
.
├── backend/
│   └── main.py             # FastAPI server and NetworkX analysis endpoints
└── frontend/
    ├── src/
    │   ├── components/     # Reusable UI components (BaseNode, Buttons, CustomEdges)
    │   ├── layout/         # High-level layout components (Canvas, ToolsPanel)
    │   ├── nodes/          # Individual custom node definitions
    │   ├── NodeRegistry.js # Centralized registry mapping nodes to side-panel UI
    │   ├── store.js        # Zustand global state store
    │   └── App.jsx         # Main application view
    └── package.json
```

## ⚙️ Setup Instructions

### 1. Start the Backend
Navigate to the `backend` directory and install the required Python packages.

```bash
cd backend
pip install fastapi uvicorn networkx pydantic
uvicorn main:app --reload
```
*The backend will be running at `http://127.0.0.1:8000`.*

### 2. Start the Frontend
Open a new terminal, navigate to the `frontend` directory, install dependencies, and start the development server.

```bash
cd frontend
npm install
npm run dev
```
*Navigate to the local URL provided by Vite (usually `http://localhost:5173`) to view the application.*

## 💡 Usage
1. Drag nodes from the **Nodes Panel** on the left and drop them onto the central canvas.
2. Connect nodes by dragging a line from a source handle (usually right/bottom) to a target handle (usually left/top).
3. Click the **Submit** button to send your pipeline to the backend.
4. View the **Pipeline Analysis Result** to see the number of nodes, edges, and whether the flow is a valid DAG.