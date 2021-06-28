import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; // if it is Google auth, token len > 500

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, "test"); // will give the username and id 
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token); 
            req.userId = decodedData?.sub;
        }

        next();
    } catch(error) {
        console.log(error);
    }
}

export default auth;