var express = require('express');
var router = express.Router();
import Sites from '../models/sites'
import responseFormat from '../../lib/responseFormat'

router.get('/users/:id?', async function (req, res, next) {
    try {
        if (req.params.id) {
            let result = await Sites.getSitesByUserId(req.params.id, res)
            console.log("result ==>>)", result)
            res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "", result));
        } else {
            let result = await Sites.getAllUserSites(req.body, res)
            console.log("result ==>>)", result)
            res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "", result));
        }
    } catch (err) {
        res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], err, null));
    }

});


module.exports = router;