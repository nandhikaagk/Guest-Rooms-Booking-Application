import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookRoom from '../components/BookRoom';
import Loader from '../components/Loader';
import { DatePicker } from 'antd';
import moment from 'moment';
import '../pages/Main.css'

const Main = () => {
  const { RangePicker } = DatePicker;
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fromdate, setFromDate] = useState();
  const [todate, setToDate] = useState();
  const [duplicaterooms, setDuplicateRooms] = useState([]);
  const [searchkey, setsearchkey] = useState('')


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get('/api/rooms/getallrooms');
        setRooms(response.data);
        setDuplicateRooms(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  function filterByDate(dates) {
    if (!dates || dates.length !== 2) {
      console.log('Date range cleared');
      setFromDate(null);
      setToDate(null);
      setRooms(duplicaterooms);
      return;
    }

    const startDate = dates[0].toDate();
    const endDate = dates[1].toDate();


    const formattedStartDate = `${String(startDate.getDate()).padStart(2, '0')}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${startDate.getFullYear()}`;
    const formattedEndDate = `${String(endDate.getDate()).padStart(2, '0')}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${endDate.getFullYear()}`;
    setFromDate(formattedStartDate);
    setToDate(formattedEndDate);


    const filteredRooms = duplicaterooms.filter(room => {
      let isAvailable = true;
      for (const booking of room.curbooking) {
        const bookingStartDate = moment(booking.fromdate, 'DD-MM-YYYY');
        const bookingEndDate = moment(booking.todate, 'DD-MM-YYYY');


        if (
          moment(startDate).isBetween(bookingStartDate, bookingEndDate, null, '[]') ||
          moment(endDate).isBetween(bookingStartDate, bookingEndDate, null, '[]') ||
          moment(startDate).isSame(bookingStartDate, 'day') ||
          moment(endDate).isSame(bookingEndDate, 'day')
        ) {
          isAvailable = false;
          break;
        }
      }
      return isAvailable;
    });

    setRooms(filteredRooms);
  }

  function filterBysearch() {
    const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setRooms(temprooms)
  }

  return (
    <div className='main-container'>
      <div className='row mt-3 '>
        <div className='col md-3'>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
        <div className='col-md-3'>
          <input type="text" className='form-control'
            value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBysearch} placeholder='Search Rooms' />

        </div>

      </div>
      <br />
      <div className="content-wrapper">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => (
            <div className='room-card' key={room._id}>
              <BookRoom room={room} fromdate={fromdate} todate={todate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Main;
