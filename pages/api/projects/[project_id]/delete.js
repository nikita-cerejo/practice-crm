export default async function handler(req, res) {
  if ("DELETE" != req.method) {
    return "";
  }
  const id = req.query.project_id;
  const response = await fetch(`${process.env.API_URL}/projects/${id}.json`, {
    method: "DELETE",
  });
  if (200 == response.status) {
    const data = await response.json();
    res.status(200).json({ message: "Project Deleted Successfully!" });
  } else {
    res.status(200).json({});
  }
}
