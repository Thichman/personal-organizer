"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Todo } from "./generated/prisma";
import { getTodos } from "@/queries/todos";
import {
  addItem,
  updateHidden,
  updateDone,
  updateDateDue,
  updatePriority,
  updateNotes,
} from "@/queries/todos";
import TodoSection from "./components/todo-section";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  const loadTodos = async () => {
    const todos = await getTodos();
    setTodos(todos);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleSubmitPersonal = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    mySubmitFunction(inputValue, "personal");
  };

  const handleSubmitHellion = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    mySubmitFunction(inputValue2, "hellion");
  };

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const handleChange2 = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue2(event.target.value);
  };

  const mySubmitFunction = async (inputValue: string, table: string) => {
    await addItem(inputValue, table);
    const todos = await getTodos();
    setTodos(todos);
    setInputValue("");
    setInputValue2("");
  };

  const handleToggleDone = async (id: number, done: boolean) => {
    await updateDone(id, done);
    await loadTodos();
  };

  const handleHide = async (id: number, hidden: boolean) => {
    await updateHidden(id, hidden);
    await loadTodos();
  };

  const handleDateDue = async (id: number, date_due: Date) => {
    await updateDateDue(id, date_due);
    await loadTodos();
  };

  const handlePriority = async (id: number, priority: string) => {
    await updatePriority(id, priority);
    await loadTodos();
  };

  const handleNotes = async (id: number, notes: string) => {
    await updateNotes(id, notes);
    await loadTodos();
  };

  return (
    <div className="min-h-screen p-8 sm:p-12 bg-gray-900 font-sans text-white">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight">
          📝 Personal Organizer
        </h1>
        <p className="text-gray-400 mt-2">
          Stay on top of your goals and tasks
        </p>
      </header>

      <main className="flex flex-col items-center gap-12 space-y-8">
        <TodoSection
          title="Personal"
          todos={todos}
          table="personal"
          inputValue={inputValue}
          onChange={handleChange}
          onSubmit={handleSubmitPersonal}
          onToggle={handleToggleDone}
          onHide={handleHide}
          onPriority={handlePriority}
          onDateDue={handleDateDue}
          onNotes={handleNotes}
        />
        <TodoSection
          title="Hellion Studios"
          todos={todos}
          table="hellion"
          inputValue={inputValue2}
          onChange={handleChange2}
          onSubmit={handleSubmitHellion}
          onToggle={handleToggleDone}
          onHide={handleHide}
          onPriority={handlePriority}
          onDateDue={handleDateDue}
          onNotes={handleNotes}
        />
      </main>
    </div>
  );
}
