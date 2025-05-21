"use client";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Todo } from "@/app/generated/prisma";
import { getTodos } from "@/queries/todos";
import { useEffect, useState } from "react";

const locales = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const fetchTodos = async () => {
      setTodos(await getTodos());
    };
    fetchTodos();
  }, []);

  const events = todos
    .filter((todo) => todo.date_due)
    .map((todo) => ({
      title: todo.item,
      start: todo.date_due ? new Date(todo.date_due) : null,
      end: todo.date_due
        ? new Date(new Date(todo.date_due).getTime() + 60 * 60 * 1000)
        : null,
    }));

  return (
    <div className="h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">📅 Weekly View</h1>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={["week", "month"]}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: "80vh",
          backgroundColor: "white",
          color: "black",
          borderRadius: "12px",
        }}
      />
    </div>
  );
}
