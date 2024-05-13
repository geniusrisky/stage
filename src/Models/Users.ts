import { Schema, Document, Model, model } from "mongoose";
import { v4 as uuid } from "uuid";

interface UserPreferences {
  favoriteGenres: string[];
  dislikedGenres: string[];
}

export enum contentType {
  MOVIE = 'movie',
  TVSHOW = 'tvShow'
}

interface WatchHistoryItem {
  _id?: boolean;
  contentId: string;
  watchedOn: Date;
  rating?: number;
}

interface User {
  userId?: string;
  username: string;
  password: string;
  preferences: UserPreferences;
  watchHistory: WatchHistoryItem[];
  myList: MyListItem[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface MyListItem {
  _id?: boolean;
  itemId: string;
  itemType: contentType;
  createdAt?: Date;
}

const MyListItemSchema: Schema = new Schema<MyListItem>({
  _id: false,
  itemId: { type: String, required: true },
  itemType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const WatchHistoryItemSchema: Schema = new Schema<WatchHistoryItem>({
  _id: false,
  contentId: { type: String, required: true },
  watchedOn: { type: Date, required: true },
  rating: { type: Number }
});

const UserSchema: Schema = new Schema<User>({
  userId: { type: String, required: true, default: uuid(), index: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  preferences: {
    type: Schema.Types.Mixed,
    default: {
      favoriteGenres: [],
      dislikedGenres: []
    }
  },
  watchHistory: { type: [WatchHistoryItemSchema], default: [] },
  myList: {type:[MyListItemSchema], default:[]},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export interface UsersDocument extends User, Document {}

export interface UserModel extends Model<UsersDocument> {}

export default model<User>('User', UserSchema);
