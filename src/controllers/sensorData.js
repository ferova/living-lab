const Data = require('../entities/data');
const querystring = require('querystring');

const putData = (topic, message, packet, res) => {
    let data = new Data();
    let json = JSON.parse(message.toString())

    console.log("New message:" + JSON.stringify(json));
    
    var [ temperature, humidity, dewpoint, pressure, light,
        speed, direction, rainfall, battery] = Object.values(json);

    data.temperature = temperature;
    data.humidity=humidity;
    data.dewpoint=dewpoint;
    data.pressure=pressure;
    data.light=light;
    data.speed=speed;
    data.direction=direction;
    data.rainfall=rainfall;
    data.battery=battery;
    data.save((err) => {
        if (err) console.log("Failed to log data.");
        console.log("Succesfully logged data.");
    });
}

const retrieveData = (req, res) => {
    let sensor = req.query.sensor;
    console.log(sensor);
    if(sensor==undefined){
        Data.find((err, data) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, data: data });
            }).limit(20).sort([['updatedAt', 'descending']]);
    }else{
        Data.find((err, data) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, data: data });
            }).select(sensor).limit(20).sort([['updatedAt', 'descending']]);
    }
}

module.exports = {
    retrieveData,
    putData
}