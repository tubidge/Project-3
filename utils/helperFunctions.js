module.exports = {
    asyncForEach: async function (array, callback) {
        for (let index = 0; index < array.length; index++) {
            console.log('running');

            await callback(array[index], index, array);
        }
    },

    // ! isLoggedIn middleware
    isLoggedIn: function (req, res, next) {
        let array = req.url.split('/');
        let tripId = array[array.length - 1];

        console.log(tripId);

        if (req.isAuthenticated())
            return next();
        res.redirect('/login' + '?tripId=' + tripId);
    }
}