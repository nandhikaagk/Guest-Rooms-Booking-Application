
**Frontend Installable package:**
├── @testing-library/jest-dom@5.17.0
├── @testing-library/react@13.4.0
├── @testing-library/user-event@13.5.0
├── antd@5.19.1
├── axios@1.7.2
├── bootstrap@5.3.3
├── moment@2.30.1
├── react-bootstrap@2.10.4
├── react-datepicker@7.3.0
├── react-dom@18.3.1
├── react-router-dom@6.24.1
├── react-scripts@5.0.1
├── react-spinners@0.14.1
├── react@18.3.1
├── sweetalert2@11.12.2
└── web-vitals@2.1.4
**Backend Installable Package:**
guestroombookings@1.0.0 E:\GuestRoomBookings
├── cors@2.8.5
├── express@4.19.2
├── mongoose@8.4.4
├── multer@1.4.5-lts.1
├── nodemon@3.1.4
└── router@1.3.8
**Project Name:**
         Guest Room Booking Application
**Project Description:**
            Provide a platform where customers can browse, view details, check availability, and book rooms from different house owners.
            User Types: House owners, customers.
    
** Database Schema and Sample Data**
##Database Schema
Schema for Guest Room Booking Application
1.Users Collection-Stores information about the customer.
2.Housowners Collection-Stores information about the houseowner.
3.Room Collection-Stores information about the rooms.
4.Bookings Collection-Stores information about the booking details.

**Users Collection Schema**
```json
{
  "_id": "ObjectId",
  "name":"String",
  "email": "String",
  "password": "String",
}
```
**Houseowners Collection Schema**
```json
{
  "_id": "ObjectId",
  "name":"String",
  "email": "String",
  "password": "String",
}
```
**Room Collection Schema**
```json
{
  "_id": "ObjectId",
  "hoursownerid":"ObjectId",
  "name":"String",
  "maxcount":"Number",
  "floor":"String",
  "beds":"Number",
  "Amenities":"String",
  "phone":"Number"
  "rentperday":"Number",
  "location":"String",
  "imageurl":"String",
  "type":"String",
  "minstay":"Number",
  "maxstay":"Number",
  "Description":"String",
}
```
**Bookings Collection Schema**
```json
{
  "_id": "ObjectId",
  "room":"String",
  "roomid":"String",
  "userid":"String",
  "fromdate":"String",
  "todate":"String",
  "totalAmout":"Number",
  "totalDays":"Number",
  "status":"String"
}
```
###Sample Data
**Sample data for User Collection**
```json
[
  {
   "_id": "6690bd779350fa2fb2ad9ae4",
  "name":"Nandhikaagk",
  "email": "nandhikaagk@gmail.com",
  "password": "Nandhi@23",
  }
 
]
```
**Sample data for Houseowners Collection**
```json
[
 {
   "_id": "668e10ed160d1d4857be9cda",
   "name":"guru",
   "email": "guru@gmail.com",
   "password": "guru123",
  }
 
]
```
**Sample data for Rooms Collection**
```json
[
  {
   "_id": "6690020c3143cdefa3100993",
  "hoursownerid":"668fff9d3143cdefa3100990",
  "name":"MoonGate Stay",
  "maxcount":1,
  "floor":"3rd floor",
  "beds":4,
  "Amenities":"wifi,Ac",
  "phone":8756356789
  "rentperday":1000
  "location":"9/4 Gandhi Nagar,Chennai",
  "imageurl":"https://plus.unsplash.com/premium_photo-1663126637580-ff22a73f9bfc?w=5",
  "type":"Delux",
  "minstay":1,
  "maxstay":14,
  "Description":"Eco building, solar energy, zero waste, well located",
  }
 
]
```
**Sample data for Bookings Collection**
```json
[
 {
  "_id": "6690bdda9350fa2fb2ad9b15",
  "room":"Krishna Guest House",
  "roomid":"668f9ec23143cdefa31007ef",
  "userid":"6690bd779350fa2fb2ad9ae4",
  "fromdate":"25-07-2024",
  "todate":"27-07-2024",
  "totalAmout":3000,
  "totalDays":3,
  "status":"Booked"
 }
 
]
```






