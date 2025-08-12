const Card = require('../models/Card');

// Tüm kartları getir
const getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
};

// Tek kart ekle
const createCard = async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create card' });
  }
};

// Kart güncelle
const updateCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update card' });
  }
};

// Kart sil
const deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: 'Card deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete card' });
  }
};

// JSON'dan toplu ekleme
const importCardsFromJson = async (req, res) => {
  try {
    const cards = req.body; // Body'de JSON array beklenir
    if (!Array.isArray(cards)) {
      return res.status(400).json({ error: 'Body must be an array of cards' });
    }
    const inserted = await Card.insertMany(cards);
    res.status(201).json({ message: 'Cards imported', count: inserted.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to import cards' });
  }
};

// JSON export
const exportCardsToJson = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export cards' });
  }
};

module.exports = {
  getCards,
  createCard,
  updateCard,
  deleteCard,
  importCardsFromJson,
  exportCardsToJson
};
