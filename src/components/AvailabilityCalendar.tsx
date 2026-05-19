import React, { useState } from 'react';
import { Calendar, Clock, Check, X, ChevronLeft, ChevronRight, Send } from 'lucide-react';

interface AvailabilityCalendarProps {
  isVisible: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  '09:00 AM – 10:00 AM',
  '10:30 AM – 11:30 AM',
  '02:00 PM – 03:00 PM',
  '03:30 PM – 04:30 PM',
  '05:00 PM – 06:00 PM',
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ isVisible, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  if (!isVisible) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (date: Date): (Date | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (Date | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  };

  const isAvailable = (date: Date | null): boolean => {
    if (!date) return false;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = date.getDay();
    return d >= today && day !== 0 && day !== 6;
  };

  const isPast = (date: Date | null): boolean => {
    if (!date) return false;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot) return;

    const dateStr = selectedDate.toLocaleDateString('en-MY', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
    const subject = `Meeting Request – ${dateStr} at ${selectedSlot} (MYT)`;
    const body = [
      `Hi Adil,`,
      ``,
      `I'd like to schedule a consultation on:`,
      `  Date: ${dateStr}`,
      `  Time: ${selectedSlot} (Malaysia Standard Time, UTC+8)`,
      ``,
      `Please let me know if this works for you.`,
      ``,
      `Thank you!`,
    ].join('\n');

    window.location.href = `mailto:adilazhariosman@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onClose();
  };

  const days = getDaysInMonth(currentDate);

  const handleDateClick = (date: Date | null) => {
    if (!date || !isAvailable(date)) return;
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Schedule a Meeting</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Pick a date and time — I'll confirm within 24 hours</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    aria-label="Next month"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="grid grid-cols-7 gap-1 mb-3">
                  {DAY_NAMES.map((d) => (
                    <div key={d} className="text-center text-xs font-medium text-gray-400 dark:text-gray-500 py-1">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {days.map((date, i) => {
                    const available = isAvailable(date);
                    const past = isPast(date);
                    const isWeekend = date ? (date.getDay() === 0 || date.getDay() === 6) : false;
                    const isSelected = selectedDate && date &&
                      selectedDate.toDateString() === date.toDateString();

                    return (
                      <button
                        key={i}
                        onClick={() => handleDateClick(date)}
                        disabled={!date || !available}
                        className={[
                          'aspect-square text-sm font-medium rounded-lg transition-all duration-150 flex items-center justify-center',
                          !date ? 'invisible' : '',
                          isSelected ? 'bg-blue-600 text-white shadow-md scale-105' : '',
                          available && !isSelected ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 cursor-pointer' : '',
                          (past || isWeekend) && !isSelected ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : '',
                        ].join(' ')}
                      >
                        {date?.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-emerald-100 dark:bg-emerald-900/30 rounded border border-emerald-300 dark:border-emerald-700" />
                  <span className="text-gray-500 dark:text-gray-400">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600" />
                  <span className="text-gray-500 dark:text-gray-400">Unavailable</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-blue-600 rounded" />
                  <span className="text-gray-500 dark:text-gray-400">Selected</span>
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-5">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Available Time Slots
              </h4>

              {selectedDate ? (
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="font-medium text-blue-800 dark:text-blue-300 text-sm">
                      {selectedDate.toLocaleDateString('en-MY', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-blue-500 dark:text-blue-400 mt-0.5">Malaysia Standard Time (UTC+8)</p>
                  </div>

                  <div className="grid gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isChosen = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(isChosen ? null : slot)}
                          className={[
                            'flex items-center justify-between p-3.5 rounded-lg border-2 text-left transition-all duration-150',
                            isChosen
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600',
                          ].join(' ')}
                        >
                          <div>
                            <span className={`font-medium text-sm ${isChosen ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                              {slot}
                            </span>
                            <p className="text-xs text-gray-400 mt-0.5">60-minute consultation</p>
                          </div>
                          {isChosen && (
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleConfirm}
                    disabled={!selectedSlot}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 text-sm"
                  >
                    <Send className="h-4 w-4" />
                    {selectedSlot ? 'Send Meeting Request' : 'Select a time slot first'}
                  </button>

                  <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                    This opens your email client with a pre-filled meeting request.
                  </p>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Select an available date to view time slots</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
