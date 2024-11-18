export async function deleteRoute(id) {
  const options = { method: 'DELETE' };
  const promise = await fetch(
    `http://localhost:7000/saskaita/${id}/delete`,
    options
  );
  try {
    if (promise.status !== 204)
      throw new Error('Error bad response from server');
  } catch (err) {
    console.log('Error in function deleteRoute', err);
  }
}
