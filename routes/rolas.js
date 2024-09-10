const express = require('express');
const router = express.Router();

// Get Rolas
router.get('/', function(req, res) {
  res
    .status(200)
    .json({
      success: true,
      msg: 'Show all rolas',
    });
});

// Get a single Rola
router.get('/:id', function(req, res) {
  res
    .status(200)
    .json({
      success: true,
      msg: 'Show rola #' + req.params.id,
    });
});

// Add new Rola
router.post('/', function(req, res) {

  res.status(201).json({ rola: req.rola });
});

// Update a Rola
router.put('/:id', function(req, res) {
  res
  .status(201)
  .json({
    success: true,
    msg: 'Update rola #' + req.params.id,
  });
});

// Delete a Rola
router.delete('/:id', function(req, res) {
  res
    .status(201)
    .json({
      success: true,
      msg: 'Delete rola #' + req.params.id,
    });
});

module.exports = router;