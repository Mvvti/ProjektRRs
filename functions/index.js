const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

exports.sendEmail = functions.https.onCall((data) => {
    const gmail = 'rrs.matorze@gmail.com';
    const passwd = 'mateusz00';

    // https://myaccount.google.com/lesssecureapps

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmail,
            pass: passwd
        }
    });

    const subject = data.subject;
    const html = data.html;
    const to = data.to;

    const mailOptions = {
        from: gmail,
        to: to,
        subject: subject,
        html: html
    };

    return transporter.sendMail(mailOptions, (er, info) => {
        if (er) {
            return er.toString();
        }
        return true;
    });
});