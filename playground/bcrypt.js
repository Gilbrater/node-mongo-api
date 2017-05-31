const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password, salt, (err, hash)=>{
        console.log("Hash:", hash);
    });
});

var hashedPassword = '$2a$10$/C3Zf.0bYXsm4jQJH6RKKOYVu36iqLbm5e1LLilSlhzMOXTG/EXY2';

bcrypt.compare(password, hashedPassword, (err, res)=>{
    console.log("RES:", res);
});