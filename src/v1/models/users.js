
import db from '../../db/db'

const checkUserExist = (email) => {
    return new Promise(async (resolve, reject) => {
        let response = {
            message: '',
            data: []
        }
        try {
            let sql = `select * from user where email='${email}'`

            db.query(sql, function (err, rows, fields) {
                if (!err && rows.length > 0) {
                    response.message = 'Response return successfully'
                    response.data = rows
                    resolve(response)
                } else if (err) {
                    resolve(response)
                } else {
                    response.message = 'No records found'
                    resolve(response)
                }
            })
        } catch (err) {
            reject(err);
        }
    });
}

var User = {

    getAllUsers: function (callback) {
        let sql = `SELECT  u.id, u.firstname, u.lastname, u.email, u.phone_no, u.address, u.company_name, u.city, u.state, u.zip_code, ut.role, u.status  FROM user as u inner join userType as ut on ut.id = u.user_role where u.user_role != 1;`
        return db.query(sql, callback);
    },

    getUserById: function (id, callback) {
        return db.query("select id, firstname, email, lastname, phone_no, address, company_name, city, state, zip_code, user_role from user where id=?", [id], callback);
    },

    addUser: async function (user) {
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            try {
                let checkUser = await checkUserExist(user.email)
                if (checkUser.data && checkUser.data.length > 0) {
                    response.message = 'User already exist, Please use another account.'
                    reject(response)
                } else {
                    let sql = ` INSERT INTO user (firstname, lastname, email, password, phone_no, address, company_name, city, state, zip_code, status, user_role) VALUES ('${user.firstname}','${user.lastname}','${user.email}','${user.password}','${user.phone_number}','${user.address}','${user.company_name}','${user.city}','${user.state}','${user.zip_code}', ${user.status}, ${user.user_role});`;
                    db.query(sql, function (err, rows, fields) {
                        if (!err) {
                            response.message = 'User added successfully'
                            response.data = rows
                            resolve(response)
                        } else if (err) {
                            reject(err)
                        }
                    })
                }
            } catch (err) {
                reject(err);
            }
        });
    },

    checkUser: function (data) {
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            try {
                let sql = `select firstname, lastname, email from user where email='${data.email}' and phone_no='${data.phone_no}';`
                db.query(sql, function (err, rows, fields) {
                    if (!err && rows.length > 0) {
                        response.message = 'Response return successfully'
                        response.data = rows
                        resolve(response)
                    } else if (err) {
                        response.message = 'Something Went wrong'
                        reject(response)
                    } else {
                        response.message = 'User does not exist, Please check your email and phone no'
                        resolve(response)
                    }
                })
            } catch (err) {
                reject(err);
            }
        });
    },

    updatePassword: function (data) {
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            try {
                let sql = `UPDATE user SET password='${data.password}' WHERE email='${data.email}'; `;
                db.query(sql, function (err, results, fields) {
                    if (!err && results.affectedRows > 0) {
                        response.message = 'Password Updated Successfuly'
                        response.data = results
                        resolve(response)
                    } else if (err) {
                        response.message = 'Something Went wrong'
                        reject(response)
                    } else {
                        response.message = 'SOmething Went Wrong'
                        resolve(response)
                    }
                })
            } catch (err) {
                reject(err);
            }
        });
    },


    deleteUser: function (id, callback) {
        return db.query("delete from user where id=?", [id], callback);
    },

    activateUser: function (user, callback) {
        let sql = `UPDATE user SET status='${user.status}' WHERE id = ${user.id} ; `;
        return db.query(sql, callback);
    },


    updateUser: function (id, user, callback) {
        let sql = `UPDATE user SET firstname='${user.firstname}',lastname='${user.lastname}',email='${user.email}',phone_no='${user.phone_number}',address='${user.address}', company_name='${user.company_name}',city='${user.city}', state='${user.state}',zip_code='${user.zip_code}' WHERE id = ${id} ; `;
        return db.query(sql, callback);
    },

};
module.exports = User;