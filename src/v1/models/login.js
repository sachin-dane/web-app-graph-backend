
import db from '../../db/db'
// import executeQuery from '../utilityModal/utility'

var Login = {


    userLogin: function (data) {
        console.log('data==>>', data)
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            try {

                console.log('data try==>>', data)
                let sql = `select * from user where email='${data.email}' and password='${data.password}' and status=1`
                db.query(sql, function (err, rows, fields) {
                    console.log(' rows.length==>>', rows.length, err)
                    if (!err && rows.length > 0) {
                        response.message = 'Successfull Login'
                        response.data = rows
                        resolve(response)
                    } else {
                        response.message = 'Incorrect Username and password or Admin not yet activated your account'
                        resolve(response)
                    }
                })


                // db.query(sql, function (err, rows, fields) {
                //     if (!err) {
                //         console.log('response222', response)
                //         if (rows.length) {
                //             console.log('response333', response)
                //             let sql1 = `select * from user where email='${data.email}' and password='${data.password}' and status=1`
                //             db.query(sql1, function (err, rows, fields) {
                //                 if (!err && rows.length) {
                //                     console.log('response444', response)
                //                     response.message = 'Successful login'
                //                     response.data = rows
                //                     console.log('response444', response)
                //                 } else {
                //                     response.message = 'Admin not yet activated your account'
                //                     console.log('response555', response)
                //                 }
                //             });
                //         } else {

                //             response.message = "Incorrect Username and password"
                //             console.log('response666', response)
                //         }
                //     } else {

                //         response.message = "Intenal Server Error"
                //         console.log('response7777', response)
                //     }

                // });
                // return response
                // resolve(response);
            } catch (err) {
                reject(err);
            }

        });



        // let result = db.query(sql, callback)
        // console.log('result ==>>', result)
        // return result;

    },
};
module.exports = Login;