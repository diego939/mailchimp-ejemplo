import express from 'express';
import cors from 'cors'; // Importa cors
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Habilita CORS
app.use(bodyParser.json());

// Configura tus credenciales de Mailchimp
const API_KEY = '0bbed3f84049549a184b9e17dbcb4564-us8';
const LIST_ID = '6201359ece';
const DATACENTER = 'us8'; // Cambia esto a tu datacenter de Mailchimp
const CAMPAIGN_ID = 'c4bf77c632'; // ID de la campaña

// Endpoint para agregar suscriptores a Mailchimp
app.post('/add-subscriber', async (req, res) => {
  const { email } = req.body;

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;
  const data = {
    email_address: email,
    status: 'subscribed',
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `apikey ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    res.status(200).send(response.data);
  } catch (error) {
    console.error('Error al agregar suscriptor:', error.response.data);
    res.status(500).send(error.response.data);
  }
});

app.post('/send-draft-campaign', async (req, res) => {

  const { campaingId } = req.body;
  
  //const url = `https://${DATACENTER}.api.mailchimp.com/3.0/campaigns/${CAMPAIGN_ID}/actions/send`;
  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/campaigns/${campaingId}/actions/send`;

  try {
    const response = await axios.post(url, {}, {
      headers: {
        Authorization: `apikey ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    res.status(200).send('Campaña enviada con éxito '+response.data);
  } catch (error) {
      console.error('Error al enviar la campaña:', error.response?.data || error.message);
      const message = 'Error al enviar la campaña: ' + (error.response?.data?.detail || error.message);
      res.status(500).send(message);
    }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});