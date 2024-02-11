import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import ReminderServices from "./service/ReminderServices";
import { Reminder } from "./models/reminder";

export interface ReminderList {
  items: Array<Reminder>;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
function App() {
  const [data, setData] = useState<Reminder[]>([]);

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

  const addReminder = async (title: string) => {
    // const newReminder:Reminder = await ReminderServices.addReminders(title);
    // console.log(newReminder);

    setData([{ title, id: Date.now() }, ...data]);
  };
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
        <Form onAdd={addReminder} />
      </div>
      <div className="min-w-xl px-4">
        <Table items={data} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
