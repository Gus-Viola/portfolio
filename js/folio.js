// console.log("folio.js is loaded")
//https://www.freecodecamp.org/news/how-to-receive-emails-via-your-sites-contact-us-form-with-aws-ses-lambda-api-gateway/
//modified logic from AWS SES (only email) to AWS SNS (email and SMS, and many other things)

const form = document.querySelector('form')

form.addEventListener('submit', event => {
  // prevent the form submit from refreshing the page
  event.preventDefault()
 
  const { name, email, message } = event.target
  // Use your API endpoint URL you copied from the previous step
  const endpoint =
    "https://v3hp018fpe.execute-api.us-east-1.amazonaws.com/default/Send_Contact_Form_from_Folio_to_SNS_Topic";
  // We use JSON.stringify here so the data can be sent as a string via HTTP
	const body = JSON.stringify({
    senderName: name.value,
    senderEmail: email.value,
    message: message.value
  });
  const requestOptions = {
    method: "POST",
    body
  };

  fetch(endpoint, requestOptions)
    .then((response) => {
      if (!response.ok) throw new Error("Error in fetch");
      return response.json();
    })
    .then((response) => {
      console.log("Message sent successfully!");
        })
    .catch((error) => {
      console.log("An unkown error occured.");
    });
});