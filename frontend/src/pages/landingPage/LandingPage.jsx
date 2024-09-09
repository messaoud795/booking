import React, { useEffect, useState } from "react";
import { arePropsEqual, getNextDay } from "../../utils/utils";
import Loader from "../../components/loader/Loader";
import { Helmet } from "react-helmet";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { loadAvailableTimeslots } from "../../actions/bookingsActions";
import { useNavigate } from "react-router-dom";
import { isObject } from "lodash";
import CreateBookingModal from "../../components/createBookingModal/CreateBookingModal";

const localizer = momentLocalizer(moment);

const LandingPage = () => {
  const { loading_new_booking, available_timeslots, newBooking } = useSelector(
    (state) => state.bookings
  );
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [visibleRange, setVisibleRange] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (visibleRange) {
      dispatch(loadAvailableTimeslots(visibleRange));
    }
  }, [visibleRange, dispatch]);

  useEffect(() => {
    if (isObject(newBooking)) {
      navigate("/booking/success");
    }
  }, [navigate, newBooking]);

  const handleRangeChange = (range) => {
    if (Array.isArray(range)) {
      let start;
      let end;
      if (range.length === 1) {
        start = range[0];
        end = getNextDay(start);
      } else if (range.length > 1) {
        start = range[0];
        end = getNextDay(range.at(-1));
      }
      setVisibleRange({ start, end });
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowCreateModal(true);
  };

  return (
    <div className="landing-page">
      <Helmet>
        <title>Booking</title>
        <meta name="description" content="book your vacation with Laser game" />
      </Helmet>
      <h1 className="page-title">book your vacation</h1>
      {loading_new_booking ? (
        <Loader />
      ) : (
        <div>
          <div style={{ height: 500 }}>
            <Calendar
              localizer={localizer}
              events={available_timeslots}
              startAccessor="start"
              endAccessor="end"
              selectable={false}
              style={{ height: "100%" }}
              onSelectEvent={handleSelectEvent} // Allow only event selection
              onRangeChange={handleRangeChange} // Capture the visible date range
            />
          </div>
          {selectedEvent && (
            <CreateBookingModal
              setShow={setShowCreateModal}
              show={showCreateModal}
              selectedEvent={selectedEvent}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(LandingPage, arePropsEqual);
