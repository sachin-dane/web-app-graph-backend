import db from '../../db/db'

const executeQuery = (sql) => {
    console.log('sql utiltity==>>', sql)
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, function (err, rows, fields) {
                if (!err) {
                    resolve(rows)
                } else {
                    reject(new Error(err))
                }
            })
        } catch (err) {
            reject(new Error(err))
        }
    })

}


module.exports = {
    executeQuery
}