module.exports = function (success, data, message) {
    const ret = {
        "success": success,
        "data": data,
        "message": message
    }
    return ret;
}