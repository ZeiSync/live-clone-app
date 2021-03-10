export const configuration = () => {
  return {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    secret_key: process.env.SECRET_KEY,
  };
};
