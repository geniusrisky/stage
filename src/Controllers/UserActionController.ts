import { Request, Response } from "express";
import { Container } from "typedi";
import { UserActivityService } from "../services/userActivity";
import logger from "../logger";
import { validation } from "../validations";


export async function addToMyList(req: Request, res: Response) {
    try {
        const body = req.body;
        const userId = req.userId!;
        const validateResponse = validation("MyListItemValidation", body);
        if (validateResponse instanceof Error) return res.status(400).send({ errorMessage: validateResponse.message });
        const userActivityService = Container.get(UserActivityService);
        const response = await userActivityService.addToMyList(userId, body.item);
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

export async function removeContentFromList(req: Request, res: Response) {
    //validation:
    
      try {
          const userActivityService = Container.get(UserActivityService);
          const body = req.body;
          const validateResponse = validation("ItemAndUserIdValidation", body);
          if (validateResponse instanceof Error) return res.status(400).send({ errorMessage: validateResponse.message });
          const response = await userActivityService.removeContentFromMyList(req.userId!, body.itemId);
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

  export async function fetchListForUser(req: Request, res: Response) {    
      try {
          const userActivityService = Container.get(UserActivityService);
          const query = req.query;
          const validateResponse = validation("ValidateFetchListPayload", query);
          if (validateResponse instanceof Error) return res.status(400).send({ errorMessage: validateResponse.message });
          //const userId = typeof query.userId === 'string' ? query.userId : '';
          const response = await userActivityService.fetchListForUser(req.userId!, Number(query.page), Number(query.pageSize));
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