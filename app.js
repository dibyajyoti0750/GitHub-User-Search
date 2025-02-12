async function getRes(userName) {
  try {
    const url = `https://api.github.com/users/${userName}`;
    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
