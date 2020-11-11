/**
 * @fileoverview Controller de greenhouse
 */

const { authSecret } = require('../components/env')
const GreenhouseModel = require('../models/GreenhouseModel')
const DefaultResponse = require('../components/DefaultResponse')
const jwt = require('jsonwebtoken')
const express = require('express')
const express_app = express()

express_app.use(express.static('../public'));

express_app.post('/register', async (req, res) => {
    let temperature = req.body.temperature
    let humidity = req.body.humidity
    let ventilation = req.body.ventilation
    let irrigation = req.body.irrigation
    let id_user = req.body.id_user
   
    let greenhouseModel = await GreenhouseModel.registergreenhouse(temperature, humidity, ventilation, irrigation, id_user)
        .then(object => {
            let response = new DefaultResponse(
                false, {object}, 'RegisterResponse', 200
            )
            return res.status(response.status).send(response)
        })
        .catch(err => {
            let response = new DefaultResponse(
                true, 'Internal Server Error.', 'RegisterException', 500);
            return res.status(response.status).send(response)
        })
})

express_app.post('/updategreenhouse', async (req, res) => {
    let token = req.headers.authorization
    let newtemperature = req.body.temperature
    let newhumidity = req.body.humidity
    let newventilation = req.body.ventilation
    let newirrigation = req.body.irrigation
    let newid_user = req.body.id_user

    await jwt.verify(token, authSecret, function (err, decoded) {
        let greenhouseModel = GreenhouseModel.updategreenhouse(token, newtemperature, newhumidity, newventilation, newirrigation, newid_user)
            .then(object => {
                let response = new DefaultResponse(
                    false, {}, 'UpdateResponse', 200
                )
                return res.status(response.status).send(response);
            })
            .catch(err => {
                let response = new DefaultResponse(
                    true, 'Internal Server Error.', 'UpdateException', 500);
                return res.status(response.status).send(response);
            })
    })
})

express_app.post('/deleteGreenhouse', async (req, res) => {
    let token = req.headers.authorization

    await jwt.verify(token, authSecret, function (err, decoded) {
        let greenhouseModel = GreenhouseModel.deleteGreenhouse(token)
            .then(object => {
                let response = new DefaultResponse(
                    false, {}, 'DeleteResponse', 200
                )
                return res.status(response.status).send(response);
            })
            .catch(err => {
                let response = new DefaultResponse(
                    true, 'Internal Server Error.', 'DeleteException', 500);
                return res.status(response.status).send(response);
            })
    })
})

express_app.post('/getGreenhouse', async (req, res) => {
    let token = req.headers.authorization;

    await jwt.verify(token, authSecret, function (err, decoded) {
        let greenhouseModel = GreenhouseModel.getGreenhouse(token)
            .then(object => {
                console.log(object)
                let response = new DefaultResponse(
                false, {object, token}, 'greenhouseResponse', 200
                )
                return res.status(response.status).send(response);
            })
            .catch(err => {
                let response = new DefaultResponse(
                true, 'Internal Server Error.', 'greenhouseException', 500);
                return res.status(response.status).send(response)
            })
    })
})

module.exports = app => app.use('/greenhouse', express_app)