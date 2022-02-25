export default async function handler(req, res) {
  if ("GET" != req.method) {
    return "";
  }
  const response = await fetch(`${process.env.API_URL}/users.json`);
  if (200 == response.status) {
    const data = await response.json();

    const users = [];

    for (const key in data) {
      users.push({
        id: key,
        ...data[key],
      });
    }
    res.status(200).json({ users: users });
  } else {
    res.status(200).json({});
  }
}
