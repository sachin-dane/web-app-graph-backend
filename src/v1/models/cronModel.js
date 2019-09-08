
import db from '../../db/db'

var CronModel = {

    getAllSiteIds: function (data) {
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            try {
                let sql = `select id from sites;`
                db.query(sql, function (err, rows, fields) {
                    if (!err && rows.length > 0) {
                        response.message = 'Got All site ids'
                        response.data = rows
                        resolve(response)
                    } else {
                        response.message = 'Something went wrong'
                        resolve(response)
                    }
                })
            } catch (err) {
                reject(err);
            }
        });
    },

    insertSiteDataFromCron: function (data) {
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            try {
                let sql = ` INSERT INTO site_details (site_id, object, event_date, lifetime, instantaneous) VALUES (${data.site_id}, ${data.object}, '${data.eventDate}', ${data.lifetime}, ${data.instantaneous});`;
                db.query(sql, function (err, results, fields) {
                    if (!err && results) {
                        console.log('Inseted')
                        response.message = 'Inserted object into site details'
                        response.data = results
                        resolve(response)
                    } else {
                        console.log('elseee')
                        response.message = 'Something went wrong'
                        resolve(response)
                    }
                })
            } catch (err) {
                reject(err);
            }
        });
    },

};
module.exports = CronModel;