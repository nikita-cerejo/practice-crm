import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token || "admin" != token.role) {
    // invalid token
    res.status(401).json({ error: { message: "Unauthorized!" } });
    return "";
  }

  const id = req.query.task_id;
  if ("DELETE" != req.method || !id) {
    res.status(400).json({ error: { message: "Bad request!" } });
    return "";
  }

  const response = await fetch(`${process.env.API_URL}/tasks/${id}.json`, {
    method: "DELETE",
  });

  if (200 == response.status) {
    const data = await response.json();
    res.status(200).json({ message: "Task Deleted Successfully!" });
  } else {
    res.status(400).json({ error: { message: "Something went wrong!" } });
  }
}
