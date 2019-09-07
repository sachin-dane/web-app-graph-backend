var express = require('express');
var router = express.Router();
import User from '../models/users'
import responseFormat from '../../lib/responseFormat'


router.get('/:id?', function (req, res, next) {
    try {
        if (req.params.id) {

            User.getUserById(req.params.id, function (err, rows) {

                if (err) {
                    res.status(responseFormat.statusCode["BAD_REQUEST"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], err.message, null));
                }
                else {
                    res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "", rows));
                }
            });
        }
        else {

            User.getAllUsers(function (err, rows) {

                if (err) {
                    res.status(responseFormat.statusCode["BAD_REQUEST"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], err.message, null));
                }
                else {
                    res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "", rows));
                }

            });
        }
    } catch (err) {
        res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], err, null));
    }
});

router.post('/', async function (req, res, next) {
    try {
        let result = await User.addUser(req.body, res)
        res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "", result));

    } catch (err) {
        res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], err, null));
    }
});


router.post('/check', async function (req, res, next) {
    try {
        let result = await User.checkUser(req.body, res)
        res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "", result));

    } catch (err) {
        res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], err, null));
    }

});

router.put('/password/update', async function (req, res, next) {
    try {

        let result = await User.updatePassword(req.body, res)
        res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "", result));

    } catch (err) {
        res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], err, null));
    }

});


router.put('/', function (req, res, next) {
    try {
        User.activateUser(req.body, function (err, count) {
            let message = ''
            if (err) {
                res.status(responseFormat.statusCode["BAD_REQUEST"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], err.message, null));
            }
            else {
                message = 'User activated successfully'
                res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], message, null));
            }

        });
    } catch (err) {
        res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], err, null));
    }
});

router.delete('/:id', function (req, res, next) {
    try {
        User.deleteUser(req.params.id, function (err, count) {
            let message = ''
            if (err) {
                res.status(responseFormat.statusCode["BAD_REQUEST"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], err.message, null));
            }
            else {
                message = 'User deleted successfully'
                res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], message, null));
            }

        });

    } catch (err) {
        res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], err, null));
    }
});

router.put('/:id', function (req, res, next) {
    try {
        User.updateUser(req.params.id, req.body, function (err, rows) {
            let message = ''
            if (err) {
                res.status(responseFormat.statusCode["BAD_REQUEST"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], err.message, null));
            }
            else {
                message = 'User profile updated successfully'
                res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], message, null));
            }
        });
    } catch (err) {
        res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], err, null));
    }
});

module.exports = router;