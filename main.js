const { Client } = require('tplink-smarthome-api');
const axios = require('axios');




// Connects to the TP-Link plug
const setPlug = (powerState) => {
    const client = new Client();
    client.getDevice({host: '192.168.0.30'}).then((device) => {
        device.getSysInfo().then(console.log);
        device.setPowerState(powerState);
    });
}
 
// Gets the temperature from the ESP32
const getTemprature = () => {
    return axios.get('ESP32-ADDRESS')
      .then(function (response) {
        // handle success
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        return error
      });
}

setInterval(async () => {
    console.log(await getTemprature())
    if (await getTemprature() < 17) {
        setPlug(false);
    } else {
        setPlug(true);
    }
}, 10000);
