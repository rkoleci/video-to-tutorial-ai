import amqp from 'amqplib';
import * as dotenv from 'dotenv';
import * as path from 'path';

const env = process.env.NODE_ENV || 'development';
console.log(111, 'MODE: ', env)

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${env}`)
});
 

const RABBITMQ_URL = `amqp://${process.env.RBMQ_USER}:${process.env.RMBQ_PASSWORD}@localhost:${process.env.RBMQ_PORT}`;
console.log(111, 'RABBITMQ_URL: ', RABBITMQ_URL)
const QUEUE_NAME = 'video';
const MESSAGE_COUNT = 1000 * 1000;
const MESSAGE_CONTENT = 'Load test message content';

async function produceMessages() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log('Start Current timestamp:', new Date().toISOString());    

    for (let i = 1; i <= MESSAGE_COUNT; i++) {
      const success = channel.sendToQueue(
        QUEUE_NAME,
        Buffer.from(`${MESSAGE_CONTENT} #${i}`)
      );

      if (!success) {
        // Backpressure: wait for drain event before continuing
        await new Promise<void>((resolve) =>
          channel.once('drain', () => resolve())
        );
      }

      if (i % 1000 === 0) {
        console.log(`Sent ${i} messages`);
      }
    }

    await channel.close();
    await connection.close();

    console.log(`Finished sending ${MESSAGE_COUNT} messages`);
  } catch (error) {
    console.error('Error in producer:', error);
  }
}

produceMessages();
