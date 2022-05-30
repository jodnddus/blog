export default class Post {
  id: string;
  html: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  categories: string[];

  constructor(node) {
    const { id, html, frontmatter, fields, excerpt } = node;
    const { slug } = fields;
    const { categories, title, date } = frontmatter;

    this.id = id;
    this.html = html;
    this.slug = slug;
    this.title = title;
    this.excerpt = excerpt;
    this.date = date;
    this.categories = categories;
  }
}