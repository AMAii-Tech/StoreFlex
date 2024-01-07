const isAuthenticated = (req, res, done) => {
    if (req.user) return done();
    res.status(401).send({ message: "Please login to view this page" });
};

module.exports = {
    isAuthenticated,
};
