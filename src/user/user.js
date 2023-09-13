const AWS = require('aws-sdk');
const {v4} = require('uuid')
AWS.config.update({region: "eu-east-01",endpoint:"http://localhost:8000"})
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = "userTable";

module.exports.findAll = async (event) =>{
    console.log("Inicio de la funcion findAll");

    try{
        console.log("Obteniendo todos los usuarios");
        const {Items} = await dynamoDb.scan({TableName,}).promise();
        console.log("Usuarios obtenidos ", Items.length)
        return {statusCode:200, body: JSON.stringify(Items,null,2)}
    }catch (err){
        console.log("Error al obtener todos los usuarios ", err);
        return {statusCode:500, body: JSON.stringify({message: "Error al obtener todos los usuarios"})};
    }
}

module.exports.create = async (event)=>{
    console.log("Inicio del insertar")
    try {
        const {username, password} = JSON.parse(event.body);
        const id = v4();
        console.log(`Creando el usuario de id: ${id}, nombre de usuario: ${username}`)
        await dynamoDb.put({TableName, Item: {id, username, password}}).promise()
        console.log("Usuario creado con exito")
        return {statusCode:200,body: JSON.stringify({id,username,password})};
    }catch (error){
        console.log("Error: ",error);
        return {statusCode:500, body: JSON.stringify({message: "error al crear el usuario"})};
    }

}