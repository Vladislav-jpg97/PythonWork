"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, getDefaultClassNames, type DayButtonProps } from "react-day-picker"
import { isToday } from "date-fns" // Используем проверенный метод из date-fns

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-transparent w-full", className)}
      classNames={{
        ...defaultClassNames,
        months: "flex flex-col relative",
        month: "w-full",
        month_caption: "flex justify-center h-10 items-center mb-4 relative",
        caption_label: "text-sm font-bold text-white uppercase tracking-[0.3em] font-mono",
        nav: "flex items-center justify-between absolute w-full z-10 top-1 px-1",
        
        button_previous: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 opacity-50 hover:opacity-100 hover:bg-white/5 rounded-lg transition-all"
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 opacity-50 hover:opacity-100 hover:bg-white/5 rounded-lg transition-all"
        ),

        month_grid: "w-full",
        weekdays: "grid grid-cols-7 mb-2", 
        weekday: "text-slate-600 font-mono text-[10px] uppercase font-bold text-center",
        week: "grid grid-cols-7 w-full mt-1", 
        
        day: "flex items-center justify-center p-0 relative",
        
        // Базовый стиль кнопки
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal transition-all rounded-xl text-slate-300",
          "hover:bg-blue-500/20 hover:text-blue-400"
        ),
        
        // Стили для состояний
        selected: "bg-blue-600 text-white opacity-100 shadow-[0_0_15px_rgba(37,99,235,0.4)] rounded-xl",
        outside: "text-slate-700 opacity-20",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => orientation === "left" 
          ? <ChevronLeft className="h-4 w-4" /> 
          : <ChevronRight className="h-4 w-4" />,
        
        // Кастомная кнопка дня, которая ТОЧНО знает про "сегодня"
        DayButton: ({ day, modifiers, className, ...buttonProps }: DayButtonProps) => {
          const isDayToday = isToday(day.date); // Проверка на сегодня
          
          return (
            <button
              {...buttonProps}
              className={cn(
                className,
                // Если сегодня — добавляем спец. стили напрямую
                isDayToday && !modifiers.selected && "border border-blue-500/50 bg-blue-500/10 text-blue-400 font-bold shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]"
              )}
            >
              {day.date.getDate()}
            </button>
          )
        }
      }}
      {...props}
    />
  )
}

export { Calendar }