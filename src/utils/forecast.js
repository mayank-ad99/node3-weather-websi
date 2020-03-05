const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/111bc7163a95b955b72eee6e500f9ee0/${latitude},${longitude}`;

    request(
            {   url,
                json:true },
            (error, {body}) => {
                if(error){
                    callback(error, undefined);    
                }
                else if (body.error){
                    callback(error, undefined);
                }
                else 
                    callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. \n The Maximum temprature is ' + body.daily.data[0].temperatureMax + ' deg F. \nThe Minimum temperature is ' + body.daily.data[0].temperatureMin + ' deg F.');
            })
};
module.exports = forecast;