import {schedule} from 'node-cron';
import { findAllForCron } from '../repositories/projectDeviceRepository';
import handlebars from 'handlebars';
import { sendEmailHtml } from '../helper/nodemailer';
import { randomBytes } from 'crypto';
import { findAllByDeviceId, insert } from '../repositories/historyAlertRepository';
import _ from 'lodash';

const templateAlert = `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Site device alert</title>
</head>
<body>
    <h1>Site : {{title}}</h1>
	<p><strong>Event ID:</strong> {{event_id}}</p>
	<p><strong>Symptoms:</strong></p>
	<ul>
		<li>Ignition {{ignition_state}}</li>
		<li>Temperature {{temperature}}&deg;C</li>
	</ul>
</body>
</html>
`;

async function checkStatusAlert(){
    try {
        // console.log('Tugas dijalankan setiap 5 menit');
        const data = await findAllForCron();
        if(data && data.length > 0){
            for(let device of data){
                if(device.chiller && device.chiller.alert){
                    const result = await findAllByDeviceId(device.device_id);
                    const devicesHistory = result.shift();
                    // console.log(`device: ${device.device_name}, color: ${device.chiller.color}`);
                    // console.log(`device - old: ${devicesHistory?.device_name}, color: ${devicesHistory?.color}`);
                    await formatEmail(device, devicesHistory);
                }
            }
        }
    } catch (error) {
        // console.log(`something went wrong: ${error}`);
    }
}

async function formatEmail(item: any, itemOld: any){
    const data = {
        title: `${item.name} ${status[item.chiller.color] ? status[item.chiller.color] : 'unknown'}`,
        event_id: `${Date.now()}-${randomBytes(4).toString("hex")}`,
        ignition_state: item.chiller.ignition,
        temperature: Number(item.chiller.temperatur * 10),
        color: item.chiller.color,
        ignition: item.chiller.ignition,
        alert: item.chiller.alert,
        device_name: item.device_name,
        device_id: item.device_id,
        timestamp: new Date(item.chiller.timestamp)
    };

    if(data.ignition !== itemOld?.ignition || data.temperature!== itemOld?.temperature || data.color!== itemOld?.color){
        // console.log('mencoba kirim email');
        const compiledTemplate = handlebars.compile(templateAlert);
        const html = compiledTemplate(data);
        if(item.email){
            // console.log(`email ada : ${item.email} --> device : ${item.device_name}`);
            const result = await sendEmailHtml(html, item.email)
            if(!result.error){
                // console.log(`sukses kirim email`);
                await insert(data);
            }else{
                // console.log(`gagal kirim email ${result.error}`);
            }
        }
    }
}

const status: any = {
    Black: 'Down',
    Green: 'On',
    Red: 'Danger',
    Yellow: 'Warning'
}

// const job = schedule('*/5 * * * *', checkStatusAlert, { scheduled:false });
const job = schedule('* * * * *', checkStatusAlert, { scheduled:false });

export default job;