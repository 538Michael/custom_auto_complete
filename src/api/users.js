async function getUsers(filter, delay) {
  await new Promise((resolve) => setTimeout(resolve, delay ?? 1000));
  let users = [
    {
      value: 1,
      label: "Carlos Silva Lima",
    },
    {
      value: 2,
      label: "Carlito Ramos Junior",
    },
    {
      value: 3,
      label: "Paulo Felipe Castro",
    },
  ];

  if (filter) {
    users = users.filter((user) =>
      user.label.toLowerCase().includes(filter.toLowerCase())
    );
  }
  return users;
}

export default getUsers;
