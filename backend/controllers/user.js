const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Article = require('../models/article');
const Comment = require('../models/comment');


exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {

            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                isAdmin: false,
            });

            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));



        })
        .catch(error => res.status(500).json({ error }));

};


exports.login = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.TOKEN,
                            { expiresIn: '24h' },
                        ),
                        isAdmin: user.isAdmin,
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));



}


exports.GetAllUsers = (req, res, next) => {
    User.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
}


exports.getOneUser = (req, res, next) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));

}

exports.getOneUserByUsername = (req, res, next) => {
    User.findOne({
        where: {
            username: req.params.username
        }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));

}

exports.deleteUser = (req, res, next) => {
    Article.destroy({
        where: {
            userId: req.params.id
        }
    })
    Comment.destroy({
        where: {
            userId: req.params.id
        }
    })
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
        .catch(error => res.status(400).json({ error }));

}
