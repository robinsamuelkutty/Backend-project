var db= require("../config/connection")
var collections = require('../config/collection');
const bcrypt = require('bcrypt');
const { response } = require("express");
const { resolve } = require("path")
module.exports  ={
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.Password = await bcrypt.hash(userData.Password, 10)
            db.get().collection(collections.USER_COLLECTION).insertOne(userData).then((data) => {

                db.get().collection(collections.USER_COLLECTION).findOne({ _id: data.insertedId }).then((details) => {

                    resolve(details)
                    
                })

            })

        })
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve, reject)=>{
            let loginStatus = false;
            let response = {}
            let user =await db.get().collection(collections.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password, user.Password).then((status)=>{
                    if(status){
                        console.log('login Succesful', status);
                        response.user = user;
                        response.status = true;
                        resolve(response)
                    }else{
                        console.log('login failed', status);
                        resolve({status:false})
                    }
                })
            }else{
                console.log('user did not find');
                resolve({status:false})
            }
        })
    }
}