
import db from '../../db/db'

var Login = {

    userLogin: function (data) {
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            try {
                let sql = `select id, firstname, email, lastname, phone_no, address, company_name, city, state, zip_code, user_role from user where email='${data.email}' and password='${data.password}' and status=1`
                db.query(sql, function (err, rows, fields) {

                    if (!err && rows.length > 0) {
                        response.message = 'Successfull Login'
                        response.data = rows
                        resolve(response)
                    } else {
                        response.message = 'Incorrect Username and password or Admin has not yet activated your account'
                        resolve(response)
                    }
                })
            } catch (err) {
                reject(err);
            }

        });

    },
};
module.exports = Login;