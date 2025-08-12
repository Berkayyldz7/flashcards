const express = require('express');
const {
  getCards,
  createCard,
  updateCard,
  deleteCard,
  importCardsFromJson,
  exportCardsToJson
} = require('../controllers/cardController');

const router = express.Router();

// Mevcut endpointler
router.get('/', getCards);
router.post('/', createCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

// JSON'dan toplu ekleme
router.post('/import', importCardsFromJson);

// JSON export
router.get('/export', exportCardsToJson);

module.exports = router;
