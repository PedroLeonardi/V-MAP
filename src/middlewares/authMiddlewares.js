import { JWT_SECRET } from "../../config/jwt.js";
import jwt from 'jsonwebtoken';
import logger from "../logs/logger.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Não autorizado: Token não fornecido.' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
      
        req.userTipo = decoded.tipo;
       

        next();
    } catch (err) {
        return res.status(403).json({ message: 'Não autorizado: Token inválido' });
    }
}

export default authMiddleware;
