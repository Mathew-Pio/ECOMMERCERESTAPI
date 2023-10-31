import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    const authToken = req.headers.authorization;

    // check if the token exists
    if(!authToken || !authToken.startsWith('Bearer ')){
        return res.status(401).json({success: false, message: 'Youre not authorized'})
    }
    try{
        const token = authToken.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decodedToken.id;
        req.isAdmin = decodedToken.isAdmin;
        next();
    }catch(err){
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({message: 'Token expired'})
        }
        return res.status(401).json({success: false, message:'Invalid Token'})
    }
}

export const authorization = (req, res, next) => {
    isAuth(req, res, () => {
        if(req.userId === req.params.id || req.isAdmin){
            next();
        }else{
            return res.status(403).json({sucess:false, message:'you are not authorized'});
        }
    })
}

export const isAdmin = (req, res, next) => {
    isAuth(req, res, () => {
        if(req.isAdmin){
            next();
        }else{
            return res.status(403).json({sucess:false, message:'you are not authorized'});
        }
    })
}
