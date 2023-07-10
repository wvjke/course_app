import { AppointmentAction } from "./actions";
import {
    IAppointment,
    ActiveAppointment,
} from "../../shared/interfaces/appointment.interface";
import { ActionsTypes } from "./actions";
import { loadingStatusType } from "../../hooks/http.hook";
export interface IInitialState {
    allAppointments: IAppointment[] | [];
    allActiveAppointments: ActiveAppointment[] | [];
    loadingStatus: loadingStatusType;
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
        default:
            return state;
    }
}
