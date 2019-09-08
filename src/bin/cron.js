import cron from "cron";
import db from '../db/db'
import CronModel from '../v1/models/cronModel'
import Sites from '../v1/models/sites'
import moment from 'moment'

const CronJob = cron.CronJob;

const getMaxPayload = (siteDetailsByid, site_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let payload = {
                site_id: site_id,
                object: '',
                eventDate: '',
                lifetime: '',
                instantaneous: ''
            }
            let maxLifetime = Math.max.apply(Math, siteDetailsByid.data.map(function (item) {
                return item.lifetime;
            }));
            let maxInstantaneous = Math.max.apply(Math, siteDetailsByid.data.map(function (item) {
                return item.instantaneous;
            }));
            let maxObject = Math.max.apply(Math, siteDetailsByid.data.map(function (item) {
                return item.object;
            }));

            var mxDate = siteDetailsByid.data.reduce(function (a, b) {
                return a.event_date > b.event_date ? a.event_date : b.event_date;
            });
            let newDateObj = moment(mxDate).add(30, 'm').toDate();
            payload.site_id = site_id
            payload.object = maxObject + 1
            payload.lifetime = maxLifetime + 100
            payload.instantaneous = maxInstantaneous + 25
            payload.eventDate = moment(new Date(newDateObj)).format("YYYY-MM-DD hh:mm:ss")
            resolve(payload)

        } catch (err) {
            reject(err);
        }
    });
}

new CronJob("0 0 */1 * * *", async function () {
    try {
        console.log('running a task every two minutes');
        let ids = await CronModel.getAllSiteIds()
        let rand = ids.data[Math.floor(Math.random() * ids.data.length)];
        let siteDetailsByid = await Sites.getSitesById(rand.id)
        let findMaxValues = await getMaxPayload(siteDetailsByid, rand.id)
        let insertSiteValues = await CronModel.insertSiteDataFromCron(findMaxValues)
        console.log('Object Inserted successfully into Site Id', rand.id)
    } catch (err) {
        console.log('Error ==>>', err)
    }
}, null, true);