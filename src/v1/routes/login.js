var express = require('express');
var router = express.Router();
import Login from '../models/login'

router.post('/', async function (req, res, next) {

    let result = await Login.userLogin(req.body)
    console.log("result ==>>)", result)
    res.json(result);
    // Login.userLogin(req.body, function (err, response) {
    //     console.log('response==>>', response)
    //     //console.log(req.body);
    //     if (err) {
    //         res.json(err);
    //     }
    //     else {
    //         res.json(req.body);//or return count for 1 & 0
    //     }
    // });



    // Login.userLogin(req.body, function (err, response) {
    //     console.log('response==>>', response)
    //     //console.log(req.body);
    //     if (err) {
    //         res.json(err);
    //     }
    //     else {
    //         res.json(req.body);//or return count for 1 & 0
    //     }
    // });
});


module.exports = router;