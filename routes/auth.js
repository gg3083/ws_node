const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var request = require('request');

const UserData = require('../mock');
const JwtUtil = require("../pkg/jwt")


router.post('/token', multipartMiddleware, function ( req, res, next) {
    let username = `${req.body.username}`;
    let password = `${req.body.password}`;
    console.log('phone:', username)
    console.log('message:', password)
    console.log('body:', req.body)
    let userInfo = {}
    UserData.forEach(item =>{
        if (item.user_name === username){
            userInfo = item
        }
    })
    console.log('userInfo:', userInfo)
    if (!userInfo || Object.keys(userInfo).length === 0){
        res.send({
            code: 1, msg: 'err', data: {

            }
        });
        return
    }
    var generateToken = JwtUtil.generateToken(username, userInfo.password);
    res.send({
        code: 0, msg: 'ok', data: {
            "username": username,
            "body": req.body,
            "userInfo": userInfo,
            "token": generateToken,
        }
    });

});


module.exports = router;
