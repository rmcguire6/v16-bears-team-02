'use strict'
module.exports = (sequelize, DataTypes) => {
    const Meeting = sequelize.define('Meeting', {
        name: DataTypes.STRING,
        meetingNumber: DataTypes.INTEGER,
        url: DataTypes.STRING
    }, {})
    Meeting.associate = function (models) {
        //associations can be defined here
    }
    return Meeting
}