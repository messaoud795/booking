import { isObject } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RESET_NEW_BOOKING } from "../../constants/bookingsConstants";
import "./BookingCreatedPage.css";
import { formatDateForUserDispaly } from "../../utils/utils";
import BackArrow from "../../assets/icons/BackArrow";
import { Helmet } from "react-helmet";

const BookingCreatedPage = () => {
  const [booking, setBooking] = useState(null);
  const { newBooking } = useSelector((state) => state.bookings);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isObject(newBooking)) {
      setBooking(newBooking);
      dispatch({ type: RESET_NEW_BOOKING });
    }
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div className="booking-created-page">
      <Helmet>
        <title>Success</title>
        <meta
          name="description"
          content="new booking is created successfully"
        />
      </Helmet>
      {booking && (
        <div className="booking-container">
          <h1 className="booking-title">
            {`Congratulations ${booking?.username}!`}
          </h1>
          <div className="booking-content">
            <span>You have successfully booked your activity :</span>
            <ul>
              <li>{`Start at ${formatDateForUserDispaly(
                booking?.startDate
              )}`}</li>
              <li>{`End at ${formatDateForUserDispaly(booking?.endDate)}`}</li>
            </ul>
          </div>
        </div>
      )}
      <button className="back-btn" onClick={() => navigate("/")}>
        <BackArrow />
        Back to calendar
      </button>
    </div>
  );
};

export default BookingCreatedPage;
