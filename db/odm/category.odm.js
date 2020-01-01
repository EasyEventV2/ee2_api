import Category from 'db/models/Category';

async function findAll() {
  const listCategories = await Category.find();
  return listCategories;
}

export default {
  findAll,
};
