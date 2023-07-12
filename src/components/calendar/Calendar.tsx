/* eslint-disable react-hooks/exhaustive-deps */
import { Calendar as LibCalendar } from "react-calendar";
import { useContext, useEffect } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { useLocation } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "./calendar.scss";

function Calendar() {
    const { calendarDate, setDateAndFilter } = useContext(AppointmentContext);

    const location = useLocation();

    useEffect(() => {
        const navDiv = document.querySelector(".react-calendar__navigation");
        const resetButton = document.createElement("button");
        resetButton.textContent = "Reset";
        resetButton.className = "calendar_button appointment__cancel";
        navDiv?.insertAdjacentElement("afterend", resetButton);

        const resetCalendar = () => setDateAndFilter(null);

        resetButton.addEventListener("click", resetCalendar);

        return () => {
            resetButton.removeEventListener("click", resetCalendar);
        };
    }, []);

    useEffect(() => {
        setDateAndFilter(null);
    }, [location]);

    return (
        <div className="calendar">
            <LibCalendar
                value={calendarDate}
                onChange={(value) => {
                    setDateAndFilter(value);
                }}
                selectRange
                showNeighboringMonth={false}
            />
        </div>
    );
}

export default Calendar;
