import { Handle } from "@xyflow/react";

export const CustomHandle = ({
  type,
  position,
  id,
  style = {},
}) => {
  return (
    <Handle
      type={type}
      position={position}
      id={id}
      style={{
        width: 8,
        height: 8,
        background: "#a855f7",
        border: "1px solid white",
        ...style,
      }}
    />
  );
};