import { Request, Response } from "express";
import { Container } from "typedi";
import { TvShowService } from "../services/tvShow";
import logger from "../logger";
import { validation } from "../validations";

export async function createShow(req: Request, res: Response) {
  try {
    const body = req.body;
    const validateResponse = validation("TvShowValidation", body);
    if (validateResponse instanceof Error)
      return res.status(400).send({ errorMessage: validateResponse.message });
    const showService = Container.get(TvShowService);
    const response = await showService.createShow(req.body);
    if (response instanceof Error) {
      return res.status(422).send(response.message);
    }
    return res.send(response);
  } catch (ex: any) {
    logger.error({
      error: ex,
      //userId
      //reqUrl
    });
    return res.sendStatus(500);
  }
}

export async function deleteShow(req: Request, res: Response) {
  //validation:

  try {
    const showService = Container.get(TvShowService);
    const { id } = req.params;
    const validateResponse = validation("IdValidation", req.params);
    if (validateResponse instanceof Error)
      return res.status(400).send({ errorMessage: validateResponse.message });
    const response = await showService.deleteShow(id);
    if (response instanceof Error) {
      return res.status(422).send(response.message);
    }
    return res.send(response);
  } catch (ex: any) {
    logger.error({
      error: ex,
      //userId
      //reqUrl
    });
    return res.sendStatus(500);
  }
}

export async function updateShow(req: Request, res: Response) {
  //validation:

  try {
    const ShowService = Container.get(TvShowService);
    const body = req.body;
    const validateResponse = validation("TvShowUpdateValidation", body);
    if (validateResponse instanceof Error)
      return res.status(400).send({ errorMessage: validateResponse.message });
    const response = await ShowService.updateShow(body.showId, body);
    if (response instanceof Error) {
      return res.status(422).send(response.message);
    }
    return res.send(response);
  } catch (ex: any) {
    logger.error({
      error: ex,
      //userId
      //reqUrl
    });
    return res.sendStatus(500);
  }
}
