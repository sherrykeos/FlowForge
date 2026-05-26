export const NodeField = ({ field }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-zinc-300">
        {field.label}
      </label>

      {field.type === "text" && (
        <input
          type="text"
          value={field.value}
          onChange={field.onChange}
          className="rounded-md border border-zinc-600 bg-zinc-800 px-2 py-1 outline-none"
        />
      )}

      {field.type === "select" && (
        <select
          value={field.value}
          onChange={field.onChange}
          className="rounded-md border border-zinc-600 bg-zinc-800 px-2 py-1 outline-none"
        >
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {field.type === "textarea" && (
  <textarea
    value={field.value}
    onChange={(e) => {
      field.onChange(e);

      e.target.style.height = "auto";
      e.target.style.height =
        `${e.target.scrollHeight}px`;
    }}

    rows={1}

    className="
      min-h-[80px]
      w-full
      resize-none
      overflow-hidden
      rounded-md
      border
      border-zinc-600
      bg-zinc-800
      px-2
      py-1
      outline-none
    "
  />
)}
    </div>
  );
};