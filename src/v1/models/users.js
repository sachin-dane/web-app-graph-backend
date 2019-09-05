
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
                console.log(' rows.length==>>', rows, err)
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
            console.log('EEEEEEE==>>', err)
            reject(err);
        }
    });
}

var User = {

    getAllUsers: function (callback) {

        return db.query("Select * from user", callback);

    },
    getUserById: function (id, callback) {

        return db.query("select * from user where id=?", [id], callback);
    },

    // addUser: async function (user, callback) {
    //     console.log("inside service");

    //     let checkUser = await checkUserExist(user.email)
    //     console.log('checkUser ==>>', checkUser.data.length)
    //     if (checkUser.data && checkUser.data.length > 0) {

    //     } else {
    //         let sql = ` INSERT INTO user (firstname, lastname, email, password, phone_no, address, company_name, city, state, zip_code, status) VALUES ('${user.firstname}','${user.lastname}','${user.email}','${user.password}','${user.phone_no}','${user.address}','${user.company_name}','${user.city}','${user.state}','${user.zip_code}', ${user.status});`;

    //     }
    //     return db.query(sql, callback);
    //     //return db.query("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
    // },


    addUser: async function (user) {
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            try {
                let checkUser = await checkUserExist(user.email)
                console.log('User already exist', checkUser)
                if (checkUser.data && checkUser.data.length > 0) {
                    console.log('User already exist')
                    response.message = 'User already exist, Please use another account.'
                    reject(response)
                } else {
                    let sql = ` INSERT INTO user (firstname, lastname, email, password, phone_no, address, company_name, city, state, zip_code, status) VALUES ('${user.firstname}','${user.lastname}','${user.email}','${user.password}','${user.phone_no}','${user.address}','${user.company_name}','${user.city}','${user.state}','${user.zip_code}', ${user.status});`;
                    db.query(sql, function (err, rows, fields) {
                        console.log('ad rows==>>>', rows)
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
                console.log('EEEEEEE==>>', err)
                reject(err);
            }
        });
    },


    deleteUser: function (id, callback) {
        return db.query("delete from user where id=?", [id], callback);
    },

    activateUser: function (user, callback) {
        let sql = `UPDATE user SET status='${user.status}' WHERE id = ${user.id} ; `;

        console.log('sql ==>>', sql)

        return db.query(sql, callback);
    },


    updateUser: function (id, user, callback) {
        let sql = `UPDATE user SET firstname='${user.firstname}',lastname='${user.lastname}',email='${user.email}',phone_no='${user.phone_no}',address='${user.address}', company_name='${user.company_name}',city='${user.city}', state='${user.state}',zip_code='${user.zip_code}' WHERE id = ${id} ; `;

        console.log('sql ==>>', sql)

        return db.query(sql, callback);
    },





    // deleteAll: function (item, callback) {

    //     var delarr = [];
    //     for (i = 0; i < item.length; i++) {

    //         delarr[i] = item[i].Id;
    //     }
    //     return db.query("delete from task where Id in (?)", [delarr], callback);
    // }
};
module.exports = User;