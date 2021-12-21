function getAllCategories(posts) {
  const categorySet = new Set();
  posts.forEach(({ categories }) =>
    categories.forEach((category) => categorySet.add(category))
  );
  return [...categorySet];
}

export default getAllCategories;
