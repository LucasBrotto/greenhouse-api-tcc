const app = require('express')()
const db = require('../components/db')
app.db = db

class GreenhouseModel {

    static registergreenhouse = async function (temperature, humidity, ventilation, irrigation, id_user) {
        let query = {}
        if(temperature) query.temperature = temperature
        if(humidity) query.humidity = humidity
        if(ventilation) query.ventilation = ventilation
        if(irrigation) query.irrigation = irrigation
        if(id_user) query.id_user = id_user /* Como fazer para puxar o valor da outra tabela?*/

        app.db('greenhouse_table')
            .insert(query)
            .then(id => {
                return id
            })
            .catch(err => {
                app.db.destroy()
                console.error(err)
            })
    }

    static getGreenhouse = async function () {
        return await app.db('greenhouse_table')
            .select('temperature', 'humidity', 'ventilation', 'irrigation', 'id_user')
            .join('user', 'user.id', '=', 'greenhouse.id_user')//não tenho ctz c n tem q ter um where depois disso
            .then(data => {
                return data[0]
            }).catch(err => {
                app.db.destroy()
                console.error(err)
            })
    }

    static deleteGreenhouse = async function () {
        const greenhouse = await GreenhouseModel.getGreenhouse()

        return await app.db('greenhouse_table')
            .join('user', 'user.id', '=', 'greenhouse.id_user')//não tenho ctz c isso ta certo
            .where({id: greenhouse.id})
            .del()
            .then(data => {
                return data[0]
            }).catch(err => {
                app.db.destroy()
                console.error(err)
            })
    }

    static updateGreenhouse = async function (newtemperature, newhumidity, newventilation, newirrigation, newid_user) {
        const greenhouse = await GreenhouseModel.getGreenhouse(token)

        return await app.db('greenhouse_table')
            .update({
                temperature: newtemperature,
                humidity: newhumidity,
                ventilation: newventilation,
                irrigation: newirrigation,
                id_user: newid_user
            })
            .where({id: greenhouse.id})
            .then(data => {
                return data[0]
            }).catch(err => {
                app.db.destroy()
                console.error(err)
            })
    }

}

module.exports = GreenhouseModel