import { Entity, OneToMany } from 'typeorm';
import { FixedEntity } from '../../utils/fixed-entity';
import { Item } from '../item/item.model';
import { User } from '../user/user.model';

@Entity()
export class Cart extends FixedEntity {
  @OneToMany(() => Item, (item) => item.cart)
  items: Item[];

  @OneToMany(() => User, (user) => user.cart)
  users: User[];
}
