
const axios = require('axios')
module.exports = {
    globalResponse : (res,statusCode,status,msg,result="",err = "",isMobile = false)=>{
        return res.status(statusCode).json({'status':status,'msg':msg,data:result,err:err})

    },
    formErrors: (errors) => {
        let response = [];

        for (var err in errors) {
            response.push(errors[err][0]);
        }
        return response;
    },
    uploadImageToS3 : async(base64,imageName)=>{

            const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            const type = base64.split(';')[0].split('/')[1];
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${imageName}.${type}`, // type is not required
                Body: base64Data,
                ACL: 'public-read',
                ContentEncoding: 'base64', // required
                ContentType: `image/${type}` // required. Notice the back ticks
            }
            let location = '';
            let key = '';
            try {
                const { Location, Key } = await s3.upload(params).promise();
                return Location;
            } catch (error) {
                throw new Error('Error while uploading image')
                console.log(error)
            }
    },
    dbInsert: async (con, table, data, isBatch = false, columns = "") => {
        return new Promise(async (resolve, reject) => {
            //logic goes here
            if (table == "") {
                reject("table name is required");
            }
            if (isBatch) {
                if (columns == "") {
                    reject(
                        "please specify column names in order to batch insert"
                    );
                }
                if (!(data instanceof Array)) {
                    reject("data should be array");
                }

                let query = `
                        INSERT INTO
                            ${table}
                            (${columns})
                        VALUES ?
                    `;
                try {
                    let result = await con.query(query, [data]);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            } else if (!isBatch) {
                if (data instanceof Array) {
                    reject("data should be object");
                }
                let query = `
                        INSERT INTO
                            ${table}
                        SET ?
                    `;
                try {
                    let result = await con.query(query, [data]);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }
        });
    },
    errorResponse: (res, err) => {
        return res
            .status(500)
            .json({
                status: 0,
                msg: "Something Went Wrong",
                data: [],
                err: err.message ? err.message : err,
            });
    },
    fetch: async (
        con,
        table,
        columns = false,
        condition = "",
        orderBy = false
    ) => {
        let query = `
            SELECT
                ${columns ? columns : `*`}
            FROM
                ${table} `;
        if (condition) {
            query += `
                    WHERE 
                    ${condition}
                `;
        }

        if (orderBy) {
            query += ` ORDER BY ${orderBy}`;
        }
        return await con.query(query);
    },
    getRequest : async(ApiName,data = '')=>{

                    try{
                        const result = await axios.get(ApiName);
                        return result.data;
                    }catch(e){
                        throw new Error('Error while fetching the request')
                    }
    },
    postRequest : async(ApiName,data = {})=>{
                try{
                    console.log(data,'sdsadsd')
                    const result = await axios.post(ApiName,data,{
                        headers: {'Content-Type' : 'text/plain' }
                      });
                    return result.data;
                }catch(e){
                    throw new Error('Error while posting the request ' + e.message || '')
                }
    },
    hashPassword:async(password)=>{
        try{
        const salt = await bcrypt.genSalt(10)
        const result = await bcrypt.hash(password,salt);
        return result
        }catch(e){
            console.log(e)
        }
    },
    comparePassword : async(password,hashPassword)=>{

        const result = await bcrypt.compare(password,hashPassword);
        return result;
 
    },
    sendLoanNotification : async({url,msg,user_id})=>{

                try {
                    const ntSend = {
                        title: 'Loan Status',
                        message: msg,
                        user_id: user_id,
                        element_id: 0,
                        notification_type: 'loan_status',
                        platform: 'hellodoc'
                    
                    }
                    const apiResponse = await module.exports.postRequest(url,(ntSend));
                    return apiResponse    
                } catch (e) {
                      console.log(e)  
                }
    }
}