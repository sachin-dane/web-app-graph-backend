var express = require('express');
var router = express.Router();
import Sites from '../models/sites'
import responseFormat from '../../lib/responseFormat'

router.get('/users/:id/:role_id?', async function (req, res, next) {
    try {
        if (req.params.id) {
            let result = await Sites.getSitesByUserId(req.params, res)
            res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "", result));
        } else {
            let result = await Sites.getAllUserSites(req.body, res)
            res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "", result));
        }
    } catch (err) {
        res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], err, null));
    }

});

router.put('/assign/user', async function (req, res, next) {
    try {
        if (req.body) {
            let result = await Sites.assignUserToSite(req.body, res)
            res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "", result));
        }
    } catch (err) {
        res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], err, null));
    }

});

router.get('/:id?', async function (req, res, next) {
    try {
        if (req.params.id) {
            let result = await Sites.getSitesById(req.params.id, res)
            res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "", result));
        }
        else {
            let result = await Sites.getAllUserSites(req.body, res)
            res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "", result));
        }
    } catch (err) {
        res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], err, null));
    }
});

router.post('/create', async function (req, res, next) {
    try {
        let result = await Sites.createSite(req.body)
        res.status(responseFormat.statusCode["SUCCESS"]).send(responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "", result));

    } catch (err) {
        res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], err, null));
    }
});

module.exports = router;