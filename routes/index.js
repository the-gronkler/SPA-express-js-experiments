var express = require('express');
const path = require("path");
const crypto = require('crypto');
const validateData = require('../public/javascripts/form-data-validator');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'form.html'));
});


//task b - live token generator
router.get('/data', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'taskb.html'));
});

router.get('/token', function (req, res) {
    const token = crypto.randomBytes(16).toString('hex');

    res.json({token, timestamp: new Date(Date.now()).toISOString()});
});


// task a - spa form: data hasher
router.post('/submit', (req, res) => {
    try {
        const {name, phoneNumber, email} = req.body;

        const errors = validateData(name, phoneNumber, email);
        if (errors.size > 0)
            return res.status(422).json({
                success: false,
                message: 'form errors found',
                errors: JSON.stringify(Array.from(errors.entries()))
            });

        const hash = crypto
            .createHash('sha256')
            .update(name + phoneNumber + email)
            .digest('hex');
        console.log('generated hash: ', hash);

        res.json({
            success: true,
            message: 'Form submitted successfully!',
            hash: hash
        });
    }
    catch (e) {
        console.log('error', e);
        return res.status(500).json({success: false, message: 'error processing form :('});
    }
});


module.exports = router;
