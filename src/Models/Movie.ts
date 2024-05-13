import { Schema, Document, Model, model } from "mongoose";
import { v4 as uuid } from "uuid";

type Genre = 'Action' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Romance' | 'SciFi';

interface Movie {
  movieId: string;
  title: string;
  description: string;
  genres: string[];
  releaseDate: Date;
  director: string;
  actors: string[];
}

const MovieSchema: Schema = new Schema({
  movieId: { type: String, default: uuid(), index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String, required: true }],
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String, required: true }]
});

export interface MoviesDocument extends Movie , Document {}

export interface MovieModel extends Model<MoviesDocument> {}

export default model<Movie>('Movie', MovieSchema);

