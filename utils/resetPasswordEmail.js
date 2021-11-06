const sendEmail = require("../config/mailer");

const resetPasswordEmail = async (req, fullname, email, secretToken) => {
	const html = `
     <h2>welcome to Frooto</h2>
      <strong>${fullname}, happy shopping.</strong>
      <br/>
      <br/>
      Here is your password reset token:
      <br/>
      <br/>
       <strong>${secretToken}</strong>
       <br/>
       <br/>
         Happy shopping !!!!!
      <br/>
      <br/>
      Cheers,
      <br/>
       <srong>Frooto Team</strong>
      <br/>
      contact: support@frootomail.com
   `;

	await sendEmail("support@todoapp.com", email, "Welcome to The Todo App", html);
};

module.exports = resetPasswordEmail;
