/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useReducer } from "react";
import { loadingStatusType } from "../../hooks/http.hook";
import { IInitialState } from "./reducer";
import reducer from "./reducer";
import { ActionsTypes } from "./actions";
import useAppointmentService from "../../services/AppointmentService";
import { Value } from "react-calendar/dist/cjs/shared/types";
const initialState: IInitialState = {
    allAppointments: [],
    allActiveAppointments: [],
    calendarDate: [null, null],
};

interface ProviderProps {
    children: React.ReactNode;
}

interface AppointmentContextValue extends IInitialState {
    getAppointments: () => void;
    getActiveAppointments: () => void;
    setDateAndFilter: (newDate: Value) => void;
    loadingStatus: loadingStatusType;
}

export const AppointmentContext = createContext<AppointmentContextValue>({
    allAppointments: initialState.allAppointments,
    allActiveAppointments: initialState.allActiveAppointments,
    loadingStatus: "idle",
    calendarDate: initialState.calendarDate,
    getAppointments: () => {},
    getActiveAppointments: () => {},
    setDateAndFilter: () => {},
});

const AppointmentContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loadingStatus, getAllAppointments, getAllActiveAppointments } =
        useAppointmentService();

    const value: AppointmentContextValue = {
        allAppointments: state.allAppointments,
        allActiveAppointments: state.allActiveAppointments,
        calendarDate: state.calendarDate,
        loadingStatus,
        getAppointments: () => {
            getAllAppointments()
                .then((data) => {
                    const filteredData = data.filter((item) => {
                        if (
                            Array.isArray(state.calendarDate) &&
                            state.calendarDate[0] &&
                            state.calendarDate[1]
                        ) {
                            if (
                                new Date(item.date).getTime() >=
                                    new Date(state.calendarDate[0]).getTime() &&
                                new Date(item.date).getTime() <=
                                    new Date(state.calendarDate[1]).getTime()
                            ) {
                                return item;
                            }
                        } else {
                            return item;
                        }
                    });

                    dispatch({
                        type: ActionsTypes.SET_ALL_APPOINTMENTS,
                        payload: filteredData,
                    });
                })
                .catch(() => {
                    alert("Error fetching appointments");
                });
        },
        getActiveAppointments: () => {
            getAllActiveAppointments()
                .then((data) => {
                    const filteredData = data.filter((item) => {
                        if (
                            Array.isArray(state.calendarDate) &&
                            state.calendarDate[0] &&
                            state.calendarDate[1]
                        ) {
                            if (
                                new Date(item.date).getTime() >=
                                    new Date(state.calendarDate[0]).getTime() &&
                                new Date(item.date).getTime() <=
                                    new Date(state.calendarDate[1]).getTime()
                            ) {
                                return item;
                            }
                        } else {
                            return item;
                        }
                    });

                    dispatch({
                        type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
                        payload: filteredData,
                    });
                })
                .catch(() => {
                    alert("Error fetching appointments");
                });
        },
        setDateAndFilter: (newDate: Value) => {
            dispatch({
                type: ActionsTypes.SET_CALENDAR_DATE,
                payload: newDate,
            });
        },
    };

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
};

export default AppointmentContextProvider;
