const bcrypt = require('bcrypt');

const password = process.argv[2]; // Gets password from the command line argument

bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;

    bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        console.log(hash);
    });
});
