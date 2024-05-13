import { Service } from "typedi";
import { MovieDatabaseCollection } from "../Database/Movies";
import { MoviesDocument } from "../Models/Movie";
@Service()
export class MovieService {
    constructor(
        private readonly MovieDatabase: MovieDatabaseCollection
    ) {}

    async createMovie(movieData: MoviesDocument) {
        const movie = await this.MovieDatabase.createMovie(movieData);
        if(movie instanceof Error) return new Error(" Error while creating movie");
        return movie;
    }

    async deleteMovie(movieId: string) {
        const movie = await this.MovieDatabase.deleteMovie(movieId);
        if(movie instanceof Error) return new Error(" Error while deleting movie");
        return {message: "movie deleted Successfully"};
    }

    async updateMovie(movieId: string, data: Partial<MoviesDocument>) {

        const movie = await this.MovieDatabase.updateMovie(movieId, data);
        
        if(movie instanceof Error) return new Error(" Error while updating movie");
        return movie;
    }
}