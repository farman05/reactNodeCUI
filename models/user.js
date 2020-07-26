var { DB } = require("../config/constants");
const {comparePassword} = require('../helpers/global')
module.exports = {

    /**
     * Login
     * Check if the user exists or not
     * NOTE : Password is already MD5 hash 
     */
    login: async ( con, email, password ) => {

        try {

            let query = `
                SELECT
                    id,password
                FROM
                    ${DB.USER}
                WHERE
                    email = "${email}" 
            `;
            let [emailResult] = await con.query(query);
            if(emailResult){
                console.log(emailResult)
                const matchPassword = await comparePassword(password,emailResult.password);
                if(matchPassword){
                    return emailResult
                }else{
                    return false
                }
            }
            return false;
            
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
         
    },
}

