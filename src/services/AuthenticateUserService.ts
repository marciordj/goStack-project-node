import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import Users from '../models/Users';

interface IRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<{ user: Users }> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email or password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email or password combination');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
