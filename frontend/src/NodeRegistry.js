import { InputNode } from "./nodes/InputNode";
import { OutputNode } from "./nodes/OutputNode";
import { LLMNode } from "./nodes/LLMNode";
import { TextNode } from "./nodes/TextNode";

import { MathNode } from "./nodes/MathNode";
import { ApiNode } from "./nodes/ApiNode";
import { DelayNode } from "./nodes/DelayNode";
import { FilterNode } from "./nodes/FilterNode";
import { MergeNode } from "./nodes/MergeNode";

import { FileInput, FileOutput, Sparkles, Type, Calculator, Brain, Timer, Filter, Merge } from "lucide-react";

export const NodeRegistry = [
  {
    type: "customInput",
    label: "Input",
    icon: FileInput,
    component: InputNode,
  },
  {
    type: "customOutput",
    label: "Output",
    icon: FileOutput,
    component: OutputNode,
  },
  {
    type: "llm",
    label: "LLM",
    icon: Sparkles,
    component: LLMNode,
  },
  {
    type: "text",
    label: "Text",
    icon: Type,
    component: TextNode,
  },
  {
    type: "math",
    label: "Math",
    icon: Calculator,
    component: MathNode,
  },
  {
    type: "api",
    label: "API",
    icon: Brain,
    component: ApiNode,
  },
  {
    type: "delay",
    label: "Delay",
    icon: Timer,
    component: DelayNode,
  },
  {
    type: "filter",
    label: "Filter",
    icon: Filter,
    component: FilterNode,
  },
  {
    type: "merge",
    label: "Merge",
    icon: Merge,
    component: MergeNode,
  },
];