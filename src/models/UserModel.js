const { authSecret, algorithm } = require('../components/env')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const app = require('express')()
const db = require('../components/db')
app.db = db

class UserModel {

    static encryptPassword = function (password) {
        const iv = Buffer.from(crypto.randomBytes(16))
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(authSecret), iv)
        let encrypted_password = cipher.update(password)
        encrypted_password = Buffer.concat([encrypted_password, cipher.final()])

        return `${encrypted_password.toString('hex')}:${iv.toString('hex')}`
    }

    static decryptPassword = function (encrypted_password) {
        const [encrypted, iv] = encrypted_password.split(':')
        const ivBuffer = Buffer.from(iv, 'hex')
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(authSecret), ivBuffer)
        let content = decipher.update(Buffer.from(encrypted, 'hex'))
        content = Buffer.concat([content, decipher.final()])

        return content.toString()
    }

    static registerUser = async function (login, password) {
        let query = {}
        if(login) query.login = login
        if(password) query.password = password

        app.db('users_table')
            .insert(query)
            .then(id => {
                return id
            })
            .catch(err => {
                app.db.destroy()
                console.error(err)
            })
    }

    static getUserLogin = async function (login) {
        return await app.db('users_table')
            .select('login', 'password')
            .where({login: login})
            .then(data => {
                return data[0]
            }).catch(err => {
                app.db.destroy()
                console.error(err)
            })
    }

    static getUser = async function (token) {
        return await app.db('users_table')
            .select('login')
            .where({ token: token})
            .then(data => {
                return data[0]
            }).catch(err => {
                app.db.destroy()
                console.error(err)
            })
    }

    static getEncryptDataBasePassword = async function (user) {
        return await app.db('users_table')
            .select('password')
            .where({login: user.login})
            .then(data => {
                return data[0]
            }).catch(err => {
                app.db.destroy()
                console.error(err)
            })
    }

    static validatePassword = async function (user) {
        const decryptLoginPassword = await UserModel.decryptPassword(user.password)
        const encryptDataBasePassword = await UserModel.getEncryptDataBasePassword(user)
        const decryptDataBasePassword = UserModel.decryptPassword(encryptDataBasePassword.password)

        return decryptLoginPassword === decryptDataBasePassword
    }

    static deleteUser = async function (token) {
        const user = await UserModel.getUser(token)

        return await app.db('users_table')
            .where({login: user.login})
            .del()
            .then(data => {
                return data[0]
            }).catch(err => {
                app.db.destroy()
                console.error(err)
            })
    }

    static updateUser = async function (token, newLogin, newPassword) {
        const user = await UserModel.getUser(token)

        return await app.db('users_table')
            .update({
                login: newLogin,
                password: newPassword
            })
            .where({login: user.login})
            .then(data => {
                return data[0]
            }).catch(err => {
                app.db.destroy()
                console.error(err)
            })
    }

    static generateToken = async function (data) {
        return jwt.sign({
            login: data.login,
        }, authSecret, { expiresIn: '1h' })
    }

    static addToken = async function (token, login) {
        return await app.db('users_table')
            .update({token: token})
            .where({login: login})
            .then(id => {
                return id
            })
            .catch(err => {
                app.db.destroy()
                console.error(err)
            })
    }

    static removeToken = async function(token) {
        const user = await UserModel.getUser(token)

        return await app.db('users_table')
            .update({token: ''})
            .where({login: user.login})
            .then(id => {
                return id
            })
            .catch(err => {
                app.db.destroy()
                console.error(err)
            })
    }

    static checkToken = function(token) {
        let decodedToken = jwt.verify(token, authSecret)

        return new Promise((resolve, reject) => {
            if (decodedToken) {
                resolve(decodedToken)
            } else {
                reject(decodedToken)
            }
        })
    }

}

module.exports = UserModel