import { AppointmentAction } from "./actions";
import {
    IAppointment,
    ActiveAppointment,
} from "../../shared/interfaces/appointment.interface";
import { ActionsTypes } from "./actions";
import { loadingStatusType } from "../../hooks/http.hook";
import { LooseValue } from "react-calendar/dist/cjs/shared/types";
export interface IInitialState {
    allAppointments: IAppointment[] | [];
    allActiveAppointments: ActiveAppointment[] | [];
    loadingStatus: loadingStatusType;
    calendarDate: LooseValue;
}

export default function reducer(
    state: IInitialState,
    action: AppointmentAction
) {
    switch (action.type) {
        case ActionsTypes.SET_ALL_APPOINTMENTS:
            return { ...state, allAppointments: action.payload };
        case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
            return { ...state, allActiveAppointments: action.payload };
        case ActionsTypes.SET_CALENDAR_DATE:
            return { ...state, calendarDate: action.payload };
        default:
            return state;
    }
}
