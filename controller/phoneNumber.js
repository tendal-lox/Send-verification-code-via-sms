'use strict'

module.exports.validateGivenPhoneNumber = async (phoneNumber) => {
    const validLength = phoneNumber.length == 11
    const validNumber = /[0-9]/g.test(phoneNumber)
    
    return validLength && validNumber
}