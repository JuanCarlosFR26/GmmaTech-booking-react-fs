const { pool } = require("../config/pgconfig");
const {
  listReservations,
  getReservationsByUserID,
  updateReservation,
  deleteReservation,
  getAllUserById,
  getAllRoomById,
  createReservation,
  existingReservation,
} = require("../queries/queries");

const getReservations = async (req, res) => {
  const client = await pool.connect();

  try {
    const response = await client.query(listReservations);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const createNewReservation = async (req, res) => {
  const client = await pool.connect();
  const { user_id, room_id, time_start, time_end } = req.body;

  try {
    const existsReservation = await pool.query(existingReservation, [
      room_id,
      time_start,
      time_end,
    ]);

    if (existsReservation.rows.length > 0) {
      return res.status(400).json({ error: "El horario está ocupado." });
    }
    
    const response = await client.query(getAllUserById, [user_id]);
    if (response.rows.length === 0) {
      return res.status(400).json({ error: "this user is not exists" });
    }
    const responseRoom = await client.query(getAllRoomById, [room_id]);
    if (responseRoom.rows.length === 0) {
      return res.status(400).json({ error: "this room is not exists" });
    }
    const finalResponse = await client.query(createReservation, [
      user_id,
      room_id,
      time_start,
      time_end,
    ]);
    res.status(201).json({ response: true, result: finalResponse.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const getReservationsFromUserId = async (req, res) => {
  const client = await pool.connect();
  const requiredEmail = req.params.email;

  try {
    const response = await client.query(getReservationsByUserID, [
      requiredEmail,
    ]);
    if (response.rows.length === 0) {
      res.status(200).json({
        response: true,
        message: "This user doesn't have reservation",
      });
    } else {
      res.status(200).json({ response: true, result: response.rows });
    }
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const updateReservationById = async (req, res) => {
  const client = await pool.connect();
  const { user_id, room_id, time_start, time_end } = req.body;
  const requiredId = req.params.id;

  try {
    const response = await client.query(updateReservation, [
      user_id,
      room_id,
      time_start,
      time_end,
      requiredId,
    ]);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const deleteReservationById = async (req, res) => {
  const client = await pool.connect();
  const requiredId = req.params.id;

  try {
    const response = await client.query(deleteReservation, [requiredId]);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

module.exports = {
  getReservations,
  getReservationsFromUserId,
  updateReservationById,
  deleteReservationById,
  createNewReservation,
};
