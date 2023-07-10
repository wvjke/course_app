import "./appointmentItem.scss";
import { IAppointment } from "../../shared/interfaces/appointment.interface";
import dayjs from "dayjs";
import { useEffect, useState, memo } from "react";
import { getTimeLeft } from "../../services/TimeLeft";
import { Optional } from "utility-types";

type AppointmentProps = Optional<IAppointment, "canceled"> & {
    openModal: (state: number) => void;
};

const AppointmentItem: React.FC<AppointmentProps> = memo(
    ({ id, name, phone, service, date, canceled, openModal }) => {
        const [timeLeft, setTimeLeft] = useState<string | null>(null);

        useEffect(() => {
            setTimeLeft(getTimeLeft(date));
            const timer = setInterval(() => {
                setTimeLeft(getTimeLeft(date));
            }, 60000);

            return () => {
                clearInterval(timer);
            };
        }, [date]);

        const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm");

        return (
            <div className="appointment">
                <div className="appointment__info">
                    <span className="appointment__date">
                        Date: {formattedDate}
                    </span>
                    <span className="appointment__name">Name: {name}</span>
                    <span className="appointment__service">
                        Service: {service}
                    </span>
                    <span className="appointment__phone">Phone: {phone}</span>
                </div>
                {!canceled ? (
                    <>
                        <div className="appointment__time">
                            <span>Time left:</span>
                            <span className="appointment__timer">
                                {timeLeft}
                            </span>
                        </div>
                        <button
                            className="appointment__cancel"
                            onClick={() => {
                                openModal(id);
                            }}
                        >
                            Cancel
                        </button>
                    </>
                ) : null}
                {canceled ? (
                    <div className="appointment__canceled">Canceled</div>
                ) : null}
            </div>
        );
    }
);

export default AppointmentItem;
