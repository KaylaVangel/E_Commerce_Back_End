const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  //check!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'category_id'],
      },
    ],
  })
    .then(dbTagAll => res.json(dbTagAll))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  //check!!!!!!!!!!!!!!!!
  Tag.findOne ({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'category_id'],
      },
    ],
  })
  .then(dbTagOne => {
    if (!dbTagOne) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbTagOne);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  //check!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbNewTag => res.json(dbNewTag))
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  //check!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  }
  )
  .then(dbUpTag => {
    if (!dbUpTag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbUpTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  //check!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  Tag.destroy({
    where: {
      id:req.params.id
    }
  })
  .then(dbDelTag => {
    if (!dbDelTag) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbDelTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
