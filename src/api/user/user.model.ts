import { Column, Entity, OneToMany } from 'typeorm';
import { Item } from '../item/item.model';
import { FixedEntity } from '../../utils/fixed-entity';

@Entity()
export class User extends FixedEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    default: true,
  })
  status: boolean;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
