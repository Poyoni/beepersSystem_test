import jsonfile from 'jsonfile';
import {Beeper} from '../models/beeperType';

export const writeBeeperToJsonFile = async (beeper: Beeper)=>{

    jsonfile.readFile('./data/db.json')
    .then(beepers => {
        beepers.push(beeper);
        jsonfile.writeFile('./data/db.json', beepers, function (err) {
    if (err) console.error(err)
  })

    })
    .catch(error => console.error(error))
}

export const readBeepersJsonFile = async()=>{

    const beepers = await jsonfile.readFile('./data/db.json');
    return beepers;
}