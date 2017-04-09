const EMAIL_REGEX = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;


const emailValidator = (message) => function(value) {

    if (!EMAIL_REGEX.test(value)) {
          console.log("EMAIL NOT GOOD");

      return message;
    }
    console.log("EMAIL GOOD");
    return null;
  };

export default emailValidator;
