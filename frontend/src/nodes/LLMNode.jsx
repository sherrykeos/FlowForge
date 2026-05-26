
import { Handle, Position } from '@xyflow/react';
import { BaseNode } from '../components/BaseNode.jsx';
import { Sparkles } from 'lucide-react';

export const LLMNode = ({ id}) => {

  return (
    <BaseNode
      id={id}
      icon={Sparkles}
      title="LLM"
      inputs = { [
      { id: `${id}-system`},
      { id: `${id}-propmt`},
    ]}
    outputs = {[
      { id: `${id}-response`},
    ]}
    >
      <div className="text-xs text-zinc-400">Queries an LLM.</div>
    </BaseNode>
    
  );
}
