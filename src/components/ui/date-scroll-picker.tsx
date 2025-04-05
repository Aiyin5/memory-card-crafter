import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface DateScrollPickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  fromYear?: number;
  toYear?: number;
  className?: string;
}

const DateScrollPicker = React.forwardRef<HTMLDivElement, DateScrollPickerProps>(
  ({ value, onChange, fromYear = 1900, toYear = new Date().getFullYear(), className }, ref) => {
    const currentDate = new Date();
    const initialDate = value || currentDate;
    
    const [selectedYear, setSelectedYear] = useState<number>(initialDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(initialDate.getMonth() + 1);
    const [selectedDay, setSelectedDay] = useState<number>(initialDate.getDate());
    const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

    // 生成年份列表
    const years = Array.from(
      { length: toYear - fromYear + 1 },
      (_, i) => fromYear + i
    );

    // 生成月份列表
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    // 根据选择的年月更新日期列表
    useEffect(() => {
      const daysCount = new Date(selectedYear, selectedMonth, 0).getDate();
      setDaysInMonth(Array.from({ length: daysCount }, (_, i) => i + 1));
      
      // 如果当前选择的日期超过了新月份的最大天数，则调整为最大天数
      if (selectedDay > daysCount) {
        setSelectedDay(daysCount);
      }
    }, [selectedYear, selectedMonth]);

    // 当日期变化时触发onChange
    useEffect(() => {
      if (onChange) {
        const newDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
        onChange(newDate);
      }
    }, [selectedYear, selectedMonth, selectedDay, onChange]);

    return (
      <div 
        ref={ref}
        className={cn(
          "flex justify-between bg-background rounded-md p-2",
          className
        )}
      >
        {/* 年份选择器 */}
        <div className="flex-1 mx-1">
          <ScrollArea className="h-32 w-full">
            <div className="flex flex-col items-center">
              {years.map((year) => (
                <div
                  key={year}
                  className={cn(
                    "py-2 px-4 w-full text-center cursor-pointer transition-colors",
                    selectedYear === year
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="h-0.5 w-full bg-border mt-1"></div>
        </div>

        {/* 月份选择器 */}
        <div className="flex-1 mx-1">
          <ScrollArea className="h-32 w-full">
            <div className="flex flex-col items-center">
              {months.map((month) => (
                <div
                  key={month}
                  className={cn(
                    "py-2 px-4 w-full text-center cursor-pointer transition-colors",
                    selectedMonth === month
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setSelectedMonth(month)}
                >
                  {month}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="h-0.5 w-full bg-border mt-1"></div>
        </div>

        {/* 日期选择器 */}
        <div className="flex-1 mx-1">
          <ScrollArea className="h-32 w-full">
            <div className="flex flex-col items-center">
              {daysInMonth.map((day) => (
                <div
                  key={day}
                  className={cn(
                    "py-2 px-4 w-full text-center cursor-pointer transition-colors",
                    selectedDay === day
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="h-0.5 w-full bg-border mt-1"></div>
        </div>
      </div>
    );
  }
);

DateScrollPicker.displayName = "DateScrollPicker";

export { DateScrollPicker };