export async function getAllProjects() {
  const response = await fetch(`${process.env.API_URL}/projects.json`);
  const data = await response.json();

  const projects = [];

  for (const key in data) {
    projects.push({
      id: key,
      ...data[key],
    });
  }

  return projects;
}

export async function getProjectById(id) {
  const response = await fetch(`${process.env.API_URL}/projects/${id}.json`);
  const data = await response.json();
  const project = data;

  return project;
}

export async function getAllUsers() {
  const response = await fetch("/api/users");
  const data = await response.json();

  return data.users;
}

export async function getUserByLocalId(localId) {
  const response = await fetch(
    `${process.env.API_URL}/users.json?orderBy="local_id"&equalTo="${localId}"`
  );
  const data = await response.json();
  let user = {};
  for (const key in data) {
    user = {
      id: key,
      ...data[key],
    };
  }
  return user;
}

export async function getUserById(id) {
  const response = await fetch(`${process.env.API_URL}/users/${id}.json`);
  const data = await response.json();
  const user = data;

  return user;
}

export async function getAllTasks() {
  const response = await fetch(`${process.env.API_URL}/tasks.json`);
  const data = await response.json();

  const projects = await getAllProjects();
  let project_list = [];
  projects.forEach((project) => {
    project_list[project.id] = project.name;
  });

  const tasks = [];

  for (const key in data) {
    tasks.push({
      id: key,
      project_name: project_list[data[key].project_id] ?? "",
      ...data[key],
    });
  }

  return tasks;
}

export async function getTaskById(id) {
  const response = await fetch(`${process.env.API_URL}/tasks/${id}.json`);
  const data = await response.json();
  let task = data;
  task.id = id;
  return task;
}

export async function getTaskByProjectId(project_id) {
  const response = await fetch(
    `${process.env.API_URL}/tasks.json?orderBy="project_id"&equalTo="${project_id}"`
  );

  const data = await response.json();
  const { name } = await getProjectById(project_id);

  const tasks = [];

  for (const key in data) {
    tasks.push({
      id: key,
      project_name: name,
      ...data[key],
    });
  }

  return tasks;
}
