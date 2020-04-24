// takes casre of the signin request to the server

const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json('incorrect form submission');
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => { 
            (data[0]);
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash); // true
    if (isValid) {
        return db.select('*').from('users')
        .where('email', '=', email)
        .then(user => {
            res.json(user[0])
        })
    .catch(err => res.status(400).json('unable to get user'))   
    }
    else {
        res.status(400).json('wrong credentials')
    }
})
.catch(err => res.status(400).json ('wrong credentials')
)};

module.exports = {
    handleSignin
}