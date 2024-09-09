import {
  GET_AVAILABLE_TIMESLOTS_REQUEST,
  GET_AVAILABLE_TIMESLOTS_SUCCESS,
  GET_AVAILABLE_TIMESLOTS_FAIL,
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_FAIL,
  RESET_NEW_BOOKING,
} from "../constants/bookingsConstants";
import { convertToLocalTime } from "../utils/utils";

export const bookingsReducer = (
  state = {
    available_timeslots: [],
    loading_available_timeslots: false,
    loading_new_booking: false,
    error: null,
    newBooking: null,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case GET_AVAILABLE_TIMESLOTS_REQUEST:
      return { ...state, loading: true, error: null, newBooking: null };
    case GET_AVAILABLE_TIMESLOTS_SUCCESS:
      const events = payload.map((event) => ({
        title: "Available",
        start: convertToLocalTime(event.start),
        end: convertToLocalTime(event.end),
      }));
      return {
        loading: false,
        available_timeslots: events,
        error: null,
      };
    case GET_AVAILABLE_TIMESLOTS_FAIL:
      return { loading: false, error: payload };

    case CREATE_BOOKING_REQUEST:
      return { ...state, loading_new_booking: true, error: null };
    case CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        loading_new_booking: false,
        newBooking: payload.booking,
        error: null,
      };
    case CREATE_BOOKING_FAIL:
      return { ...state, loading_new_booking: false, error: payload };

    case RESET_NEW_BOOKING:
      return { ...state, newBooking: null };

    default:
      return state;
  }
};
