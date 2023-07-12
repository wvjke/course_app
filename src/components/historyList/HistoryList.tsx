import AppointmentItem from "../appointmentItem/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { useContext, useEffect, useCallback } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
function HistoryList() {
    const { getAppointments, allAppointments, loadingStatus, calendarDate } =
        useContext(AppointmentContext);

    useEffect(() => {
        getAppointments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calendarDate]);

    const View = useCallback(() => {
        switch (loadingStatus) {
            case "loading":
                return <Spinner />;
            case "error":
                return (
                    <>
                        <Error />
                        <button
                            className="schedule__reload"
                            onClick={() => getAppointments()}
                        >
                            Reload
                        </button>
                    </>
                );
            case "idle":
                if (allAppointments.length === 0) {
                    return (
                        <h1
                            style={{
                                textAlign: "center",
                                gridColumn: "1 / -1",
                            }}
                        >
                            No appointments found...
                        </h1>
                    );
                } else {
                    return allAppointments.map((item) => (
                        <AppointmentItem {...item} key={item.id} />
                    ));
                }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allAppointments]);

    return <View />;
}

export default HistoryList;
