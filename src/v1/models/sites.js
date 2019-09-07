
import db from '../../db/db'
import responseFormat from '../../lib/responseFormat'

const checkAlreadyAssign = (data) => {
    return new Promise(async (resolve, reject) => {
        let response = {
            message: '',
            data: []
        }
        try {
            let sql = `select * from user_site_mapping where site_id=${data.site_id} and user_id=${data.user_id};`
            console.log('sql ==>>>', sql)
            db.query(sql, function (err, rows, fields) {
                console.log(' rows.length==>>', rows.length, err)
                if (!err && rows.length > 0) {
                    response.message = 'Response return successfully'
                    response.data = rows
                    resolve(response)
                } else if (err) {
                    resolve(response)
                } else if (!err && rows.length === 0) {

                    let sql = ` INSERT INTO user_site_mapping (user_id, site_id) VALUES (${data.user_id},${data.site_id});`;
                    console.log('sql ==>>>', sql)
                    db.query(sql, function (err, results, fields) {
                        console.log(' rows.length==>>', results, err)
                        if (!err && results.affectedRows > 0) {
                            response.message = 'Response return successfully'
                            response.data = results
                            resolve(response)
                        } else if (err) {
                            resolve(response)
                        }
                    })
                }
            })
        } catch (err) {
            console.log('EEEEEEE==>>', err)
            reject(err);
        }
    });
}


var Sites = {

    getSitesByUserId: function (data) {
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            console.log('databy id ==>>>', data)
            try {
                let sql = ``

                if (data.role_id === '2') {
                    console.log('databy id 22222==>>>', data)

                    sql = `select a.id as siteId, a.site_name, a.status as siteStatus from sites as a
                    inner join  user_site_mapping as us
                    on a.id = us.site_id
                    inner join user u
                    on us.user_id = u.id where u.id=${data.id}`
                } else {
                    sql = `select a.id as siteId, a.site_name, a.status as siteStatus from sites as a`
                }

                // ${data.role_id === 2 ? `where u.id = ${id};` : `;`}`

                console.log('sql query =>>', sql)

                db.query(sql, function (err, rows, fields) {
                    console.log(' rows.length==>>', rows.length, err)
                    if (!err && rows.length > 0) {
                        response.message = 'Response return successfully'
                        response.data = rows
                        resolve(response)
                    } else if (err) {
                        reject(err)
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
    },

    getSitesById: function (id) {
        console.log('data==>>', id)
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            try {

                console.log('data try==>>', id)
                let sql = `SELECT * FROM sites as s INNER JOIN site_details as sd on s.id = sd.site_id where s.id = ${id};`

                db.query(sql, function (err, rows, fields) {
                    console.log(' rows.length==>>', rows.length, err)
                    if (!err && rows.length > 0) {
                        response.message = 'Response return successfully'
                        response.data = rows
                        resolve(response)
                    } else if (err) {
                        response.message = 'Something Went wrong'
                        reject(response)
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
    },

    assignUserToSite: function (data) {
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            console.log(' rows data==>>', data)
            try {


                let result = await checkAlreadyAssign(data)
                console.log('assing already data==>>>', result)

                let sql = ` update sites SET status=${data.site_type} where id=${data.site_id}`

                console.log('sql ==>>', sql)
                db.query(sql, function (err, results, fields) {
                    console.log(' rows.length==>>', results, fields)
                    if (!err) {
                        response.message = 'User Assigned to site'
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
                console.log('EEEEEEE==>>', err)
                reject(err);
            }
        });
    },

};
module.exports = Sites;