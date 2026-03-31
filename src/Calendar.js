import React, { useState } from 'react';

function Calendar({ tasks }) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getTasksForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return tasks.filter(t => t.dueDate === dateStr);
  };

  const isToday = (day) => {
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth}
          className="text-gray-400 hover:text-green-600 font-bold text-lg px-2">‹</button>
        <h3 className="font-bold text-gray-700">{monthNames[month]} {year}</h3>
        <button onClick={nextMonth}
          className="text-gray-400 hover:text-green-600 font-bold text-lg px-2">›</button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 mb-2">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, i) => <div key={`b${i}`} />)}
        {days.map(day => {
          const dayTasks = getTasksForDay(day);
          const hasPending = dayTasks.some(t => t.status === 'pending');
          const hasDone = dayTasks.some(t => t.status === 'completed');
          return (
            <div key={day}
              className={`relative text-center py-1 rounded-lg text-sm cursor-pointer transition-all
                ${isToday(day) ? 'bg-green-600 text-white font-bold' : 'hover:bg-green-50 text-gray-600'}`}>
              {day}
              {dayTasks.length > 0 && (
                <div className="flex justify-center gap-0.5 mt-0.5">
                  {hasPending && <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full inline-block"></span>}
                  {hasDone && <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-3 mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block"></span> Pending
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> Done
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span className="w-2 h-2 bg-green-600 rounded-full inline-block"></span> Today
        </div>
      </div>
    </div>
  );
}

export default Calendar;