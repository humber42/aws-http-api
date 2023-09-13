const AWS = require('aws-sdk');
AWS.config.update({region: "eu-est-01",endpoint:"http://localhost:8000"})
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = "userTable";

module.exports.findAll = async (event) =>{
    console.log("Inicio de la funcion findAll");

    try{
        console.log("Obteniendo todos los usuarios");
        const users = await dynamoDb.scan({TableName,}).promise();
        console.log("Usuarios obtenidos ", users)
        return {statusCode:200, body: JSON.stringify(users,null,2)}
    }catch (err){
        console.log("Error al obtener todos los usuarios ", err);
        return {statusCode:500, body: JSON.stringify({message: "Error al obtener todos los usuarios"})};
    }
}