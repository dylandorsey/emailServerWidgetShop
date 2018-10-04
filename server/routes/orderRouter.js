const express = require('express');
const router = express.Router();
var cors = require('cors');
const emailUtil = require('../modules/email-util');

const { sendEmail } = emailUtil;


// configure cors
const corsOptions = {
    methods: 'POST',
    origin: "*",
    optionsSuccessStatus: 204,
}
// enable cors preflight
router.options('*', cors(corsOptions));

router.post('/', cors(corsOptions), async (req, res, next) => {
    console.log('initiate POST email');

    const mailBody = {
        recipient: process.env.RECIPIENT,
        message: req.body.message
    };
    console.log(`mailBody = `);
    console.log(mailBody);
    try {
        await sendEmail(mailBody.recipient, mailBody.message);
        res.json({
            message: 'Your query has been sent',
            mailBody
        });
        await next();
    } catch (error) {
        res.json({ error });
        await next(error);
    }
});

// end POST ROUTE

module.exports = router;