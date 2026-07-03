import { Routes, Route } from "react-router-dom";

import Welcome from "./Pages/Welcome";
import Login from "./Pages/Login";
import CreateAccount from "./Pages/CreateAccount";
import AccountSettings from "./Pages/AccountSettings";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="mobile-container">
      <Routes>

        <Route path="/" element={<Welcome />} />

        <Route path="/login" element={<Login />} />

        <Route path="/create" element={<CreateAccount />} />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;