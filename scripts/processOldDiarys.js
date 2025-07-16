import {connectToDatabase} from './dbHelper.js';

export async function processOldDiaries() {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
    const diariesCollection = db.collection('diaries');

    // Find all users with a diary
    const users = await usersCollection.find({ diary: { $exists: true } }).toArray();

    if (users.length === 0) {
      console.log('No users with diaries found.');
      return;
    }

    for (const user of users) {
      const diaryId = user.diary;

      // Ensure the user has an oldDiaries array
      if (!user.oldDiaries) {
        await usersCollection.updateOne(
          { _id: user._id },
          { $set: { oldDiaries: [] } }
        );
      }

      // Fetch the diary document
      const diary = await diariesCollection.findOne({ _id: diaryId });

      if (diary) {
        // Add the diary to the user's oldDiaries array
          const oldDiaryEntry = { id: diary._id.toString(), date: diary.createdAt };
          await usersCollection.updateOne(
            { _id: user._id },
            {
              $push: { oldDiaries: oldDiaryEntry },
              $unset: { diary: '' }, // Remove the diary reference
            }
          );

          // Delete the diary document
          await diariesCollection.deleteOne({ _id: diary._id });
      }
    }

    console.log('Processed old diaries successfully.');
  } catch (error) {
    console.error('Error processing old diaries:', error);
  }
}