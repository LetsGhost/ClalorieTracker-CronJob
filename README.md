
- **`.env`**: Stores environment variables like the MongoDB URI and database name.
- **`dbHelper.js`**: Handles MongoDB connection and disconnection.
- **`main.js`**: Entry point of the application. Schedules and runs the cron job.
- **`processOldDiarys.js`**: Contains the logic for processing old diary entries.
- **`package.json`**: Defines project dependencies and scripts.
- **`.gitignore`**: Specifies files and directories to ignore in version control.

## Prerequisites

- Node.js (v20 or higher)
- MongoDB instance running locally or remotely

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd CalorieTracker-CroneJob
   ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Create a .env file in the root directory and configure the following variables:
  ```bash
  MONGODB_URI=mongodb://localhost:27017/
  DB_NAME=testdatabase
  ```

## Usage

1. Start the application
```bash
node [main.js](http://_vscodecontentref_/4)
```

2. The cron job will run every 5 seconds to process old diary entries. You can modify the schedule in `main.js` by updating the `cron.schedule` expression.

3. To stop the application, press `Ctrl+C`. The MongoDB connection will be closed gracefully.

## Depencies

- dotenv: Loads environment variables from a `.env` file.
- mongodb: MongoDB driver for Node.js.
- node-cron: Cron job scheduler for Node.js.