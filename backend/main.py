from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import networkx as nx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def ping():
    return {"message": "ping pong || ting tong :)"}

class PipelineData(BaseModel):
    nodes: list
    edges: list

@app.post("/pipelines/parse")
def parse_pipeline(data: PipelineData):

    graph = nx.DiGraph()

    for node in data.nodes:
        graph.add_node(node["id"])

    for edge in data.edges:
        graph.add_edge(
            edge["source"],
            edge["target"]
        )

    return {
        "num_nodes": len(data.nodes),
        "num_edges": len(data.edges),
        "is_dag": nx.is_directed_acyclic_graph(graph),
    }