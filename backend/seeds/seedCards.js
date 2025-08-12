require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Card = require('../models/Card');

(async () => {
  try {
    await connectDB();

    const sample = [
      {
        term: 'dropout rates',
        definitionEn: 'The percentage of students who leave school before completion',
        definitionTr: 'Okulu tamamlamadan ayrılan öğrencilerin yüzdesi',
        partOfSpeech: 'noun phrase',
        collocations: ['reduce dropout rates', 'lower dropout rates'],
        phraseBank: ['significantly reduce dropout rates'],
        examples: [
          { en: 'The new policy aims to reduce dropout rates.', tr: 'Yeni politika, okul terki oranlarını azaltmayı hedefliyor.' }
        ],
        tags: ['IELTS', 'Education'],
        box: 1, interval: 1, dueAt: new Date()
      },
      {
        term: 'pose a threat',
        definitionEn: 'To present a danger',
        definitionTr: 'Tehdit oluşturmak',
        partOfSpeech: 'verb phrase',
        collocations: ['pose a risk', 'pose a challenge'],
        phraseBank: ['pose a serious threat to'],
        examples: [
          { en: 'Rising sea levels pose a threat to coastal cities.', tr: 'Yükselen deniz seviyeleri kıyı şehirleri için tehdit oluşturuyor.' }
        ],
        tags: ['IELTS', 'Environment'],
        box: 1, interval: 1, dueAt: new Date()
      }
    ];

    await Card.deleteMany({});
    await Card.insertMany(sample);
    console.log('✅ Seed inserted');
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
})();
