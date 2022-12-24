import { Response, Request, NextFunction } from "express"
import jwt, {JwtPayload}from "jsonwebtoken";
import config from "config"
import { userRepoImp } from "../repo/user/user.repo";
import { User } from "../models/user.model";
import { UserTokenPayload } from "../entities/user/user.token";


/////////////////// should be moved /////////////////////////////
export interface CustomRequest extends Request{
  user: User
}
interface CustomPayload extends JwtPayload, UserTokenPayload{

}
///////////////////////////////////////////////////////////////

export const authToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
     
        if (!token) {
          throw new Error();
        }
     
        const decoded = jwt.verify(token, config.get("token.jwtScretKey")) as CustomPayload;
        const user =  await userRepoImp.findOne(decoded.phone) // is correct ot use userRepo!
        if(user){
          (req as CustomRequest).user = user
        }

        next();
      } catch (err) {
        res.status(401).send('Please authenticate');
      }
}

