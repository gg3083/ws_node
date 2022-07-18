const jwt = require("jsonwebtoken");
const cert = "44e9f842-4c70-454d-9669-e59184b052f9";


const generateToken = (username, password) => {
    return jwt.sign(
        {
            username,
            password,
        },
        cert, // 密钥
        {
            algorithm: "HS256", // 加密算法   对称加密算法
            issuer: "ws", // 签发人
            expiresIn: 30 * 60, // 过期时间   单位：s
        }
    );
}

/**
 * 签名验证
 * @param {string} token
 */
const verifyToken = (token) =>{
    try {
        return jwt.verify(token, cert, {
            issuer: "ws",
            algorithms: ["HS256"],
        });
    } catch (error) {
        return {
            code: 401,
            message: error.message,
        };
    }
}
/**
 * 签名验证
 * @param {string} token
 */
const decodeToken = (token) =>{
    try {
        return jwt.decode(token);
    } catch (error) {
        return {
            code: 401,
            message: error.message,
        };
    }
}

module.exports = {
    generateToken,
    verifyToken,
    decodeToken
}
