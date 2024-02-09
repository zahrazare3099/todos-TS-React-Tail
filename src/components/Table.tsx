import { Reminder } from "../models/reminder";

interface ReminderListProps {
  items: Reminder[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
export default function Table({ items, onDelete, onEdit }: ReminderListProps) {
  return (
    <table className="rounded-lg min-w-full">
      <thead className="bg-slate-700">
        <tr>
          <th>#</th>
          <th>title</th>
          <th>operation</th>
        </tr>
      </thead>
      <tbody className="bg-slate-800">
        {items.slice(0, 15).map((item, index) => (
          <tr key={item.id} className="border-b">
            <td className="p-2">{index + 1}</td>
            <td>{item.title}</td>
            <td className="flex mt-1 gap-x-2 p-1">
              <button
                className="bg-slate-700 px-2 rounded-lg w-16"
                onClick={() => onEdit(item.id)}
              >
                edit
              </button>
              <button
                className="bg-red-900 px-2 rounded-lg w-16"
                onClick={() => onDelete(item.id)}
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
