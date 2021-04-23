const User = require("../model/user");
const bcrypt = require("bcryptjs")

class Auth{
    constructor(){}

    async CheckUser({username, password}){
        const user = await User.findOne({ username })
        if(user !== null && user.length != 0){
            if(this.comparePassword(password, user.password)){
                return [true, user]
            }
        }

        return [false, null]
    }

    async comparePassword(password, passwordHash){
        try {
            const isMatch = await bcrypt.compare(password, passwordHash)
            return isMatch
        } catch (error) {
            return error
        }
    }

    async Register({ username, password }){
        try {
            console.log(username, password);
            const hash = await bcrypt.hash(password, 10)
            const newUser = new User({
                username, 
                password:hash
            })

            const userRegistered = await newUser.save()
            return userRegistered
        } catch (error) {
            return error
        }
    }
}


module.exports = new Auth()