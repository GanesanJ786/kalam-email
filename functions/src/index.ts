const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'adukalamapp@gmail.com',
        pass: 'rrkcgprvzoetcgrr'
    }
});

exports.sendMail = functions.https.onRequest((req:any, res:any) => {
    cors(req, res, () => {
      
        // getting dest email by query string
        const dest = req.query.dest;
        const ownerName = req.query.owner;
        const coachName = req.query.coachName;

        const mailOptions = {
            from: 'Adukalam Verification <adukalamapp@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'New coach requested', // email subject
            html: `<p style="font-size: 16px;">Hi <b>${ownerName}</b>, A new coach <b>${coachName}</b> is requesting to add in your academy. Please verify and approve.</p>
                <br />
               <a href="https://kalam-in.web.app/login" style="background-color: orange;
               color: white;
               padding: 14px 25px;
               text-align: center;
               text-decoration: none;
               display: inline-block;"
               target="_blank">
               Click to approve
               </a>
            ` // email content in HTML
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro:any, info:any) => {
            console.log(info)
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
});