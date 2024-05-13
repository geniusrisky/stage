import { Service } from "typedi";
import { UserDatabaseCollection } from "../Database/User";
import { MyListItem } from "../Models/Users";
import { MovieDatabaseCollection } from "../Database/Movies";
import { TvShowsDatabaseCollection } from "../Database/TvShows";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: Number(`${process.env.REDIS_KEY_EXPIRE_TIME}`) });

@Service()
export class UserActivityService {
  constructor(
    private readonly userDatabase: UserDatabaseCollection,
    private readonly movieDatabaseCollection: MovieDatabaseCollection,
    private readonly tvShowsDatabaseCollection: TvShowsDatabaseCollection
  ) {}

  async addToMyList(userId: string, item: MyListItem) {
    try {
      // Find user by userId and ensure it exists
      const userDetails = await this.userDatabase.findUserByUserId(userId);
      if (!userDetails) {
        throw new Error(`User not found with userId: ${userId}`);
      }
  
      // Check if item already exists in the user's list
      const itemIdToCheck = item.itemId;
      const itemExists = userDetails.myList.some(
        (item) => item.itemId === itemIdToCheck
      );
      if (itemExists) {
        throw new Error(`Item already exists in the user's list`);
      }
  
      // Add item to the user's list and save the user document
      userDetails.myList.push(item);
      await userDetails.save();
  
      // Here we are deleting the Redis key, after ensuring that database is updated
      await updateUserList(userId);
  
      return userDetails;
    } catch (err: any) {
      return new Error(err);
    }
  }

  async removeContentFromMyList(userId: string, itemId: string) {
    const removeItem = await this.userDatabase.removeContentByUserId(
      userId,
      itemId
    );
    // Here we are deleting the Redis key, after ensuring that database is updated
    await updateUserList(userId);
    return { message: "Item removed successfully" };
  }

  async fetchListForUser(userId: string, page: number, pageSize: number) {
    // Check if the data exists in the cache
    const cacheKey = `userList:${userId}:${page}:${pageSize}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // If not in cache, fetch data from the database
    const userDetails = await this.userDatabase.findUserByUserId(userId);
    const allIds = userDetails?.myList || [];

    // Extract movie and TV show IDs
    const { movieIds, tvShowIds } = extractIds(allIds);

    const paginatedMovieIds = paginate(movieIds, page, pageSize);
    const paginatedTvShowIds = paginate(tvShowIds, page, pageSize);

    const [movies, tvShows] = await Promise.all([
      this.movieDatabaseCollection.findMovieByIds(paginatedMovieIds),
      this.tvShowsDatabaseCollection.findShowsByIds(paginatedTvShowIds),
    ]);

    // Store the fetched data in the cache
    const responseData = { success: true, movies, tvShows };
    cache.set(cacheKey, responseData);

    return responseData;
  }
}

function extractIds(allIds: MyListItem[]): {
  movieIds: string[];
  tvShowIds: string[];
} {
  const movieIds: string[] = [];
  const tvShowIds: string[] = [];
  allIds.forEach((item) => {
    if (item.itemType === "movie") {
      movieIds.push(item.itemId);
    } else if (item.itemType === "tvShow") {
      tvShowIds.push(item.itemId);
    }
  });
  return { movieIds, tvShowIds };
}

function paginate(ids: string[], page: number, pageSize: number): string[] {
  const skip = (page - 1) * pageSize;
  return ids.slice(skip, skip + pageSize);
}

async function updateUserList(userId: string) {
  const cacheKeyPrefix = `userList:${userId}`;
  cache.keys().forEach((cacheKey) => {
    if (cacheKey.startsWith(cacheKeyPrefix)) {
      cache.del(cacheKey);
    }
  });
}
