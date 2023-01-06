db.createUser(
        {
            user: "modavastra",
            pwd: "modavastra",
            roles: [
                {
                    role: "readWrite",
                    db: "modavastra"
                }
            ]
        }
);
