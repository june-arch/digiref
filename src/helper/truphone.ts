import axios from 'axios';
// import https from 'https';
// const { promisify } = require('util');
// const asyncHttpsRequest = promisify(https.request);

const truephone_token = process.env.TRUPHONE_TOKEN || '';

export const sendCommandTruephone = async (command: string = 'on', sim_id: string) => {
  // const sim_id = 'your_sim_id';
  let textData = '';
  if (command === 'on') {
    textData = '  setdigout 0';
  } else if (command === 'off') {
    textData = '  setdigout 1';
  } else {
    return null;
  }

  try {
    const response = await axios.post('https://iot.truphone.com/api/v2.0/sims/send_sms', {
      "iccid": [
        sim_id
      ],
      "text": textData,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${truephone_token}`,
      },
    });

    return response;
  } catch (error) {
    return null;
  }
};
