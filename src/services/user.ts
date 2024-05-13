import { Service } from "typedi";
import { UserDatabaseCollection } from "../Database/User";
import { UsersDocument } from "../Models/Users";
import jwt from "jsonwebtoken";

@Service()
export class UserService {
    constructor(
        private readonly userDatabase: UserDatabaseCollection
    ) {}

    async createUser(userData: UsersDocument) {
        
        const user = await this.userDatabase.createUser(userData);
        if(user instanceof Error) return new Error(" Error while creating user");
        return user;
    }
    
    async userLogin(userData: UsersDocument) {
        const userDetails = await this.userDatabase.findUserByUsernameAndPassword(userData.username, userData.password);
        if(!userDetails)
          return new Error('Invalid username or password');
        const token = jwt.sign({ userId: userDetails.userId }, `${process.env.JWT_SIGN_KEY}`, { expiresIn: `${process.env.JWT_EXPIRE_TIME}` });
        return {token};
    }

    async deleteUser(userId: string) {
        const user = await this.userDatabase.deleteUser(userId);
        return {message: "user deleted Successfully"};
    }

    async updateUser(userId: string, data: Partial<UsersDocument>) {
        const user = await this.userDatabase.updateUser(userId, data);
        return {message: "user Data updated Successfully"};
    }
}