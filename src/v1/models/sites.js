
import db from '../../db/db'

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
                    } else {
                        response.message = 'No records found'
                        resolve(response)
                    }
                })
            } catch (err) {
                reject(err);
            }
        });
    },
};
module.exports = Sites;