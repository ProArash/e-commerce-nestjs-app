import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cart } from './cart.model';
import { CartAddDto } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.model';
import { Item } from '../item/item.model';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  getByUserId(userId: number): Promise<Cart> {
    return this.cartRepository.findOne({
      where: {
        users: {
          id: userId,
        },
      },
      relations: {
        items: true,
        users: true,
      },
    });
  }
  async addItem(cartAddDto: CartAddDto): Promise<Cart> {
    const user = await User.findOne({
      where: {
        id: cartAddDto.user,
      },
    });
    const item = await Item.findOne({
      where: {
        id: cartAddDto.item,
      },
    });

    let cart = await this.cartRepository.findOne({
      where: {
        users: {
          id: cartAddDto.user,
        },
      },
      relations: {
        users: true,
        items: true,
      },
    });
    if (!cart) {
      cart = this.cartRepository.create({
        users: [user],
        items: [item],
      });
      console.log(1);
      
    } else {
      cart.users.push(user);
      cart.items.push(item);
      console.log(cart.items);
    }
    return await this.cartRepository.save(cart);
  }
}
