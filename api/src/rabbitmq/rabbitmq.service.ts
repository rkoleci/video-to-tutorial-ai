import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connect, Connection, Channel } from 'amqplib';

@Injectable()
export class RabbitMqService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;
  private channel: Channel;

  async onModuleInit() {
    try {
      this.connection = await connect('amqp://myuser:mypassword@localhost:5672');
      this.channel = await this.connection.createChannel();
      console.log('✅ RabbitMQ connected and channel created');

    } catch (error) {
      console.error('❌ Failed to connect to RabbitMQ:', error);
      throw error;
    }
  }

  async sendMessage(title: string): Promise<void> {
    try {
      if (!this.channel) {
        throw new Error('Channel is not initialized');
      }

      const queue = 'transcribe';
      const msg = title;

      await this.channel.assertQueue(queue, { durable: false });
      this.channel.sendToQueue(queue, Buffer.from(msg));
      console.log('📤 Sent message:', msg);

      
      this.receiveMessage('transcribe')
    } catch (error) {
      console.error('❌ Failed to send message:', error);
    }
  }

  async receiveMessage(queue: string): Promise<void> {
     if (!this.channel) {
        throw new Error('Channel is not initialized');
      }


        this.channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        this.channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
  }

  async onModuleDestroy() {
    try {
      await this.channel?.close();
      await this.connection?.close();
      console.log('🔌 RabbitMQ connection and channel closed');
    } catch (error) {
      console.error('❌ Error during shutdown:', error);
    }
  }
}
