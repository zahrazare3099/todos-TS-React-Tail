import { FormEvent, useState } from "react";

interface FormProps {
  onAdd: (title: string) => void;
}

export default function Form({ onAdd }: FormProps): JSX.Element {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title == "") return;
    onAdd(title);
    setTitle("");
  };

  return (
    <div className="p-4 my-3 gap-3 flex flex-col">
      <form
        className="flex flex-wrap gap-2 w-full justify-center "
        onSubmit={handleSubmit}
      >
        <input
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
          className="bg-slate-800 rounded-lg text-slate-200 px-2 py-1  w-72 md:w-56 lg:w-72"
        />
        <button
          type="submit"
          className="bg-green-800 py-1 md:p-0 rounded-lg  w-72 md:w-48"
        >
          Add
        </button>
      </form>
    </div>
  );
}
