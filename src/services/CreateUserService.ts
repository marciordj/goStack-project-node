import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import Users from '../models/Users';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<Users> {
    const usersRepository = getRepository(Users);

    const checkUserExist = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new AppError('Email adress already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
