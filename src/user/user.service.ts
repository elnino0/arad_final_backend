import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = createUserDto.role;
    return this.userRepository.save(user);
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  viewUserByName(name: string): Promise<User> {
    return this.userRepository.findOneBy({ name });
  }

  viewUserByemail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async updateUser(email:string, updateUserDto: UpdateUserDto): Promise<User> {
    console.log("updateUser --- ", email)
    const user: User = new User();
    updateUserDto.name ? user.name = updateUserDto.name : undefined;
    updateUserDto.email ? user.email = updateUserDto.email : undefined;
    updateUserDto.password ? user.password = updateUserDto.password : undefined;
    const userdto = await this.userRepository.findOne({where: {email}})
    user.id = userdto.id
    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  async addAdmin(name:string,email:string,password:string):Promise<User> {

  const admin =  await this.userRepository.findOneBy({ email });

  if(admin){
    return admin
  }

    const admindto = new User()

    admindto.email=email
    admindto.name=name
    admindto.password = password
    admindto.role = "admin"

    return this.userRepository.save(admindto)
  }

}