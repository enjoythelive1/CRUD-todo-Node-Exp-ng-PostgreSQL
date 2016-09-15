

exports.notFound = function (req, res, next) {
    res.status(404).json({error: {notFound: true}});
};

exports.internalError = function (err, req, res, next) {
    res.status(err.status || 500).json({error: err});
};