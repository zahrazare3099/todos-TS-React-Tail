import React from "react";

interface NewReminderListProps {
  onAdd: (title: string) => void;
}

export default function Form({ onAdd }: NewReminderListProps): JSX.Element {
  const [title, setTitle] = React.useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title == "") return;
    onAdd(title);
    setTitle("");
  };
  return (
    <div className="p-4">
      <form className="flex gap-x-2 items-center" onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
          className="bg-slate-800 rounded-lg text-slate-200 px-2 py-1 w-1/2"
        />
        <button type="submit" className="bg-green-800 w-24 py-1 rounded-lg">
          Add
        </button>
      </form>
    </div>
  );
}
