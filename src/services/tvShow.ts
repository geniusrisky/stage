import { Service } from "typedi";
import { TvShowsDatabaseCollection } from "../Database/TvShows";
import { TvShowsDocument } from "../Models/TvShow";
@Service()
export class TvShowService {
    constructor(
        private readonly tvShowsDatabase: TvShowsDatabaseCollection
    ) {}

    async createShow(showData: TvShowsDocument) {
        try{
        const show = await this.tvShowsDatabase.createTvShow(showData);
        return show;
        }
        catch(err: any){
            return new Error(err);
        }
    }

    async deleteShow(showId: string) {
        const show = await this.tvShowsDatabase.deleteTvShow(showId);
        return {message: "show deleted Successfully"};
    }

    async updateShow(showId: string, data: Partial<TvShowsDocument>) {
         await this.tvShowsDatabase.updateTvShow(showId, data);
        return {success: true, messgae: 'updated Successfully'};
    }
}