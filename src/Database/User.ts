import { Service } from "typedi";
import UserModel, { UsersDocument, MyListItem } from "../Models/Users";

@Service()
export class UserDatabaseCollection {
  private User;

  constructor() {
    this.User = UserModel;
  }

  async createUser(userData: UsersDocument) {
    return this.User.create(userData);
  }

  async findUserByUsernameAndPassword(username: string, password: string) {
    return this.User.findOne({username, password}, {userId: 1});
  }

  async deleteUser(userId: string) {
    return this.User.deleteOne({ userId });
  }

  async updateUser(userId: string, data: any) {
    return this.User.updateOne({ userId: userId }, { $set: data, updatedAt: Date.now() });
  }

  async addMovieOrShowToListByUserId(userId: string, data: MyListItem) {
    return this.User.updateOne({ userId: userId }, { myList: data, updatedAt: Date.now() });
  }

  async findUserByUserId(userId: string) {
    return this.User.findOne({ userId }, { myList: 1 });
  }

  async removeContentByUserId(userId: string, itemId: string) {
    return await this.User.updateOne(
      { userId },
      { $pull: { myList: { itemId } }, updatedAt: Date.now() }
    );
  }
}
