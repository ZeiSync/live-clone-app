export const configuration = () => {
  return {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    secret_key: process.env.SECRET_KEY,
    sendgrid_api_key: process.env.SENDGRID_API_KEY,
    email: process.env.EMAIL,
  };
};
