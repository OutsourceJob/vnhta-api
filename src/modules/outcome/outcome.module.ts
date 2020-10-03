import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutcomeEntity } from './outcome.entity';
import { OutcomeService } from './outcome.service';
import { OutcomeController } from './outcome.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OutcomeEntity])],
  controllers: [OutcomeController],
  providers: [OutcomeService],
  exports: [OutcomeService],
})
export class OutcomeModule {}
