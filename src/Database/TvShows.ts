import { Service } from "typedi";
import TvShowModel, { TvShowsDocument } from  "../Models/TvShow";

@Service()
export class TvShowsDatabaseCollection {
    private TvShow;

    constructor() {
        this.TvShow = TvShowModel
    }

    async createTvShow(TvShowData: TvShowsDocument) {
        return this.TvShow.create(TvShowData);
    }

    async deleteTvShow(showId: string) {
        return this.TvShow.deleteOne({showId});
    }

    async updateTvShow(showId: string, data: Partial<TvShowsDocument>) {
        return this.TvShow.updateOne({showId},  {$set: data});
    }

    async findShowsByIds(paginatedTvShowIds: string[]) {
        return this.TvShow.find({ showId: { $in: paginatedTvShowIds } }).lean();
    }
}
