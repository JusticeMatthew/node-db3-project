const db = require('../../data/db-config');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  remove,
};

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes').where({ id }).first();
}

function findSteps(schemeId) {
  return db('steps as st')
    .join('schemes as sc', 'st.scheme_id', 'sc.id')
    .where({ scheme_id: schemeId });
}

async function add(newScheme) {
  const [id] = await db('schemes').insert(newScheme);

  return findById(id);
}

function remove(id) {
  return db('schemes').where({ id }).del();
}
