//  =================== GETS ========================
const listUsers = `SELECT * FROM users`;
const listRooms = `SELECT * FROM rooms`;
const getRoomId = `SELECT * FROM rooms WHERE room_id = $1`;
const getUserIdByName = `SELECT user_id FROM users WHERE users.name = $1`;
const listReservations = `SELECT reservations.reservation_id, reservations.room_id, reservations.user_id, TO_CHAR(reservations.time_start, 'YYYY-MM-DD HH24:MI') AS time_start, TO_CHAR(reservations.time_end, 'YYYY-MM-DD HH24:MI') AS time_end, rooms.room_name, users.name FROM reservations JOIN rooms ON reservations.room_id = rooms.room_id JOIN users ON reservations.user_id = users.user_id`;
const getReservationsByUserID = `SELECT reservation_id, room_id, users.user_id, TO_CHAR(time_start, 'YYYY-MM-DD HH24:MI') AS time_start, TO_CHAR(time_end, 'YYYY-MM-DD HH24:MI') AS time_end FROM reservations
INNER JOIN users ON reservations.user_id = users.user_id
WHERE users.name = $1`;
const getAllUserById = `SELECT * FROM users WHERE user_id = $1`;
const getAllRoomById = `SELECT * FROM rooms WHERE room_id = $1`;

// ------------- POST ---------------------------
const createRoom = `INSERT INTO rooms (name, tv, air_conditioning) VALUES ($1, $2, $3)`;
const createUser = `INSERT INTO users (name) VALUES ($1)`;
const createReservation = `INSERT INTO reservations (user_id, room_id, time_start, time_end) VALUES ($1, $2, TO_TIMESTAMP($3, 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP($4, 'YYYY-MM-DD HH24:MI')) RETURNING *`;

// -------------- PATCH -------------------------------------
const updateRoom = `UPDATE rooms SET name = $1, tv = $2, air_conditioning = $3 WHERE room_id = $4`;
const updateUser = `UPDATE users SET name = $1 WHERE user_id = $2`;
const updateReservation = `UPDATE reservations SET user_id = $1, room_id = $2, time_start = $3::timestamp, time_end = $4::timestamp WHERE reservation_id = $5`;

// ---------------- DELETE ----------------------------------
const deleteReservation = `DELETE FROM reservations WHERE reservation_id = $1`;
const deleteUser = `DELETE FROM users WHERE user_id = $1`;
const deleteReservationWithIdUser = `DELETE FROM reservations WHERE user_id = $1`;
const deleteRoom = `DELETE FROM rooms WHERE room_id = $1`;

module.exports = {
  listUsers,
  listRooms,
  listReservations,
  getReservationsByUserID,
  getUserIdByName,
  createRoom,
  createUser,
  createReservation,
  updateRoom,
  updateUser,
  updateReservation,
  deleteReservation,
  deleteUser,
  deleteReservationWithIdUser,
  deleteRoom,
  getRoomId,
  getAllUserById,
  getAllRoomById,
};
