import amqp from 'amqplib'
let channel
let connection
async function connect(){
    const ampqServer="amqp://localhost:5672"
     connection=await amqp.connect(ampqServer)
     channel=await connection.createChannel();
    await channel.assertQueue("ORDER")
}
export default connect;
export {channel,connection}
