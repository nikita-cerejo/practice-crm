export default async function handler(req, res) {
  if ("PATCH" != req.method) {
    return "";
  }
  const id = req.query.task_id;
  const response = await fetch(`${process.env.API_URL}/tasks/${id}.json`, {
    method: "PATCH",
    body: JSON.stringify({
      is_done: true,
    }),
  });
  if (200 == response.status) {
    const data = await response.json();
    res.status(200).json({ message: "Task Updated Successfully!" });
  } else {
    res.status(200).json({});
  }
}
