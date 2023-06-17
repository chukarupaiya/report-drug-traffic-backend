const nodemailer = require("nodemailer");
require("dotenv").config();

exports.SendMail = (toMail, subject, body) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  let mailOptions = {
    from: "onlinegurudev3@gmail.com",
    to: toMail,
    subject: subject,
    text: body,
  };

  try {
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        // res.send("Email sent successfully to ", data.accepted[0]);
        console.log("[+] Email sent successfully to ", data.accepted[0]);
      }
    });
  } catch (err) {
    console.log("[-] err from sendmail ", err);
  }
};
