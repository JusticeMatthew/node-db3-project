const db = require('../../data/db-config');

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findSteps,
  addStep,
};

// SCHEMES
function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes').where({ id }).first();
}

async function add(newScheme) {
  const [id] = await db('schemes').insert(newScheme);
  return findById(id);
}

function update(changes, id) {
  return db('schemes').where({ id }).update(changes);
}

function remove(id) {
  return db('schemes').where({ id }).del();
}

// STEPS
function findSteps(schemeId) {
  return db('steps as st')
    .join('schemes as sc', 'st.scheme_id', 'sc.id')
    .where({ scheme_id: schemeId });
}

async function addStep(newStep, id) {
  await db('steps').insert(newStep);
  return findSteps(id);
}
