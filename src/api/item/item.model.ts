import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../user/user.model';
import { FixedEntity } from '../../utils/fixed-entity';
import { Category } from '../category/category.model';
import { Cart } from '../cart/cart.model';

@Entity()
export class Item extends FixedEntity {
  @Column({
    unique: true,
  })
  title: string;

  @Column()
  caption: string;

  @Column({
    nullable: true,
  })
  img_url: [string];

  @Column()
  price: number;

  @Column({ default: true })
  stock: boolean;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @ManyToOne(() => Category, (category) => category.items)
  category: Category;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;
}
