'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { Value } from '@/types/calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css';

export default function CalendarPage() {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-4">
            <div className="p-8 bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6">📅 Calendar</h1>
                <Calendar
                    onChange={onChange}
                    value={value}
                    locale="en-US"
                    className="react-calendar rounded-xl w-full"
                    tileClassName={({ date }) =>
                        `text-sm py-2 transition hover:bg-blue-500 hover:text-white rounded-lg ${date.toDateString() === new Date().toDateString()
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'text-white'
                        }`
                    }
                />
            </div>
        </div>
    );
}
