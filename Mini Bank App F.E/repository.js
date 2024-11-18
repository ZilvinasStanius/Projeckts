export async function createBankAcc(user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  const promise = await fetch(
    'http://localhost:7000/saskaita/sukurti',
    options
  );
  try {
    if (promise.status !== 201)
      throw new Error('Answer from server was negative');
    const result = await promise.json();
    return result;
  } catch (err) {
    console.errorO(`Error from createBankAcc function ${err}`);
  }
}
