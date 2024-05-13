import { Request, Response } from "express";
import { Container } from "typedi";
import { UserService } from "../services/user";
import logger from "../logger";
import { validation } from "../validations";


export async function createUser(req: Request, res: Response) {
  //validation:
  
    try {
        const userService = Container.get(UserService);
        const body = req.body;
        const validateResponse = validation("ValidateCredentials", body);
        if (validateResponse instanceof Error) return res.status(400).send({ errorMessage: validateResponse.message });
        const response = await userService.createUser(body);
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

export async function userLogin(req: Request, res: Response) {
    //validation:
    
      try {
          const userService = Container.get(UserService);
          const body = req.body;
          const validateResponse = validation("ValidateCredentials", body);  //username and password
          if (validateResponse instanceof Error) return res.status(400).send({ errorMessage: validateResponse.message });
          const response = await userService.userLogin(body);
           if (response instanceof Error) {
               return res.status(422).send(response.message);
           }
          return res.send(response);
      } catch (ex: any) {
          logger.error({
              error: ex,
              userId: req.userId
              
              //reqUrl
          })
          return res.sendStatus(500);
      }
  }

export async function deleteUser(req: Request, res: Response) {
    //validation:
    
      try {
          const userService = Container.get(UserService);
          const {id} = req.params
          const validateResponse = validation("IdValidation", req.params);
          if (validateResponse instanceof Error) return res.status(400).send({ errorMessage: validateResponse.message });
          const response = await userService.deleteUser(id);
           if (response instanceof Error) {
               return res.status(422).send(response.message);
           }
          return res.send(response);
      } catch (ex: any) {
        logger.error({
            error: ex,
            userId: req.userId

            //reqUrl
        })
          return res.sendStatus(500);
      }
  }

  export async function updateUser(req: Request, res: Response) {
    
      try {
          const userService = Container.get(UserService);
          const body = req.body
          const validateResponse = validation("UserDataUpdate", body);
          if (validateResponse instanceof Error) return res.status(400).send({ errorMessage: validateResponse.message });         
           const response = await userService.updateUser(body.userId, body);
           if (response instanceof Error) {
               return res.status(422).send(response.message);
           }
          return res.send(response);
      } catch (ex: any) {
        logger.error({
            error: ex,
            userId: req.userId
        })
          return res.sendStatus(500);
      }
  }