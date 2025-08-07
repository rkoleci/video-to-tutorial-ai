import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, Connection, Channel } from 'amqplib';

@Injectable()
export class RabbitMqService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;
  private channel: Channel;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    try {
      this.connection = await connect(`amqp://${this.configService.get('RBMQ_USER')}:${this.configService.get('RMBQ_PASSWORD')}@localhost:${this.configService.get('RBMQ_PORT')}`);
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

      const queue = 'video';
      const msg = title || 'message'

      await this.channel.assertQueue(queue, { durable: true });
      this.channel.sendToQueue(queue, Buffer.from(msg));
      console.log('📤 Sent message:', msg);

      
      // this.receiveMessage('transcribe')
    } catch (error) {
      console.error('❌ Failed to send message:', error);
    }
  }

  async receiveMessage(queue: string): Promise<void> {
    console.log(111, { queue})
     if (!this.channel) {
        throw new Error('Channel is not initialized');
      }


        this.channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        this.channel.consume(queue, function(msg) { 
            console.log(" [x] Received %s", msg.content.toString(), ' Time: ', new Date().toISOString());
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
