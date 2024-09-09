import axios from "axios";
import {
  GET_AVAILABLE_TIMESLOTS_REQUEST,
  GET_AVAILABLE_TIMESLOTS_SUCCESS,
  GET_AVAILABLE_TIMESLOTS_FAIL,
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_FAIL,
} from "../constants/bookingsConstants";
import { config } from "./requestHeadersConfig";
import { formatDateToISO8601, toastEmitter } from "../utils/utils";

export const loadAvailableTimeslots = (range) => async (dispatch) => {
  try {
    dispatch({
      type: GET_AVAILABLE_TIMESLOTS_REQUEST,
    });
    const start = formatDateToISO8601(range.start);
    const end = formatDateToISO8601(range.end);

    const { data } = await axios.get(
      `/api/available-timeslots?startDate=${start}&endDate=${end}`
    );

    dispatch({
      type: GET_AVAILABLE_TIMESLOTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toastEmitter("Error loading timesolts", "error");
    dispatch({ type: GET_AVAILABLE_TIMESLOTS_FAIL, payload: error });
  }
};

export const createBooking = (booking) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_BOOKING_REQUEST,
    });
    const { data } = await axios.post("/api/booking/create", booking, config);

    dispatch({
      type: CREATE_BOOKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toastEmitter("Error creating new booking", "error");
    dispatch({ type: CREATE_BOOKING_FAIL, payload: error });
  }
};
