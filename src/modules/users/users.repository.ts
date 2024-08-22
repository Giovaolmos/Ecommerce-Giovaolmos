import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entitites/users.entity";
import { Repository } from "typeorm";


@Injectable()
export class UsersRepository{
constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
){}

async getUsers(page: number, limit: number){
   const skip = (page - 1) * limit;
   const users = await this.usersRepository.find({
    take: limit,
    skip: skip,
   });

   return users.map(({password,isAdmin, ...userResponse}) => userResponse);
}

async getUserById(id: string){
   const user = await this.usersRepository.findOne({
    where: {id},
    relations: {
        orders: true,
    },
   });
   if(!user) throw new NotFoundException(`No user found with id: ${id}`); 
   const {password, isAdmin, ...userResponse} = user;
   return userResponse;
};

async addUser(user: Partial<User>){
  const newUser = await this.usersRepository.save(user);

  const dbUser = await this.usersRepository.findOneBy({id: newUser.id});

  const{password, isAdmin, ...userResponse} = dbUser;
  return userResponse;
};

async updateUser(id:string, user: User){
  if(!id) throw new NotFoundException(`ID: ${id} Not found`)
  await this.usersRepository.update(id, user);
  const updatedUser = await this.usersRepository.findOneBy({id});
  const {password, isAdmin, ...userResponse} = updatedUser;
  return userResponse;
};

async deleteUser(id:string){
  if(!id) throw new NotFoundException(`ID: ${id} Not found`)
  const user = await this.usersRepository.findOneBy({id});
  this.usersRepository.remove(user);
  const {password, isAdmin, ...userResponse} = user;
  return userResponse;
}

async getUserByEmail(email: string){
    return await this.usersRepository.findOneBy({email});
};

}
