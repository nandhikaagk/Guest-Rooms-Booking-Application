import Swal from 'sweetalert2';
import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";
import { Tag } from 'antd';
function Bookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id });
        const rooms = response.data;
        console.log(rooms);
        setBookings(rooms);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };

    fetchBookings();
  }, [user._id]);

  async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true);
      const result = await axios.post('/api/bookings/cancelbooking', { bookingid, roomid });
      console.log(result);


      setBookings(prevBookings =>
        prevBookings.filter(booking => booking._id !== bookingid)
      );

      setLoading(false);
      Swal.fire('Congrats', 'Your booking has been cancelled', 'success');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      Swal.fire('Oops', 'Something went wrong', 'error');
    }
  }

  return (
    <div className="bookings-container">
      <h1>My Bookings</h1>
      <div className="bookings-list">
        {loading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
        {error && (
          <div className="error-container">
            <Error />
          </div>
        )}
        {bookings && bookings.map(booking => (
          <div className="booking-item" key={booking._id}>
            <h1>Room: {booking.room}</h1>
            <h1>BookingId: {booking._id}</h1>
            <h1>FromDate: {booking.fromdate}</h1>
            <h1>ToDate: {booking.todate}</h1>
            <h1>Amount: {booking.totalAmount}</h1>
            <h1>Status: <span className={booking.status === 'booked' ? 'status-confirmed' : 'status-cancelled'}>
              {booking.status === 'cancelled' ? (<Tag color="red">Cancelled</Tag>) : (<Tag color="green">Confirmed</Tag>)}
            </span></h1>
            {booking.status !== 'cancelled' && (
              <div>
                <center><button className='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.roomid) }}>Cancel Booking</button></center>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
