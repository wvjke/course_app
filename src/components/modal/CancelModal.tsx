/* eslint-disable react-hooks/exhaustive-deps */
import "./modal.scss";
import Portal from "../portal/Portal";
import { useEffect, useRef, useState, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import useAppointmentService from "../../services/AppointmentService";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
interface IModalProps {
    handleClose: (state: boolean) => void;
    selectedId: number;
    isOpen: boolean;
}

const CancelModal: React.FC<IModalProps> = ({
    handleClose,
    selectedId,
    isOpen,
}) => {
    const { cancelOneAppointment } = useAppointmentService();
    const { getActiveAppointments } = useContext(AppointmentContext);

    const nodeRef = useRef<HTMLDivElement>(null);
    const cancelStatusRef = useRef<boolean | null>(null);

    const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
    const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

    const handleCancelAppointment = (id: number) => {
        setBtnDisabled(true);
        cancelOneAppointment(id)
            .then(() => {
                setCancelStatus(true);
            })
            .catch(() => {
                setCancelStatus(false);
                setBtnDisabled(false);
            });
    };

    const closeModal = () => {
        handleClose(false);
        setCancelStatus(null);
        setBtnDisabled(false);
        if (cancelStatus || cancelStatusRef.current) {
            getActiveAppointments();
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            closeModal();
        }
    };

    useEffect(() => {
        cancelStatusRef.current = cancelStatus;
    }, [cancelStatus]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleClose, cancelStatus]);

    return (
        <Portal>
            <CSSTransition
                in={isOpen}
                timeout={{ enter: 500, exit: 500 }}
                unmountOnExit
                classNames="modal"
                nodeRef={nodeRef}
            >
                <div className="modal" ref={nodeRef}>
                    <div className="modal__body">
                        <span className="modal__title">
                            Are you sure you want to delete the appointment? #
                            {selectedId}
                        </span>
                        <div className="modal__btns">
                            <button
                                disabled={btnDisabled}
                                className="modal__ok"
                                onClick={() =>
                                    handleCancelAppointment(selectedId)
                                }
                            >
                                Ok
                            </button>
                            <button
                                className="modal__close"
                                onClick={() => closeModal()}
                            >
                                Close
                            </button>
                        </div>
                        <div className="modal__status">
                            {cancelStatus === null
                                ? ""
                                : cancelStatus
                                ? "Success"
                                : "Error, try again"}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </Portal>
    );
};

export default CancelModal;
