import { QualityOfLifeEntity } from 'src/modules/article/quality-of-life/quality-of-life.entity';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, OneToMany
} from 'typeorm';

@Entity({ name: 'data_collecting_method' })
export class DataCollectingMethodEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(type => QualityOfLifeEntity, q => q.dataCollectingMethodId,
    {
      cascade: true
    }
  )
  qualityOfLives: QualityOfLifeEntity[];
}
