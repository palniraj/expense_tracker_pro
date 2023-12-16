const errorHandler = (error, req, res, next) => {
// if there is error then send message
    if(error){
        res.status(400).json({
        error: error
        });
    }else{
        next();
    }

}
module.exports = errorHandler