import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import Users from '../models/Users';
import authConfig from '../config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Users;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const { secret, expiresIn } = authConfig.jwt;

    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email or password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email or password combination', 401);
    }

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
