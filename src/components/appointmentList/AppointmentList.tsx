/* eslint-disable react-hooks/exhaustive-deps */
import AppointmentItem from "../appointmentItem/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { useContext, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";
import { useState, useCallback } from "react";

function AppointmentList() {
    const {
        getActiveAppointments,
        loadingStatus,
        allActiveAppointments,
        calendarDate,
    } = useContext(AppointmentContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, selectId] = useState(0);

    useEffect(() => {
        getActiveAppointments();
    }, [calendarDate]);

    const handleOpenModal = useCallback((id: number) => {
        setIsModalOpen(true);
        selectId(id);
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
                            onClick={() => getActiveAppointments()}
                        >
                            Reload
                        </button>
                    </>
                );
            case "idle":
                if (allActiveAppointments.length === 0) {
                    return (
                        <h1 style={{ textAlign: "center" }}>
                            No appointments found...
                        </h1>
                    );
                } else {
                    return allActiveAppointments.map((item) => (
                        <AppointmentItem
                            key={item.id}
                            id={item.id}
                            date={item.date}
                            name={item.name}
                            service={item.service}
                            phone={item.phone}
                            openModal={handleOpenModal}
                        />
                    ));
                }
        }
    }, [loadingStatus]);

    return (
        <>
            <View />
            <CancelModal
                handleClose={setIsModalOpen}
                selectedId={selectedId}
                isOpen={isModalOpen}
            />
        </>
    );
}

export default AppointmentList;
