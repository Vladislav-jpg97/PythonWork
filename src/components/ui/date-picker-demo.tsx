"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { ru } from "date-fns/locale" // для русского языка

export default function VisualCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <div className="relative group p-4">
            {/* Декоративное свечение на фоне */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

            {/* Сам календарь */}
            <div className="relative bg-[#11141b] border border-white/10 rounded-xl p-2 shadow-2xl">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={ru}
                    className="rounded-md border-none"
                />
            </div>
        </div>
    )
}