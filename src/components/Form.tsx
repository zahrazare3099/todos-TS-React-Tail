import React from "react";
import { Notedata, Tag } from "../App";
import CreatableSelect from "react-select/creatable";
import { v4 as uuidv4 } from "uuid";
// interface NewReminderListProps {
//   onAdd: (title: string) => void;
// }
type NoteFormProps = {
  onCreateNote: (data: Notedata) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export default function Form(
  // { onAdd }: NewReminderListProps,
  { onCreateNote, addTag, availableTags }: NoteFormProps
): JSX.Element {
  const [title, setTitle] = React.useState("");
  const [selectTags, setSelectTags] = React.useState<Tag[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title == "") return;
    // onAdd(title);
    onCreateNote({ title, tags: selectTags });
    setTitle("");
  };

  return (
    <div className="p-4 border my-3 rounded-xl gap-3 flex flex-col">
      <h1 className="font-bold text-center">+Reminder</h1>
      <form
        className="flex flex-wrap gap-3 w-full justify-center "
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
        <CreatableSelect
          className="bg-transparent rounded-lg outline-none text-slate-200 w-72 md:w-52 lg:w-72"
          classNamePrefix="classNamePrefix bg-transparent text-slate-200 outline-none"
          placeholder="selecte options"
          onCreateOption={(label) => {
            const newTag = { id: uuidv4(), label };
            addTag(newTag);
            setSelectTags((prev) => [...prev, newTag]);
          }}
          isMulti
          value={selectTags.map((tag) => {
            return { label: tag.label, value: tag.id };
          })}
          onChange={(tags) => {
            setSelectTags(
              tags.map((tag) => {
                return { label: tag.label, id: tag.value };
              })
            );
          }}
          options={availableTags?.map((tag) => {
            return { label: tag.label, value: tag.id };
          })}
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
