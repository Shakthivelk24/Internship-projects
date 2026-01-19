import jwt from 'jsonwebtoken';

const generateToken = async(userId,userName) => {
    try{
        const token = await  jwt.sign(
            {id: userId,userName: userName}, 
            process.env.JWT_SECRET, 
            {expiresIn: '10d'} 
        );
        return token;
    }catch(error){
        console.log("Error generating token", error);
    }
}

export default generateToken;