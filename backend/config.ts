import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // Adjust the path to your .env file if needed

export const config = {
  mysql: {
    database: process.env.MYSQL_DATABASE || 'spacex', // Add default values as a fallback
    host: process.env.MYSQL_HOST || 'localhost',
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || 'password', 
  },
};