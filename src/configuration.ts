export default () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    jwtSecret: process.env.JWT_SECRET ?? 'THIS SHOULD BE OVERRIDDEN BY A VALUE IN THE .ENV FILE. ALWAYS OVERRIDE THIS VALUE IN PRODUCTION.',
    MONGO_URI: process.env.MONGO_URI ?? 'mongodb://localhost/danubia_api',
    jwtExpiration: '1d',
  });
  