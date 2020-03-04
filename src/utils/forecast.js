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
                    callback(undefined, body.daily.data[0].summary);
            })
};
module.exports = forecast;