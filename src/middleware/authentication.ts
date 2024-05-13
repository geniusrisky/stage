
import { verify } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

export async function internalAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const encryptedData = (req.headers["internalAuth"] || req.headers["internalauth"]) as string;
        const data = verify(encryptedData, `${process.env.JWT_SIGN_KEY}`) as any;
        req.userId = data.userId
        next();
    } catch (ex) {
        return res.sendStatus(401);
    }
}