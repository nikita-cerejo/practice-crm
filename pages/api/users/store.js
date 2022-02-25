export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  if ("POST" != req.method || !body.email || !body.password) {
    return res.status(422).json({ message: "Invalid Credentials" });
  }

  const response = await fetch(
    `${process.env.AUTH_URL}signUp?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // console.log(response);
  if (200 <= response.status || 400 > response.status) {
    const data = await response.json();
    const user_data = {
      local_id: data.localId,
      token: data.idToken,
      name: body.name,
      email: body.email,
      mobile: body.mobile,
      role: body.role,
      is_active: body.is_active,
    };
    const stored_user = storeUserData(user_data);
    if (true == stored_user) {
      res.status(200).json({ message: `User ${body.name} Added!` });
    } else {
      res.status(400).json({ message: stored_user.message });
      // delete user
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
}

async function storeUserData(user_data) {
  const response = await fetch(`${process.env.API_URL}/users.json`, {
    method: "POST",
    body: JSON.stringify(user_data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (200 <= response.status || 400 > response.status) {
    return true;
  } else {
    return { message: response.statusText };
  }
}
