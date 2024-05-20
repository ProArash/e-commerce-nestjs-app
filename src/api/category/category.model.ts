import { FixedEntity } from '../../utils/fixed-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Item } from '../item/item.model';

@Entity()
export class Category extends FixedEntity {
  @Column()
  title: string;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];
}
