const { rateLimit } = require('express-rate-limit')

const StandardLimiter = rateLimit({
    windowMs: 30 * 1000,
    max: 100,
    message:'To many requests in a short period of time',
    keyGenerator: (req, res) => {
        return req.clientIp
    }
})

const LoginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message:'Too many login requests in a short period of time, you can try again in 5 minutes',
    keyGenerator: (req, res) => {
        return req.clientIp
    }
})

const ChangePassLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message:'Too many password requests in a short period of time, you can try again in 5 minutes',
    keyGenerator: (req, res) => {
        return req.clientIp
    }
})

const SendEmailLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 4,
    message:'Wait 60 seconds before sending another email',
    keyGenerator: (req, res) => {
        return req.clientIp
    }
})

module.exports = {
    StandardLimiter,
    LoginLimiter,
    ChangePassLimiter,
    SendEmailLimiter
}