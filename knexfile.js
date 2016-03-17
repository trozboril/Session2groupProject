module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/tapt_db'
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
  }
  
};
