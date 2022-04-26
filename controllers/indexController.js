exports.frontpage = function (req, res) {
    res.render('index', {
        title: 'Public Frontpage',
        strategies: ['passport-gitlab2', 'amazon'],
        user: req.user
    });
};

exports.dashboard = function (req,res) {
    res.render('dashboard', {
        title: 'Insiders Page',
        user: req.user
    });
};