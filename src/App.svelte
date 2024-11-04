<script>
  import { onMount } from 'svelte';
  import axios from 'axios';

  let email = ''; // Cambié la ubicación de la declaración de email
  let message = '';
  const server = 'http://localhost:3000';

  async function addSubscriber() {
    const response = await fetch(server + '/add-subscriber', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    

    if (response.ok) {
      alert('Suscriptor agregado con éxito');
      email = '';
    } else {
      alert('Error al agregar suscriptor');
    }
  }

  let campaingId = '';
  const sendCampaign = async () => {

    try {
      await axios.post('http://localhost:3000/send-draft-campaign',  { campaingId } );
      message = 'Se ha enviado la campaña al correo!';
    } catch (error) {
      message = 'Error al enviar la campaña: ' + (error.response?.data?.detail || error.message);
    }
  };
</script>

<main>
  <h1>Subscribirse con Mailchimp</h1>
  <form on:submit|preventDefault={addSubscriber}>
    <input type="email" placeholder="Tu correo" bind:value={email} required />
    <button type="submit">Suscribirse</button>
  </form>

  <h1>Enviar una campaña de Mailchimp</h1>
  <form on:submit|preventDefault={sendCampaign}>
    <input type="text" placeholder="ID de la campaña" bind:value={campaingId} required />
    <button type="submit">Enviar Campaña</button>
  </form>
  
  {#if message}
    <p>{message}</p>
  {/if}
</main>

<style>

</style>
