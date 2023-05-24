import express from 'express';
import axios from 'axios';

export const router = express.Router();

router.post('/createuser', async (req, res) => {
  const { username, firstName, lastName, email, password, phone, userStatus } = req.body;

  const newUser = {
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    phone: phone,
    userStatus: userStatus
  }

  try {
    const response = await axios.post('https://frontend-test.frenet.dev/v1/user', newUser);
    const element = await response.data;


    res.status(201).json({ user: element, message: 'usuario criado com sucesso' })

  } catch (error) {
    res.status(400).json({ message: 'erro na criacao de usuario' })
  }


})

router.put('/edituser/:name', async (req, res) => {
  const { username, firstName, lastName, email, password, phone, userStatus } = req.body;
  const name = req.params.name;


  const newUser = {
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    phone: phone,
    userStatus: userStatus
  }


  try {
    const response = await axios.put(`https://frontend-test.frenet.dev/v1/user/${name}`, newUser);

    const element = await response.data;
    res.status(200).json({ user: element, message: 'usuario editado com sucesso' })

  } catch (error) {
    res.status(400).json({ message: 'erro na edicao de usuario' })
  }


})

router.delete('/deleteuser/:name', async (req, res) => {
  const name = req.params.name;

  try {
    const response = await axios.delete(`https://frontend-test.frenet.dev/v1/user/${name}`);
    res.status(200).json({ message: 'usuario deletado com sucesso' })

  } catch (error) {
    res.status(400).json({ message: 'erro na edicao de usuario' })
  }
})

router.get('/getuser/:name', async (req, res) => {
  const name = req.params.name;

  try {
    const response = await axios.get(`https://frontend-test.frenet.dev/v1/user/${name}`);
    res.status(200).json({ message: 'usuario obtido com sucesso' })

  } catch (error) {
    res.status(400).json({ message: 'usuario nao encontrado' })
  }
})

router.post('/quote', async (req, res) => {
  const { zipCodeSource, zipCodeDestination, weight, dimension } = req.body;

  const newQuote = {
    zipCodeSource: zipCodeSource,
    zipCodeDestination: zipCodeDestination,
    weight: weight,
    dimension: {
      width: dimension.width,
      heigth: dimension.heigth,
      length: dimension.lengthProduct
    }
  }


  try {
    const response = await axios.post('https://frontend-test.frenet.dev/v1/quote', newQuote);
    const element = await response.data;


    res.status(201).json({ quote: element, message: 'Cotação feita com sucesso' })

  } catch (error) {
    res.status(400).json({ message: 'erro na cotação' })
  }
})
