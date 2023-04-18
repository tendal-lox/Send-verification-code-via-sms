'use strict'

const axios = require('axios')
const superagent = require('superagent')
const async = require('async')
const _ = require('lodash')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = async function getListOfUsers () { 
    async function getUsers () {
        const allUsersResult = await axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users'
        })
        return allUsersResult.data
    }
    
    const queueGetUsersPost = async.queue((task, cb) => {
        setTimeout(async () => {
            async.waterfall([
                function getUsersPost (callback) {
                    superagent
                        .get(`https://jsonplaceholder.typicode.com/posts?id=${task}`)
                        .end((err, res) => {
                            callback(null, res.body)
                        })
                },
                function db (arg, callback) {
                    callback(null, `id: ${task} => ${arg[0].title}`)
                }
            ], (err, result) => {
                if (err) {
                    console.error(err)
                }
                redis.set(`${task}`, result)
                console.log(result)
            })
            cb()
        }, 1000)
    })
    
    async function start () {
        const allUsers = await getUsers()
        _.forEach(allUsers, res => {
            queueGetUsersPost.push(res.id)
        })
    }
    start()
}