import { Service } from "typedi";
import MovieModel, { MoviesDocument } from  "../Models/Movie";

@Service()
export class MovieDatabaseCollection {
    private Movie;

    constructor() {
        this.Movie = MovieModel
    }

    async createMovie(MovieData: MoviesDocument) {
        return this.Movie.create(MovieData);
    }

    async deleteMovie(movieId: string) {  
        return this.Movie.deleteOne({movieId});
    }

    async updateMovie(movieId: string, data: Partial<MoviesDocument>) {
        return this.Movie.updateOne({movieId},  {$set: data});
    }

    async findMovieByIds(paginatedMovieIds: string[], ) {
        return this.Movie.find({ movieId: { $in: paginatedMovieIds } }).lean();
    }
}
