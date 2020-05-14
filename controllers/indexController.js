exports.frontpage = function (req, res) {
    res.render('index', {
        title: 'Demoing PassportJS',
        subtitle: 'with OAuth2',
        strategies: ['passport-gitlab2', 'amazon'],
        user: req.user
    });
};

exports.dashboard = function (req,res) {
    res.render('dashboard', {
        title: 'Demoing PassportJS',
        subtitle: 'Here\'s What We Do:',
        user: req.user
    });
};