import amqp from 'amqplib'

async function connect(){
    const ampqServer="amqp://localhost:5672"
    const connection=await amqp.connect(ampqServer)
    const channel=await connection.createChannel();
    await channel.assertQueue("PRODUCT")
}
export default connect;