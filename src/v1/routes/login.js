var express = require('express');
var router = express.Router();
import Login from '../models/login'
import responseFormat from '../../lib/responseFormat'

router.post('/', async function (req, res, next) {
    try {
        let result = await Login.userLogin(req.body)
        console.log("result ==>>", result.data.length)
        if (result.data.length > 0) {
            res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "", result));
        } else {
            res.status(responseFormat.statusCode["UNAUTHORIZED"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["UNAUTHORIZED"], "", result));
        }

    } catch (err) {
        res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], err, null));
    }
});


module.exports = router;