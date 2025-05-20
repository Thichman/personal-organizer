'use server'

import type { Todo } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

/**
 * Retrieves all todos from the database.
 * @returns A promise resolving to an array of Todo objects
 */
export async function getTodos(): Promise<Todo[]> {
    return await prisma.todo.findMany({});
}


/**
 * Creates a new Todo item in the database.
 * @param {string} item - The string text of the Todo item
 * @param {string} table - The name of the table the Todo item belongs to
 * @returns {Promise<void>}
 * @throws {Error} If there is a problem with the database query
 */
export const addItem = async (item: string, table: string) => {
    try {
        await prisma.todo.create({
            data: {
                item: item,
                table: table,
                priority: 'Low'
            }
        })
    } catch (error) {
        console.error(error)
        throw error
    }
}

/**
 * Updates a Todo item in the database.
 * @param {number} id - The ID of the Todo item to update
 * @param {boolean} done - The new value for the 'done' field of the Todo item
 * @returns {Promise<void>}
 * @throws {Error} If there is a problem with the database query
 */
export const updateItem = async (id: number, done: boolean) => {
    await prisma.todo.update({
        where: {
            id: id
        },
        data: {
            done: done
        }
    })
}

/**
 * Updates a Todo item in the database.
 * @param {number} id - The ID of the Todo item to update
 * @param {boolean} hidden - The new value for the 'hidden' field of the Todo item
 * @returns {Promise<void>}
 * @throws {Error} If there is a problem with the database query
 */
export const updateHidden = async (id: number, hidden: boolean) => {
    await prisma.todo.update({
        where: {
            id: id
        },
        data: {
            hidden: hidden
        }
    })
}

/**
 * Updates a Todo item in the database.
 * @param {number} id - The ID of the Todo item to update
 * @param {boolean} done - The new value for the 'done' field of the Todo item
 * @returns {Promise<void>}
 * @throws {Error} If there is a problem with the database query
 */
export const updateDone = async (id: number, done: boolean) => {
    await prisma.todo.update({
        where: {
            id: id
        },
        data: {
            done: done
        }
    })
}

export const updatePriority = async (id: number, priority: string) => {
    await prisma.todo.update({
        where: {
            id: id
        },
        data: {
            priority: priority
        }
    })
}

export const updateNotes = async (id: number, notes: string) => {
    await prisma.todo.update({
        where: {
            id: id
        },
        data: {
            notes: notes
        }
    })
}

// This needs to be updated
export const updateDateDue = async (id: number, date_due: Date | string) => {
    await prisma.todo.update({
        where: { id },
        data: {
            date_due: date_due,
        },
    });
};
