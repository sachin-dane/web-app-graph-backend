var express = require('express');
var router = express.Router();
import User from '../models/users'

/* GET users listing. */
// router.get('/', function (req, res, next) {
//     console.log('Get Users')
//     res.send('respond with GET resource');
// });

// router.put('/', function (req, res, next) {
//     console.log('Get Users')
//     res.send('respond with Put Method resource');
// });

// module.exports = router;




router.get('/:id?', function (req, res, next) {

    if (req.params.id) {

        User.getUserById(req.params.id, function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
    else {

        User.getAllUsers(function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }

        });
    }
});

router.post('/', function (req, res, next) {

    User.addUser(req.body, function (err, count) {

        //console.log(req.body);
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);//or return count for 1 & 0
        }
    });
});
// router.post('/:id', function (req, res, next) {
//     User.deleteAll(req.body, function (err, count) {
//         if (err) {
//             res.json(err);
//         }
//         else {
//             res.json(count);
//         }
//     });
// });

router.patch('/', function (req, res, next) {

    User.activateUser(req.body, function (err, count) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(count);
        }

    });
});

router.delete('/:id', function (req, res, next) {

    User.deleteUser(req.params.id, function (err, count) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(count);
        }

    });
});
router.put('/:id', function (req, res, next) {
    console.log('req==>>', req)

    User.updateUser(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

module.exports = router;