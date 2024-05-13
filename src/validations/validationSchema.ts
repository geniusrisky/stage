import Joi from "joi";

export const schemas = {
  UserDataUpdate: Joi.object({
    userId: Joi.string(),
      username: Joi.string().optional(),
      preferences: Joi.object({
        favoriteGenres: Joi.array().items(Joi.string()),
        dislikedGenres: Joi.array().items(Joi.string()),
      }),
      watchHistory : Joi.array().items({
        contentId: Joi.string().required(),
        watchedOn: Joi.date().required(),
        rating: Joi.number().optional(),
      }).default([]),
    }),

  IdValidation: Joi.object({
    id: Joi.string().required(),
  }),

  TvShowValidation: Joi.object({
    showId: Joi.string(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    genres: Joi.array().items(Joi.string()).required(),
    episodes: Joi.array().items({
      episodeNumber: Joi.number().required(),
      seasonNumber: Joi.number().required(),
      releaseDate: Joi.date().required(),
      director: Joi.string().required(),
      actors: Joi.array().items(Joi.string()).required(),
    }),
  }),

  TvShowUpdateValidation: Joi.object({
    showId: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
    genres: Joi.array().items(Joi.string()),
    episodes: Joi.array().items({
      episodeNumber: Joi.number(),
      seasonNumber: Joi.number(),
      releaseDate: Joi.date(),
      director: Joi.string(),
      actors: Joi.array().items(Joi.string()).required(),
    }),
  }),

  movieSchema: Joi.object({
    movieId: Joi.string(),
      title: Joi.string(),
      description: Joi.string(),
      genres: Joi.array().items(Joi.string().valid('Action', 'Comedy' , 'Drama' , 'Fantasy' , 'Horror' , 'Romance' , 'Sci-Fi', 'Thriller'
    )),
      releaseDate: Joi.date(),
      director: Joi.string(),
      actors: Joi.array().items(Joi.string()),
  }),

  MyListItemValidation: Joi.object({
    userId: Joi.string().required(),
    item: Joi.object({
      itemId: Joi.string().required(),
      itemType: Joi.string().valid("movie", "tvShow").required(),
    }),
  }),
  
  ItemAndUserIdValidation: Joi.object({
    userId: Joi.string().required(),
    itemId: Joi.string().required(),
  }),

  ValidateFetchListPayload: Joi.object({
    userId: Joi.string().required(),
    page: Joi.number().required(),
    pageSize: Joi.number().required(),
  }),

  ValidateCredentials: Joi.object({
    username: Joi.string().required(),
    password: Joi.string()
    .required()
    .pattern(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ 
    )
    .messages({
      'string.pattern.base': 'Password must contain at least one letter, one number, and one special character, and be at least 6 characters long.',
    }),  }),
};
