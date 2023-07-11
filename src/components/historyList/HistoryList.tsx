import AppointmentItem from "../appointmentItem/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { useContext, useEffect, useCallback } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
function HistoryList() {
    const { getAppointments, allAppointments, loadingStatus } =
        useContext(AppointmentContext);

    useEffect(() => {
        getAppointments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                return allAppointments.map((item) => (
                    <AppointmentItem
                        key={item.id}
                        id={item.id}
                        date={item.date}
                        name={item.name}
                        service={item.service}
                        phone={item.phone}
                        canceled={item.canceled}
                    />
                ));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allAppointments]);

    return <View />;
}

export default HistoryList;
