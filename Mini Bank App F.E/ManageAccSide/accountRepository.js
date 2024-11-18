export async function getUserByID(id) {
  const promise = await fetch(`http://localhost:7000/saskaita/${id}`);
  try {
    if (promise.status !== 200) throw new Error('Answer from server negative');
    const result = await promise.json();
    return result;
  } catch (err) {
    console.error(`Error in function getUserById ${err}`);
  }
}
