const sendEmail = require("../config/mailer");

const resetPasswordEmail = async (req, fullname, email, secretToken) => {
	const html = `
     <h2>Hi</h2>
      <strong>Hi ${fullname}</strong>
      <br/>
      <br/>
      Here is your password reset token:
      <br/>
      <br/>
       <strong>${secretToken}</strong>
       <br/>
       <br/>
         Enjoy your event listing
      <br/>
      <br/>
      Cheers,
      <br/>
      <br/>
      contact: support@todoapp.mail.com
   `;

	await sendEmail("support@todoapp.mail.com", email, "Have fun with your events", html);
};

module.exports = resetPasswordEmail;
