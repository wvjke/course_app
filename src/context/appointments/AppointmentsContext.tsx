/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useReducer } from "react";
import { IInitialState } from "./reducer";
import reducer from "./reducer";
import { ActionsTypes } from "./actions";
import useAppointmentService from "../../services/AppointmentService";

const initialState: IInitialState = {
    allAppointments: [],
    allActiveAppointments: [],
    loadingStatus: "idle",
};

interface ProviderProps {
    children: React.ReactNode;
}

interface AppointmentContextValue extends IInitialState {
    getAppointments: () => void;
    getActiveAppointments: () => void;
}

export const AppointmentContext = createContext<AppointmentContextValue>({
    allAppointments: initialState.allAppointments,
    allActiveAppointments: initialState.allActiveAppointments,
    loadingStatus: initialState.loadingStatus,
    getAppointments: () => {},
    getActiveAppointments: () => {},
});

const AppointmentContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loadingStatus, getAllAppointments, getAllActiveAppointments } =
        useAppointmentService();

    const value: AppointmentContextValue = {
        allAppointments: state.allAppointments,
        allActiveAppointments: state.allActiveAppointments,
        loadingStatus,
        getAppointments: () => {
            getAllAppointments().then((data) =>
                dispatch({
                    type: ActionsTypes.SET_ALL_APPOINTMENTS,
                    payload: data,
                })
            );
        },
        getActiveAppointments: () => {
            getAllActiveAppointments().then((data) =>
                dispatch({
                    type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
                    payload: data,
                })
            );
        },
    };

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
};

export default AppointmentContextProvider;
