class UsersManager {
    static quantity = 0;
    static #users = [];

    createUser(data) {
        const user = {
            id: UsersManager.quantity === 0 ? 1 : UsersManager.#users[UsersManager.quantity - 1].id + 1,
            photo: data.photo || "",
            email: data.email || "",
            password: data.password || "",
            role: data.role || ""
        };

        if (!user.email || !user.password) {
            console.log("Faltan propiedades obligatorias para crear el usuario (email y/o contraseña).");
            return;
        }

        UsersManager.#users.push(user);
        UsersManager.quantity++;
    }

    readUsers() {
        return UsersManager.#users;
    }
}

const usersManager = new UsersManager();

usersManager.createUser({ photo: "user1.jpg", email: "usuario1@example.com", password: "123456", role: "admin" });
usersManager.createUser({ photo: "user2.jpg", email: "usuario2@example.com", password: "password123", role: "user" });
usersManager.createUser({ photo: "", email: "usuario3@example.com", password: "abc123", role: "user" });
usersManager.createUser({ email: "usuario4@example.com", password: "26398322", role: "user" });

console.log(usersManager.readUsers());
