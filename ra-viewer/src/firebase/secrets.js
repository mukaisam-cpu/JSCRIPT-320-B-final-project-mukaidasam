const { onRequest } = require('firebase-functions/v2/https');

const getSecret = onRequest(
  { secrets: ["SECRET_NAME"] },
  (req, res) => {
    console.log(process.env.SECRET_NAME)
    return process.env.SECRET_NAME
  }
);

export default getSecret