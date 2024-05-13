import { Request, Response } from "express";
import { Container } from "typedi";
import { MovieService } from "../services/movie";
import logger from "../logger";
import { validation } from "../validations";


export async function createMovie(req: Request, res: Response) {
  //validation:
  
    try {
        const body = req.body;
        const validateResponse = validation("movieSchema", body);
        if (validateResponse instanceof Error)
          return res.status(400).send({ errorMessage: validateResponse.message });
        const movieService = Container.get(MovieService);
        const response = await movieService.createMovie(body);
         if (response instanceof Error) {
             return res.status(422).send(response.message);
         }
        return res.send(response);
    } catch (ex: any) {
        logger.error({
            error: ex
        })
        return res.sendStatus(500);
    }
}

export async function deleteMovie(req: Request, res: Response) {
    //validation:
    
      try {
          const movieService = Container.get(MovieService);
          const { id } = req.params;
          const validateResponse = validation("IdValidation", req.params);
          if (validateResponse instanceof Error)
            return res.status(400).send({ errorMessage: validateResponse.message });
          const response = await movieService.deleteMovie(id);
           if (response instanceof Error) {
               return res.status(422).send(response.message);
           }
          return res.send(response);
      } catch (ex: any) {
        logger.error({
            error: ex
            //userId
            //reqUrl
        })
          return res.sendStatus(500);
      }
  }

  export async function updateMovie(req: Request, res: Response) {
    //validation:
    
      try {
          const movieService = Container.get(MovieService);
          const body = req.body;
          const validateResponse = validation("movieSchema", body);
          if (validateResponse instanceof Error)
            return res.status(400).send({ errorMessage: validateResponse.message }); 
                const response = await movieService.updateMovie(body.movieId, body);
           if (response instanceof Error) {
               return res.status(422).send(response.message);
           }
          return res.send(response);
      } catch (ex: any) {
        logger.error({
            error: ex
            //userId
            //reqUrl
        })
          return res.sendStatus(500);
      }
  }