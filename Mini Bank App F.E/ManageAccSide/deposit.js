export async function addDeposit(id, amount) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  };
  const promise = await fetch(
    `http://localhost:7000/saskaita/${id}/imoka`,
    options
  );

  try {
    if (promise.status !== 200)
      throw new Error('Atsakymas is serverio yra neigiamas');
    const result = await promise.json();
    return result;
  } catch (err) {
    console.error(`Klaida getData funkcijoje ${err}`);
  }
}
