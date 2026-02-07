"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { ru } from "date-fns/locale" // Чтобы месяцы были на русском

export function CalendarSection() {
    // Даже если это для красоты, стейт нужен, чтобы по нему можно было кликать
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <div className=" bg-[#11141b] p-4">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ru}
                // Убираем стандартную рамку, так как мы добавили свою выше
                className="rounded-md border-none"
            />

            {/* Маленький декоративный элемент под календарем */}
            <div className="mt-4 pt-4 border-t border-white/5 px-2">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                    Сегодня: {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                </p>
            </div>
        </div>
    )
}