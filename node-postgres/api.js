const { response } = require("express");

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'phonedealer',
  host: 'localhost',
  database: 'phones',
  password: '1234',
  port: 5432
});

//GET All
const getAllPhones = async (request, response) => {
  pool.query('SELECT * FROM phones ORDER BY price DESC', (error, results) => {
    response.status(200).json(results.rows);
  });
};

//GET Phone by id
const getPhoneById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('SELECT * FROM phones WHERE id = $1', [id], (error, results) => {
    response.status(200).json(results.rows);
});
};

//CREATE New phone
const addPhone = async (request, response) => {
  const { brand, model, display, price, photo } = request.body;
  pool.query('INSERT INTO phones (brand, model, display, price, photo) VALUES ($1, $2, $3, $4, $5)', [brand, model, display, price, photo], (error, results) => {
    response.status(201).send(`Phone added successfully.`);
});};
//UPDATE Phone info
const updatePhone = (request, response) => {
  const { brand, model, display, price, photo } = request.body;
  pool.query('UPDATE phones SET brand, model, display, price, photo) VALUES ($1, $2, $3, $, $5)', [brand, model, display, price, photo], (error, results) => {
    response.status(201).send(`Phone info updated successfully.`)});};

//DELETE Phone by id
const deletePhone = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('DELETE FROM phones WHERE id = $1', [id], (error, results) => {
    response.status(200).send(`Phone #${id} deleted.`);
});
};

module.exports = {
  getAllPhones,
  getPhoneById,
  addPhone,
  updatePhone,
  deletePhone
};