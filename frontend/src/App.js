import React, { Suspense } from "react";
import "./pages/landingPage/LandingPage.css";
import "./App.css";
import Loader from "./components/loader/Loader";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

const LandingPage = React.lazy(() => import("./pages/landingPage/LandingPage"));
const BookingCreatedPage = React.lazy(() =>
  import("./pages/bookingCreatedPage/BookingCreatedPage")
);

function App() {
  return (
    <div className="app">
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} exact />
            <Route
              path="/booking/success"
              element={<BookingCreatedPage />}
              exact
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
