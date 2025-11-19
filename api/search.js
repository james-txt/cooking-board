import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production'
    ? 'https://yourfrontenddomain.com'  // CHANGE THIS LATER
    : '*'
  );
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { query, tag, id } = req.query ?? {};
    await sql`SELECT 1`;

    let rows;
    if (id) {
      rows = await sql`
        SELECT id, category, name, picture, tag, ingredients, instructions
        FROM recipes WHERE id = ${id}
      `;
    } else if (tag) {
      rows = await sql`
        SELECT id, category, name, picture, tag, ingredients, instructions
        FROM recipes
        WHERE ${tag} = ANY(tag)
        LIMIT 50
      `;
    } else if (query) {
      rows = await sql`
        SELECT id, category, name, picture, tag, ingredients, instructions
        FROM recipes
        WHERE name ILIKE ${'%'+query+'%'}
        LIMIT 50
      `;
    } else {
      rows = await sql`
        SELECT id, category, name, picture, tag, ingredients, instructions
        FROM recipes
        LIMIT 20
      `;
    }

    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}
