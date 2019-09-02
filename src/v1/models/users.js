
import db from '../../db/db'

var User = {

    getAllUsers: function (callback) {

        return db.query("Select * from user", callback);

    },
    getUserById: function (id, callback) {

        return db.query("select * from user where id=?", [id], callback);
    },

    addUser: function (user, callback) {
        console.log("inside service");

        let sql = ` INSERT INTO user (firstname, lastname, email, password, phone_no, address, company_name, city, state, zip_code) VALUES ('${user.firstname}','${user.lastname}','${user.email}','${user.password}','${user.phone_no}','${user.address}','${user.company_name}','${user.city}','${user.state}','${user.zip_code}');`;


        return db.query(sql, callback);
        //return db.query("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
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