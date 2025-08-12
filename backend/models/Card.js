const mongoose = require('mongoose');

const ExampleSchema = new mongoose.Schema(
  { en: String, tr: String },
  { _id: false }
);

const cardSchema = new mongoose.Schema(
  {
    deckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck' }, // opsiyonel; deck'i sonra ekleyeceğiz
    term: { type: String, required: true },          // EN kelime/ifade
    definitionEn: { type: String, required: true },  // EN açıklama
    definitionTr: { type: String, required: true },  // TR anlam
    partOfSpeech: { type: String },                  // noun/verb/adj/...
    collocations: [{ type: String, default: [] }],
    phraseBank: [{ type: String, default: [] }],     // hazır kalıp/ifade
    examples: { type: [ExampleSchema], default: [] },
    ipa: { type: String },
    tags: [{ type: String, default: [] }],

    // SRS alanları
    box: { type: Number, default: 1 },
    interval: { type: Number, default: 1 },          // gün
    dueAt: { type: Date, default: () => new Date() },
    reps: { type: Number, default: 0 },
    lapses: { type: Number, default: 0 },
    lastReviewedAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);
