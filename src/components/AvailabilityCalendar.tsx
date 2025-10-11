import React, { useState } from 'react';
import { Calendar, Clock, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface AvailabilityCalendarProps {
  isVisible: boolean;
  onClose: () => void;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ isVisible, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  if (!isVisible) return null;

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  // Check if a date is available (for demo purposes)
  const isDateAvailable = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    const day = date.getDay();
    
    // Available on weekdays, not weekends, and not in the past
    return date >= today && day !== 0 && day !== 6;
  };

  // Check if date is booked (for demo purposes)
  const isDateBooked = (date: Date | null) => {
    if (!date) return false;
    // Mock some booked dates
    const bookedDates = [3, 7, 14, 21, 28];
    return bookedDates.includes(date.getDate());
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getAvailableTimeSlots = (date: Date) => {
    // Mock available time slots
    return [
      '09:00 AM - 10:00 AM',
      '10:30 AM - 11:30 AM', 
      '02:00 PM - 03:00 PM',
      '03:30 PM - 04:30 PM',
      '05:00 PM - 06:00 PM'
    ];
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Schedule a Meeting
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Select an available date and time for our consultation
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
            >
              <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {dayNames.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {days.map((date, index) => {
                    const isAvailable = isDateAvailable(date);
                    const isBooked = isDateBooked(date);
                    const isSelected = selectedDate && date && 
                      selectedDate.toDateString() === date.toDateString();

                    return (
                      <button
                        key={index}
                        onClick={() => date && isAvailable && setSelectedDate(date)}
                        disabled={!date || !isAvailable}
                        className={`
                          aspect-square p-2 text-sm font-medium rounded-lg transition-all duration-200 
                          ${!date ? 'invisible' : ''}
                          ${isSelected ? 'bg-blue-600 text-white shadow-lg' : ''}
                          ${isAvailable && !isSelected ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50' : ''}
                          ${isBooked ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : ''}
                          ${!isAvailable && !isBooked ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                      >
                        {date && (
                          <div className="relative">
                            {date.getDate()}
                            {isAvailable && (
                              <div className="absolute -top-1 -right-1">
                                <Check className="h-3 w-3 text-emerald-500" />
                              </div>
                            )}
                            {isBooked && (
                              <div className="absolute -top-1 -right-1">
                                <X className="h-3 w-3 text-red-500" />
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-100 dark:bg-emerald-900/30 rounded border border-emerald-300"></div>
                  <span className="text-gray-600 dark:text-gray-400">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 dark:bg-red-900/30 rounded border border-red-300"></div>
                  <span className="text-gray-600 dark:text-gray-400">Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600"></div>
                  <span className="text-gray-600 dark:text-gray-400">Unavailable</span>
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Available Time Slots
              </h4>

              {selectedDate ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="font-medium text-blue-800 dark:text-blue-300">
                      Selected Date: {selectedDate.toDateString()}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      Timezone: Malaysia Standard Time (UTC+8)
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {getAvailableTimeSlots(selectedDate).map((slot, index) => (
                      <button
                        key={index}
                        className="group p-4 text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {slot}
                          </span>
                          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          30-minute consultation
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      💡 <strong>Note:</strong> This is a demo calendar. In production, clicking a time slot would:
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-4 space-y-1">
                      <li>• Open a booking form</li>
                      <li>• Send calendar invitations</li>
                      <li>• Integrate with your preferred scheduling service</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Select an available date to view time slots
                  </p>
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