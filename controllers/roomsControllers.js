const { pool } = require("../config/pgconfig");
const {
  listRooms,
  getRoomId,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../queries/queries");

// GET ROOMS
const getRooms = async (req, res) => {
  const client = await pool.connect();

  try {
    const response = await client.query(listRooms);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const getRoomById = async (req, res) => {
  const client = await pool.connect();
  const requiredId = req.params.id;

  try {
    const response = await client.query(getRoomId, [requiredId]);
    if (response.rows.length === 0) {
      res
        .status(200)
        .json({ response: true, message: "This room is not exists" });
    } else {
      res.status(200).json({ response: true, result: response.rows });
    }
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const createNewRoom = async (req, res) => {
  const { name, tv, air_conditioning } = req.body;
  const client = await pool.connect();

  try {
    const response = await client.query(createRoom, [
      name,
      tv,
      air_conditioning,
    ]);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const updateRoomById = async (req, res) => {
  const client = await pool.connect();
  const { name, tv, air_conditioning } = req.body;
  const requiredId = req.params.id;

  try {
    const response = await client.query(updateRoom, [
      name,
      tv,
      air_conditioning,
      requiredId,
    ]);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const deleteRoomById = async (req, res) => {
  const client = await pool.connect();
  const requiredId = req.params.id;

  try {
    const response = await client.query(deleteRoom, [requiredId]);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

module.exports = {
  getRooms,
  getRoomById,
  createNewRoom,
  updateRoomById,
  deleteRoomById,
};
