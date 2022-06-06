const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll()
    .then(dbCategory => res.json(dbCategory))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

  // find all categories
  // be sure to include its associated Products
  //done!!!!!!!!!!!!!
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name',
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price'],
      },
    ]
  })
    .then(dbCategory => {
      if (!dbCategory) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // find one category by its `id` value
  // be sure to include its associated Products
  //done!!!!!!!!!
});

router.post('/', (req, res) => {
  // create a new category
  //check!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbNewCat => res.json(dbNewCat))
  .catch(err => {
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  //check!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  })
    .then(dbUpdateCat => {
      if (!dbUpdateCat) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbUpdateCat);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  //check!!!!!!!!!!!!!!!!!!!!!!!I think it works
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCatDel => {
    if (!dbCatDel) {
      res.status(404).json({ message: 'No category foudn with this id' });
      return;
    }
    res.json(dbCatDel);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
