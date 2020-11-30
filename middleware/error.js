module.exports.error = (err,req, res, next) => {
    return res.status(500).send('Something is happening in my server')
}