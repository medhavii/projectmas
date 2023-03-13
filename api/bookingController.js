import connection from '../connection.js';

const bookSlot = (req, res) => {
  try {
    const { user_id, slot_id } = req.body;

    const checkQuery = `SELECT id FROM bookings WHERE user_id=${user_id} AND slot_id=${slot_id};`;
    connection.query(checkQuery, (checkError, checkResult) => {
      if (checkError) throw checkError;

      if (checkResult.length) {
        res.send('Slot already booked.');
      } else {
        const bookQuery = `INSERT INTO bookings (user_id, slot_id) VALUES (${user_id}, ${slot_id});`;
        connection.query(bookQuery, (bookError, bookResult) => {
          if (bookError) throw bookError;

          res.send('Slot booked successfully.');
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const cancelSlot = (req, res) => {
  try {
    const { user_id, slot_id } = req.body;

    const checkQuery = `SELECT id FROM bookings WHERE user_id=${user_id} AND slot_id=${slot_id};`;
    connection.query(checkQuery, (checkError, checkResult) => {
      if (checkError) throw checkError;

      if (checkResult.length) {
        const cancelQuery = `DELETE FROM bookings WHERE user_id=${user_id} AND slot_id=${slot_id};`;
        connection.query(cancelQuery, (cancelError, cancelResult) => {
          if (cancelError) throw cancelError;

          res.send('Slot booking canceled.');
        });
      } else {
        res.send('No booking found for the given user and slot.');
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export default {
  bookSlot,
  cancelSlot,
};
