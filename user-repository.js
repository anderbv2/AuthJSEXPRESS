import DBLocal from "db-local";
import crypto from 'crypto'
import bcript from 'bcrypt'
import { SALT_ROUNDS } from './config.js'

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
})

export class UserRepository {
    static async create ({ username, password }) {
        // 1. validaciones de username (opcional: zod)
        Validation.username(username);
        Validation.password(username);

        // 2 . Asegurarse que el username no existe
        const user = User.findOne({ username })
        if (user) throw new Error('username already exists')
    
        const id = crypto.randomUUID();
        const hashedPassword = await bcript.hash(password, SALT_ROUNDS) // hashSync bloque el thread principal


        User.create({
            _id: id,
            username,
            password: hashedPassword,
        }).save()

        return id
    }
    static async login ({ username, password }) {
        Validation.username(username);
        Validation.password(password);

        const user = User.findOne({ username })
        if(!user) throw new Error('user not found')
        
        const isValid = await bcript.compare(password, user.password)
        if(!isValid) throw new Error('invalid password')
        const { password: _, ...publicUser } = user
        return publicUser

        
    } 
    // static create ({ username, password }) {}
}

class Validation {
    static username (username) {
        if (typeof username !== 'string') throw new Error('username must be a string')
        if (username.length < 3) throw new Error('username must be at least 3 characters long')
    
    }

    static password (password) {
        if (typeof password !== 'string') throw new Error('password must be a string')
        if (password.length < 6) throw new Error('password must be at least 6 characters long')
    }
}