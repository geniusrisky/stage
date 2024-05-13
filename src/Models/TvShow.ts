import { Schema, Document, model, Model } from "mongoose";
import { v4 as uuid } from "uuid";

interface Episode {
  _id?: boolean;
  episodeNumber: number;
  seasonNumber: number;
  releaseDate: Date;
  director: string;
  actors: string[];
}

interface TVShow {
  showId: string;
  title: string;
  description: string;
  genres: string[];
  episodes: Episode[];
}

const EpisodeSchema: Schema = new Schema<Episode>({
  _id: false,
  episodeNumber: { type: Number, required: true },
  seasonNumber: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String, required: true }]
});

const TVShowSchema: Schema = new Schema<TVShow>({
  showId: { type: String, default: uuid(), unique: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String, required: true }],
  episodes: { type: [EpisodeSchema], default: [] }
  
});


export interface TvShowsDocument extends TVShow , Document {}

export interface TvShowModel extends Model<TvShowsDocument> {}

export default model<TVShow>('TvShow', TVShowSchema);
