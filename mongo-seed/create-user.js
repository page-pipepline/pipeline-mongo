const targetUser = db.getUser('mongouser');
if (!targetUser) {
  db.createUser(
    {
      user: "mongouser",
      pwd: "password",
      roles: [
        { "role": "clusterAdmin", "db": "admin" },
        { "role": "dbAdminAnyDatabase", "db": "admin" },
        { "role": "userAdminAnyDatabase", "db": "admin" },
        { "role": "readWriteAnyDatabase", "db": "admin" }
      ],
    }
  );
}
