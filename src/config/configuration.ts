export const configuration = () => {
  return {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    secret_key: process.env.SECRET_KEY,
    sendgrid_api_key: process.env.SENDGRID_API_KEY,
    email: process.env.EMAIL,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    callback_url: process.env.CALLBACK_URL,
    cloudname: process.env.CLOUDNAME,
    apikey: process.env.APIKEY,
    apisecret: process.env.APISECRET,
  };
};
