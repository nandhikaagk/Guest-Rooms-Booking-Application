import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
const BookPage = () => {
  const { roomid, fromdate, todate } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    if (!localStorage.getItem('currentUser')) {
      window.location.href = '/login';
    }
    const fetchRoom = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.post('/api/rooms/getroombyid', { roomid });
        setRoom(response.data);
        setLoading(false);
        const fromDate = parseDate(fromdate);
        const toDate = parseDate(todate);
        const days = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24) + 1);
        setTotalDays(days);
        setTotalAmount(days * response.data.rentperday);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error('Error fetching room:', error);
      }
    };

    if (roomid) {
      fetchRoom();
    }
  }, [roomid, fromdate, todate]);

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: user._id,
      fromdate,
      todate,
      totalAmount,
      totalDays,
      transactionId: 'someTransactionId'
    };

    try {
      const result = await axios.post('/api/bookings/bookroom', bookingDetails);
      console.log('Booking successful:', result.data);
      setBookingSuccess(true);

    } catch (error) {
      console.error('Error booking room:', error);
    }
  }

  if (loading) {
    return <h1><Loader /></h1>;
  }

  if (error) {
    return <h1><Error /></h1>;
  }

  return (
    <div className='book-page-container'>
      {room ? (
        <div className='row justify-content-center mt-5 box-shadow'>
          <div className='col-md-5 room-details'>
            <h3>{room.name}</h3><br />
            <img src={room.imageurl[0]} alt="Room" className='bigimg' />
          </div>
          <div className='col-md-5 booking-details'>
            <h1 style={{ textAlign: 'left' }}>Booking Details</h1>
            <hr />
            <b>
              <p>Name: {user ? user.name : 'Guest'}</p>
              <p>From Date: {fromdate} </p>
              <p>To Date: {todate} </p>
              <p>Max Count: {room.maxcount}</p>
            </b>
            <div style={{ textAlign: 'left' }}>
              <h1>Amount</h1>
              <hr />
              <b>
                <p>Total Days: {totalDays}</p>
                <p>Rent Per Day: {room.rentperday}</p>
                <p>Total Amount: {totalAmount}</p>
              </b>
            </div>
            <div>
              <button className='btn btn-success' onClick={bookRoom}>Book Here</button>
            </div>
          </div>
        </div>
      ) : (
        <h1>No room details available.</h1>
      )}
      {bookingSuccess && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Booked Successfully!!!</h5>
                <button type="button" className="close" onClick={() => { setBookingSuccess(false); window.location.href = '/bookings'; }} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Your booking for {room.name} from {fromdate} to {todate} has been confirmed.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => { setBookingSuccess(false); window.location.href = '/bookings'; }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookPage;
