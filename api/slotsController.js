import connection from "../connection.js";

const addSlots = (req, res) => {
  try {
    const { slot_date, slot_time, address, name, count } = req.body;

    // Check if all required fields are present
    if (!slot_date || !slot_time || !address || !name) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Please provide all required fields.",
        });
    }

    const addQuery = `INSERT INTO slots (slot_date, slot_time, address, name, available, count) VALUES ('${slot_date}', '${slot_time}', '${address}', '${name}', true, ${count});`;
    connection.query(addQuery, (addError, addResult) => {
      if (addError) throw addError;

      res.send({ success: true, message: "Slot added successfully." });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
const updateSlots = (req, res) => {
  try {
    const { id } = req.params;
    const { slot_date, slot_time, address, name } = req.body;

    // Check if all required fields are present
    if (!slot_date || !slot_time || !address || !name) {
      return res.status(400).send("Please provide all required fields.");
    }

    const updateQuery = `UPDATE slots SET slot_date='${slot_date}', slot_time='${slot_time}', address='${address}', name='${name}' WHERE id=${id};`;
    connection.query(updateQuery, (updateError, updateResult) => {
      if (updateError) throw updateError;

      // Check if the slot exists
      if (updateResult.affectedRows === 0) {
        return res.status(404).send("Slot not found.");
      }

      res.send("Slot updated successfully.");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteSlots = (req, res) => {
  try {
    const { id } = req.params;

    const deleteQuery = `DELETE FROM slots WHERE id=${id};`;
    connection.query(deleteQuery, (deleteError, deleteResult) => {
      if (deleteError) throw deleteError;

      // Check if the slot exists
      if (deleteResult.affectedRows === 0) {
        return res.status(404).send("Slot not found.");
      }

      res.send("Slot deleted successfully.");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getSlots = (req, res) => {
  try {
    const getAllQuery = `SELECT * FROM slots;`;
    connection.query(getAllQuery, (getAllError, getAllResult) => {
      if (getAllError) throw getAllError;

      res.send(getAllResult);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};



export default {
  addSlots,
  getSlots,
  updateSlots,
  deleteSlots,
};
