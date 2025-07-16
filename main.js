import { closeConnection } from './dbHelper.js';
import { processOldDiaries } from './processOldDiarys.js';
import cron from 'node-cron';

async function main() {
  try {
    console.log('Starting the diary processing job...');
    await processOldDiaries();
    console.log('Diary processing job completed.');
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Schedule the cron job to run every 5 seconds, for testing :)
cron.schedule('*/5 * * * * *', async () => {
  console.log('Running cron job every 5 seconds');
  await main();
});

// Uncomment this for production
/*
cron.schedule('0 12 * * *', async () => {
  console.log('Running cron job at 12:00 PM every day');
  await main();
});
*/

// Handle script termination and close the MongoDB connection
process.on('SIGINT', async () => {
  console.log('Stopping the script...');
  await closeConnection();
  console.log('MongoDB connection closed.');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Stopping the script...');
  await closeConnection();
  console.log('MongoDB connection closed.');
  process.exit(0);
});