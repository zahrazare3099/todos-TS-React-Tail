import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import ReminderServices from "./service/ReminderServices";
import { Reminder } from "./models/reminder";
import useLocalStorage from "./components/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

export interface ReminderList {
  items: Array<Reminder>;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
export type Note = {
  id: string;
} & Notedata;

export type Tag = {
  id: string;
  label: string;
};

export type RawNote = {
  id: string;
} & RawNotedata;

export type RawNotedata = {
  title: string;
  tagIds: string[];
};

export type Notedata = {
  title: string;
  tags: Tag[];
};

function App() {
  const [data, setData] = useState<Reminder[]>([]);
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("Tags", []);

  const notesWithTags = useMemo(() => {
    return notes?.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);
  console.log("notesWithTags", notesWithTags);

  function onCreateNote({ tags, ...data }: Notedata) {
    setNotes((preNotes) => {
      return [
        ...preNotes,
        { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => (prev ? [...prev, tag] : [tag]));
  }

  useEffect(() => {
    const loadReminders = async () => {
      const res = await ReminderServices.getReminders();
      return setData(res);
    };
    loadReminders();
  }, []);

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  // const addReminder = async (title: string) => {
  //   // const newReminder:Reminder = await ReminderServices.addReminders(title);
  //   // console.log(newReminder);
  //   setData([{ title, id: Date.now() }, ...data]);
  // };

  return (
    <div className="px-3 pb-6 bg-slate-900 h-full text-slate-100">
      <div className="p-3 border-b flex gap-x-2 items-center">
        <img
          src="src\asset\logo.png"
          alt="pic"
          className="w-24 bg-transparent"
        />
        <h1 className="font-bold">Reminder App</h1>
      </div>
      <div>
        <Form
          // onAdd={addReminder}
          onCreateNote={onCreateNote}
          addTag={addTag}
          availableTags={tags}
        />
      </div>
      <div className="min-w-xl px-4">
        <Table items={data} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
