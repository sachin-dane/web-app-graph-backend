
import db from '../../db/db'
import responseFormat from '../../lib/responseFormat'

var Sites = {

    getSitesByUserId: function (id) {
        console.log('data==>>', id)
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            try {

                console.log('data try==>>', id)
                let sql = `select a.id as siteId, a.site_name, a.status as siteStatus from sites as a
                            inner join  user_site_mapping as us
                            on a.id = us.site_id
                            inner join user u
                            on us.user_id = u.id
                            where u.id = ${id};`

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

};
module.exports = Sites;