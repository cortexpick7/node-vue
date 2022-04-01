const express = require('express');
const app = express();
const port = 5050;

app.use(express.json());

app.listen(port, () => {
  console.log(`Ty petuh na porte: ${port}` );
});

const api = require('./api');

app.get('/phones/', api.getAllPhones);
app.get('/phones/:id', api.getPhoneById);
app.post('/phones/', api.addPhone);
app.put('/phones/:id', api.updatePhone);
app.delete('/phones/:id', api.deletePhone)