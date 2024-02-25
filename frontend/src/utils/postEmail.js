// En tu archivo de utilidades o donde prefieras
async function postEmail(emailData) {
  try {
    const response = await fetch(`${window.location.origin}/api/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error('Error al enviar el correo electrónico');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
}

export default postEmail;
