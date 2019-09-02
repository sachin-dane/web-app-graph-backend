var express = require('express');
var router = express.Router();
import Sites from '../models/sites'

// router.get('/:id?', function (req, res, next) {

//     if (req.params.id) {

//         Sites.getSitesById(req.params.id, function (err, rows) {

//             if (err) {
//                 res.json(err);
//             }
//             else {
//                 res.json(rows);
//             }
//         });
//     }
//     else {

//         Sites.getAllSites(function (err, rows) {

//             if (err) {
//                 res.json(err);
//             }
//             else {
//                 res.json(rows);
//             }

//         });
//     }
// });




// router.get('/users/:id?', function (req, res, next) {

//     if (req.params.id) {

//         Sites.getSitesByUserId(req.params.id, function (err, rows) {

//             if (err) {
//                 res.json(err);
//             }
//             else {
//                 res.json(rows);
//             }
//         });
//     }
//     else {

//         Sites.getAllUserSites(function (err, rows) {

//             if (err) {
//                 res.json(err);
//             }
//             else {
//                 res.json(rows);
//             }

//         });
//     }
// });

router.get('/users/:id?', async function (req, res, next) {
    if (req.params.id) {
        let result = await Sites.getSitesByUserId(req.params.id)
        console.log("result ==>>)", result)
        res.json(result);
    } else {
        let result = await Sites.getAllUserSites(req.body)
        console.log("result ==>>)", result)
        res.json(result);
    }

});


module.exports = router;