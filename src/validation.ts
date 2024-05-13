import Joi from "joi";

export const schemas = {
    
    userData: Joi.object({
        username: Joi.string().optional(),
        preferences: Joi.object({
        favoriteGenres: Joi.array().items(Joi.string()),
        dislikedGenres: Joi.array().items(Joi.string())
    }).optional()
    })
};
