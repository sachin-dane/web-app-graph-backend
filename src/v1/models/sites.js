
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
            db.query(sql, function (err, rows, fields) {
                if (!err && rows.length > 0) {
                    response.message = 'Response return successfully'
                    response.data = rows
                    resolve(response)
                } else if (err) {
                    resolve(response)
                } else if (!err && rows.length === 0) {

                    let sql = ` INSERT INTO user_site_mapping (user_id, site_id) VALUES (${data.user_id},${data.site_id});`;
                    db.query(sql, function (err, results, fields) {
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
            reject(err);
        }
    });
}

const insertIntoSite = (data) => {
    return new Promise(async (resolve, reject) => {
        let response = {
            message: '',
            data: []
        }
        try {

            let sql = `INSERT INTO  sites (site_name, status) VALUES ('${data.site_name}', ${data.site_type});`
            db.query(sql, function (err, rows, fields) {
                if (!err && rows.affectedRows > 0) {
                    response.message = 'Response return successfully'
                    response.data = rows.insertId
                    resolve(response)
                } else if (err) {
                    resolve(response)
                }
            })
        } catch (err) {
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

            try {
                let sql = ``

                if (data.role_id === '2') {

                    sql = `select a.id as siteId, a.site_name, a.status as siteStatus from sites as a
                    inner join  user_site_mapping as us
                    on a.id = us.site_id
                    inner join user u
                    on us.user_id = u.id where u.id=${data.id}`
                } else {
                    sql = `select a.id as siteId, a.site_name, a.status as siteStatus from sites as a`
                }

                db.query(sql, function (err, rows, fields) {
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
                reject(err);
            }
        });
    },

    getSitesById: function (id) {
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            try {
                let sql = `SELECT * FROM sites as s INNER JOIN site_details as sd on s.id = sd.site_id where s.id = ${id};`

                db.query(sql, function (err, rows, fields) {
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
            try {
                let result = await checkAlreadyAssign(data)
                let sql = ` update sites SET status=${data.site_type} where id=${data.site_id}`
                db.query(sql, function (err, results, fields) {
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
                reject(err);
            }
        });
    },

    createSite: function (data) {
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            try {

                let result = await insertIntoSite(data)
                if (result.data > 0) {

                    let sql = ` INSERT INTO site_details (site_id, object, event_date, lifetime, instantaneous) VALUES (${result.data},1, now(), ${data.obj1Lifetime}, ${data.obj1Instantaneous}), (${result.data},2, now(), ${data.obj2Lifetime}, ${data.obj2Instantaneous}), (${result.data},3, now(), ${data.obj3Lifetime}, ${data.obj3Instantaneous});`;

                    db.query(sql, function (err, results, fields) {
                        if (!err) {
                            response.message = 'Site is created Successfully'
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
                } else {
                    reject({ message: 'Someting Went Wrong' });
                }

            } catch (err) {
                reject(err);
            }
        });
    },


    getAllUserSites: function (id) {
        return new Promise(async (resolve, reject) => {
            let response = {
                message: '',
                data: []
            }
            try {
                let sql = `SELECT * FROM sites;`

                db.query(sql, function (err, rows, fields) {
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
                reject(err);
            }
        });
    },
};
module.exports = Sites;