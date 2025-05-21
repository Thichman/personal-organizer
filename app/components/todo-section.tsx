import { useState } from "react";
import type { TodoSectionProps } from "@/types/todos";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TodoSection({
  title,
  todos,
  table,
  inputValue,
  onChange,
  onSubmit,
  onToggle,
  onHide,
  onPriority,
  onDateDue,
  onNotes,
}: TodoSectionProps & {
  onPriority: (id: number, priority: string) => void;
  onDateDue: (id: number, date_due: Date) => void;
  onNotes: (id: number, notes: string) => void;
}) {
  const filteredTodos = todos.filter(
    (todo) => todo.table === table && !todo.hidden,
  );

  const [openNotes, setOpenNotes] = useState<Record<number, boolean>>({});
  const [noteInputs, setNoteInputs] = useState<Record<number, string>>({});
  const [datePickersOpen, setDatePickersOpen] = useState<
    Record<number, boolean>
  >({});

  const toggleNotes = (id: number) => {
    setOpenNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleDatePicker = (id: number) => {
    setDatePickersOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full max-w-3xl bg-gray-800 p-6 rounded-2xl space-y-6 shadow-lg">
      <h2 className="text-3xl font-semibold text-white text-center">{title}</h2>

      <div className="space-y-4">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="bg-gray-700 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-start gap-3 w-full">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => onToggle(todo.id, !todo.done)}
                  className="accent-blue-500 w-5 h-5 mt-1"
                />
                <div className="flex-1">
                  <p
                    className={`text-white break-words ${
                      todo.done ? "line-through opacity-60" : ""
                    }`}
                  >
                    {todo.item}
                  </p>

                  <div className="text-sm text-gray-400 mt-1">
                    Priority: {todo.priority || "None"} | Due:{" "}
                    {todo.date_due
                      ? new Date(todo.date_due).toLocaleString()
                      : "Not set"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={todo.priority || "Medium"}
                  onChange={(e) => onPriority(todo.id, e.target.value)}
                  className="text-xs bg-gray-600 text-white px-2 py-1 rounded-md"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

                <button
                  onClick={() => toggleDatePicker(todo.id)}
                  className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 w-full flex items-center justify-center"
                >
                  {todo.date_due ? "Edit Date" : "Add Date"}
                </button>
                <button
                  onClick={() => onHide(todo.id, !todo.hidden)}
                  className="text-xs bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Hide
                </button>
              </div>
            </div>

            {datePickersOpen[todo.id] && (
              <DatePicker
                selected={todo.date_due ? new Date(todo.date_due) : new Date()}
                onChange={(date) => onDateDue(todo.id, date as Date)}
                showTimeSelect
                dateFormat="Pp"
                className="mt-2 rounded-md px-2 py-1 bg-white text-black"
              />
            )}

            <div>
              <button
                onClick={() => toggleNotes(todo.id)}
                className="text-sm text-blue-400 hover:underline ml-8"
              >
                {openNotes[todo.id] ? "Hide Notes" : "Show/Add Notes"}
              </button>
              {openNotes[todo.id] && (
                <div className="mt-2">
                  <textarea
                    value={noteInputs[todo.id] ?? todo.notes ?? ""}
                    onChange={(e) =>
                      setNoteInputs((prev) => ({
                        ...prev,
                        [todo.id]: e.target.value,
                      }))
                    }
                    onBlur={() => onNotes(todo.id, noteInputs[todo.id] ?? "")}
                    rows={3}
                    className="w-full mt-1 rounded-md px-3 py-2 text-sm bg-gray-600 text-white"
                    placeholder="Add notes here..."
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex gap-3 w-full pt-2">
        <input
          type="text"
          value={inputValue}
          onChange={onChange}
          placeholder="Add a task..."
          className="flex-1 px-4 py-2 rounded-md bg-white text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
