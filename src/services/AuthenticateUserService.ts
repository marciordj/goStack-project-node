import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Users from '../models/Users';

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
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email or password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email or password combination');
    }

    const token = sign({}, '20ab12233b458a9fbf453b7e100deff9', {
      subject: user.id,
      expiresIn: '1d',
    }); // primeiro parametro é o payload, ele vai ficar criptografado mas não é seguro, qualquer um consegue criptografar, o segundo é uma chave secreta

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
