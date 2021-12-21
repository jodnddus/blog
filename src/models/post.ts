export default class Post {
  id: string;
  html: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  categories: string[];

  constructor(node) {
    const { id, html, frontmatter, fields } = node;
    const { slug } = fields;
    const { categories, title, date, description } = frontmatter;

    this.id = id;
    this.html = html;
    this.slug = slug;
    this.title = title;
    this.description = description;
    this.date = date;
    this.categories = categories;
  }
}