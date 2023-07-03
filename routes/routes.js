const express = require("express");
const { getUsers, createNewUser, updateUserById, deleteUserById } = require("../controllers/usersControllers");
const { getRooms, getRoomById, createNewRoom, updateRoomById, deleteRoomById } = require("../controllers/roomsControllers");
const { getReservations, getReservationsFromUserId, createNewReservation, updateReservationById, deleteReservationById } = require("../controllers/reservationsControllers");
const router = express.Router();

// USERS
router.get('/users', getUsers);
router.post('/user/create', createNewUser);
router.patch('/user/update/:id', updateUserById);
router.delete('/user/delete/:id', deleteUserById);

// ROOMS
router.get('/rooms', getRooms);
router.get('/room/:id', getRoomById);
router.post('/room/create', createNewRoom);
router.patch('/room/update/:id', updateRoomById);
router.delete('/room/delete/:id', deleteRoomById);

// RSERVATIONS
router.get('/reservations', getReservations);
router.get('/reservations/user/:id', getReservationsFromUserId);
router.post('/reservation/create', createNewReservation);
router.patch('/reservation/update/:id', updateReservationById);
router.delete('reservation/delete/:id', deleteReservationById);

module.exports = router;