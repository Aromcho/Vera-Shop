// UserManager.fs.js
import fs from "fs";
import crypto from "crypto";

class UsersManager {
    constructor() {
        this.path = "./data/fs/files/users.json";
        this.init();
    }

    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const stringData = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, stringData);
            console.log("Archivo creado");
        } else {
            console.log("El archivo ya existe");
        }
    }

    create(data) {
        const user = {
            id: crypto.randomBytes(12).toString("hex"),
            photo: data.photo || "",
            email: data.email || "",
            password: data.password || "",
            role: data.role || ""
        };

        try {
            if (!user.email || !user.password) {
                throw new Error("Faltan propiedades obligatorias para crear el usuario (email y/o contraseña).");
            }
            const users = JSON.parse(fs.readFileSync(this.path));
            users.push(user);
            fs.writeFileSync(this.path, JSON.stringify(users, null, 2));
        } catch (error) {
            console.error("Error al crear el usuario:", error.message);
        }
    }

    read() {
        try {
            return JSON.parse(fs.readFileSync(this.path));
        } catch (error) {
            console.error("Error al leer los usuarios:", error.message);
            return [];
        }
    }

    readOneUser(email) {
        try {
            const users = JSON.parse(fs.readFileSync(this.path));
            const user = users.find(user => user.email === email);
            if (!user) {
                throw new Error(`No se encontró ningún usuario con el correo electrónico '${email}'.`);
            }
            return user;
        } catch (error) {
            console.error("Error al leer el usuario:", error.message);
            return null;
        }
    }

    destroyUser(email) {
        try {
            let users = JSON.parse(fs.readFileSync(this.path));
            const initialLength = users.length;
            users = users.filter(user => user.email !== email);
            if (users.length === initialLength) {
                throw new Error(`No se encontró ningún usuario con el correo electrónico '${email}'.`);
            }
            fs.writeFileSync(this.path, JSON.stringify(users, null, 2));
            console.log(`Usuario con el correo electrónico '${email}' eliminado correctamente.`);
        } catch (error) {
            console.error("Error al eliminar el usuario:", error.message);
        }
    }
}



export default UsersManager;
