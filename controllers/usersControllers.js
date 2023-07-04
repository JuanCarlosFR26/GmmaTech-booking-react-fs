const { pool } = require("../config/pgconfig");
const {
  listUsers,
  createUser,
  updateUser,
  deleteReservationWithIdUser,
  deleteUser,
  getUserIdByName,
} = require("../queries/queries");

// GET ALL USERS
const getUsers = async (req, res) => {
  const client = await pool.connect();

  try {
    const response = await client.query(listUsers);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

// GET USER ID
const getUserIdWithUserEmail = async (req, res) => {
  const client = await pool.connect();
  const requiredEmail = req.params.email;

  try {
    const response = await client.query(getUserIdByName, [requiredEmail]);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

// CREATE NEW USER
const createNewUser = async (req, res) => {
  const { name } = req.body;
  const client = await pool.connect();

  try {
    const response = await client.query(createUser, [name]);
    res.status(200).json({ response: true, result: response.rows });
    console.log("User registered");
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

// UPDATE USER BY ID
const updateUserById = async (req, res) => {
  const client = await pool.connect();
  const { name } = req.body;
  const requiredId = req.params.id;

  try {
    const response = await client.query(updateUser, [name, requiredId]);
    res.status(200).json({ response: true, result: response.rows });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

const deleteUserById = async (req, res) => {
  const client = await pool.connect();
  const requiredId = req.params.id;

  const userQuery = getUserIdByName;
  const userResult = await client.query(userQuery, [requiredId]);
  if (userResult.rows.length === 0) {
    return res.status(404).json({ error: "Este usuario no existe" });
  }

  try {
    const deleteReservationsQuery = deleteReservationWithIdUser;
    const deleteUserQuery = deleteUser;
    await client.query(deleteReservationsQuery, [requiredId]);
    await client.query(deleteUserQuery, [requiredId]);
    res
      .status(200)
      .json({ response: "Usuario y sus reservas eliminados correctamente" });
  } catch (error) {
    res.status(400).json({ response: false, error: error.message });
  } finally {
    client.release(true);
  }
};

module.exports = {
  getUsers,
  getUserIdWithUserEmail,
  createNewUser,
  updateUserById,
  deleteUserById,
};
