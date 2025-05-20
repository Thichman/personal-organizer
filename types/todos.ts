import type { Todo } from "@/app/generated/prisma";

export type TodoSectionProps = {
    title: string;
    todos: Todo[];
    table: string;
    inputValue: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onToggle: (id: number, done: boolean) => void;
    onHide: (id: number, hidden: boolean) => void;
};