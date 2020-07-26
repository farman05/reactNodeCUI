const form = require('express-form'),
      field = form.field;

module.exports = {

    checkLogin : 

         form(
                field("email").trim().required().isEmail(),
                field("password").trim().required()
            ),
    checkLoanForm:
               form(
                   field('full_name','Full Name').trim().required(),
                   field('mobile_number').trim().required(),
                   field('bvn').trim().required(),
                   field('dob').trim().required(),
                   field('home_address').trim().required(),
                   field('office_address').trim(),
                   field('loan_purpose','Loan Purpose').trim().required(),
                   field('loan_amount').trim().required(),
                   field('loan_tenor').trim().required(),
                   field('type_of_security').trim(),
                   field('mode_payment').trim(),
                   field('account_number').trim().required(),
                   field('account_name').trim().required(),
                   field('bank_name').trim().required(),
                   field('account_sortcode').trim().required(),
                   field('account_branch').trim().required(),
                   field('photo').trim().required(),
                   field('identity_proof').trim().required(),
                   field('utility_bill').trim().required(),
                   field('medical_license').trim().required(),
               ),
    updateLoanStatus: 
                form(
                    field('loan_id','Loan Id required').trim().required(),
                    field('status','Loan Status required').trim().required()
                )
    
}