'use strict'
module.exports = (sequelize, DataTypes) => {
    const Meeting = sequelize.define('Meeting', {
        name: {
            type: DataTypes.STRING,
            defaultValue: 'Meeting',
        },
    }, {})
    Meeting.associate = function (models) {
        //associations can be defined here
    }
    return Meeting
}