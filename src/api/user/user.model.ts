import { Column, Entity, OneToMany } from 'typeorm';
import { Item } from '../item/item.model';
import { FixedEntity } from '../../utils/fixed-entity';
import { UserRole } from '../../utils/role-enum';

@Entity()
export class User extends FixedEntity {
  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    select: false,
    default: '',
  })
  sms_code: string;

  @Column({
    default: true,
  })
  status: boolean;

  @Column({
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
