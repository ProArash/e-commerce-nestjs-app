import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FixedEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
