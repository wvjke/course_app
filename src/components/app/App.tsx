import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
// import HistoryPage from "../../pages/history/HistoryPage";
// import CancelModal from "../modal/CancelModal";
import AppointmentContextProvider from "../../context/appointments/AppointmentsContext";

import "./app.scss";

function App() {
    return (
        <main className="board">
            <Header />
            <AppointmentContextProvider>
                <SchedulePage />
                {/* <HistoryPage /> */}
                {/* <CancelModal /> */}
            </AppointmentContextProvider>
        </main>
    );
}

export default App;
