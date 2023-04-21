import connection from "../connection.js";

const bookSlot = (req, res) => {
  try {
    const { slot_id, number } = req.body;
    console.log(`slot_id: ${slot_id}`);
    const checkQuery = `SELECT id FROM bookings WHERE number='${number}' AND slot_id=${slot_id};`;
    connection.query(checkQuery, (checkError, checkResult) => {
      if (checkError) throw checkError;

      // Check if the user has already booked the slot
      if (checkResult.length) {
        return res.status(400).send("Slot already booked.");
      }

      const bookQuery = `INSERT INTO bookings (slot_id, number) VALUES (${slot_id}, '${number}');`;
      const updateQuery = `UPDATE slots SET count = count - 1 WHERE id = ${slot_id};`;

      connection.query(bookQuery, (bookError, bookResult) => {
        if (bookError) throw bookError;

        connection.query(updateQuery, (updateError, updateResult) => {
          if (updateError) throw updateError;

          res.send({success: true,  message:"Slot booked successfully."});
        });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const cancelSlot = (req, res) => {
  try {
    const { number, slot_id } = req.body;
    const cancelQuery = `DELETE FROM bookings WHERE number='${number}' AND slot_id=${slot_id};`;
    connection.query(cancelQuery, (cancelError, cancelResult) => {
      if (cancelError) throw cancelError;


      const updateQuery = `UPDATE slots SET count = count + 1 WHERE id = ${slot_id};`;
      connection.query(updateQuery, (updateError, updateResult) => {
        if (updateError) throw updateError;

        // Check if the slot exists
        if (updateResult.affectedRows === 0) {
          return res.status(404).send("Slot not found.");
        }

        res.send({success:true,message:"Booking canceled successfully."});
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getBookingsByNumber = (req, res) => {
  try {
    const { number } = req.body;
    // console.log("number : ", number);

    const getBookingsQuery = `
      SELECT * FROM bookings WHERE number='${number}';
    `;

    connection.query(getBookingsQuery, (error, bookingsResult) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
      }

      // Check if any bookings were found
      // console.log(bookingsResult);
      if (bookingsResult.length === 0) {
        return res
          .status(404)
          .send("No bookings found with the provided number.");
      }

      // Get the slot details for each booking
      const bookingIds = bookingsResult.map((booking) => booking.id);
      const getSlotsQuery = `
        SELECT * FROM slots WHERE id IN (
          SELECT slot_id FROM bookings WHERE id IN (${bookingIds.join(",")})
        );
      `;

      connection.query(getSlotsQuery, (error, slotsResult) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Internal Server Error");
        }

        // Map the slot details to their respective bookings
        const bookingsWithSlots = bookingsResult.map((booking) => {
          const slot = slotsResult.find((slot) => slot.id === booking.slot_id);
          return { ...booking, slot };
        });

        res.send(bookingsWithSlots);
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

export default {
  bookSlot,
  cancelSlot,
  getBookingsByNumber,
};
