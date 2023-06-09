import connection from '../connection.js';

const register = async (req, res) => {
    try {
        const { name, contact, email, password} = req.body;
        let query = `insert into user (name, contact, mail, password) values ("${name}", "${contact}", "${email}", "${password}");`;
        await connection.query(query, (error, result) => {
            if (error) {
                throw new Error(error.sqlMessage);
            }
            // console.log(result);
        });
        res.send({contact: contact,name: name,success:true,message:'User registered'});
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
};

const login = async (req, res) => {
    try {
        const { contact, password } = req.body;
        let query = `select * from user where contact = "${contact}"`;
        await connection.query(query, (error, result, fields) => {
            if (error) {
                throw new Error(error.sqlMessage);
            }
            // console.log(result);
            if (result.length) {
                result[0].password == password ? res.send({'name' : result[0].name}) : res.send({'name' : '','error' : 'wrong pass'});
            } else {
                res.send({'error' : 'wrong pass'});
            }
        });
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
};

export default {
    register,
    login,
};
