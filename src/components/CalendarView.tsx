'use client';

import React, { useState, useRef } from 'react';
import {
  format,
  addMonths,
  subMonths,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isToday,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleSwipe = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      // Arrastou para esquerda: próximo mês
      setCurrentDate((prev) => addMonths(prev, 1));
    } else if (distance < -50) {
      // Arrastou para direita: mês anterior
      setCurrentDate((prev) => subMonths(prev, 1));
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return (
    <div
      className="p-4 max-w-md mx-auto select-none"
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        touchEndX.current = e.changedTouches[0].clientX;
        handleSwipe();
      }}
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
      </h2>

      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 mb-2">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={day.toString()}
              className={`
                p-2 rounded-full transition-all duration-200
                ${!isCurrentMonth ? 'text-gray-300' : ''}
                ${isCurrentDay ? 'bg-blue-600 text-white font-bold' : 'text-gray-800'}
              `}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};
