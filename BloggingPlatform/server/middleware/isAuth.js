import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token; 
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" }); 
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET); 
        req.userId = verified.id; 
        req.userName = verified.userName;
        next(); 
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });  
    }
}
export default isAuth;