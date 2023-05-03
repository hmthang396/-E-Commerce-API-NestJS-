import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseService } from './firebase.service';

@Module({
  providers: [FirebaseService],
  exports:[FirebaseService]
})
export class FirebaseModule {}
