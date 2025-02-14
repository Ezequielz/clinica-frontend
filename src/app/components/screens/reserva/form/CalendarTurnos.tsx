import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useReservaTurnos } from '@/hooks/useReservaTurnos';

export const CalendarTurnos = () => {
      const {
        availableDays,
        semana,
  
        // Methods
        setSelectedDate,
      
    
      } = useReservaTurnos();
    return (
        <>
            <h3 className="text-md font-bold">Selecciona un día</h3>
            <span>
                Días disponibles:{" "}
                {availableDays
                    .map((day) => semana[day])
                    .join(", ")}
            </span>
            <Calendar
                onChange={(date) => {
                    if (date instanceof Date && !isNaN(date.getTime()) && availableDays.includes(date.getDay())) {
                        setSelectedDate(date);
                    }
                }}
                tileClassName={({ date }) => {
                    if (date instanceof Date && !isNaN(date.getTime())) {
                        return availableDays.includes(date.getDay())
                            ? " text-green-600"
                            : " text-gray-500 cursor-not-allowed !important";
                    }
                    return "";
                }}
                
                minDate={new Date()} 
                tileDisabled={({ date }) =>
                    !(date instanceof Date && !isNaN(date.getTime()) &&
                        availableDays.includes(date.getDay())) || date < new Date()
                }
                // tileDisabled={({ date }) => !(date instanceof Date && !isNaN(date.getTime()) && availableDays.includes(date.getDay()))}
                className="border rounded-lg w-full p-2"
            />




        </>
    )
}
