import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../utils/role-enum';
import { User } from '../api/user/user.model';
import { IAuthPayload } from '../api/auth/auth.payload';

export const roleGuard = (role: UserRole) => {
  const roles = [];

  switch (role) {
    case UserRole.USER:
      roles.push(UserRole.USER);
    case UserRole.ADMIN:
      roles.push(UserRole.ADMIN);
  }

  return async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const userInfo: IAuthPayload = req.user;
    const user = await User.findOne({
      where: {
        id: userInfo.id,
      },
    });
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: 'Insufficient permission.',
      });
    }
    next();
  };
};
