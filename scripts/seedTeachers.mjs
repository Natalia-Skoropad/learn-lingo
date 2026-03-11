import { readFile } from 'node:fs/promises';
import admin from 'firebase-admin';

//===========================================================================

const serviceAccount = JSON.parse(
  await readFile('./secrets/firebase-service-account.json', 'utf-8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

//===========================================================================

async function seedTeachers() {
  const raw = await readFile('./data/teachers.json', 'utf-8');
  const teachers = JSON.parse(raw);

  const batch = db.batch();

  teachers.forEach((teacher) => {
    const slug = `${teacher.name}-${teacher.surname}`
      .toLowerCase()
      .replace(/\s+/g, '-');

    const docRef = db.collection('teachers').doc(slug);

    batch.set(docRef, {
      name: teacher.name,
      surname: teacher.surname,
      languages: teacher.languages,
      levels: teacher.levels,
      rating: teacher.rating,
      reviews: teacher.reviews,
      price_per_hour: teacher.price_per_hour,
      lessons_done: teacher.lessons_done,
      avatar_url: teacher.avatar_url,
      lesson_info: teacher.lesson_info,
      conditions: teacher.conditions,
      experience: teacher.experience,
    });
  });

  await batch.commit();
  console.log(`Seeded ${teachers.length} teachers`);
}

//===========================================================================

seedTeachers().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
