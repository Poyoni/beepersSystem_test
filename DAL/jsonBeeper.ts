import jsonfile from 'jsonfile';
import {Beeper, BeeperStatus} from '../models/beeperType.js';
import {checkLocation} from '../serves/serves.js';

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

export const deleteBeeperFromJson = async( beeperId: number) => {

    try{
    const beepers: Beeper[] = await jsonfile.readFile('./data/db.json')

    const newBeepersArray = beepers.filter((b: Beeper) => b.id !== beeperId);

    await jsonfile.writeFile('./data/db.json', newBeepersArray, function (err) {
        if (err) console.error(err)
      })

    }catch (error){
        console.error("Error updating user's books:", error);
        throw error;
    }
}

export const changeStatus = async (beeperId: number, LAT: number, LON:number) => {
    try {
        const beepers: Beeper[] = await readBeepersJsonFile();
        
        const beeperFind: Beeper | undefined = beepers.find((b) => b.id === beeperId);

        if (!beeperFind) {
            console.error('Beeper not found');
            return;
        }

        switch (beeperFind.status) { 
            case BeeperStatus.Manufactured: 
                beeperFind.status = BeeperStatus.Assembled;
                break; 
            case BeeperStatus.Assembled:  
                beeperFind.status = BeeperStatus.Shipped;
                break; 
            case BeeperStatus.Shipped:
                if(checkLocation(LON,LAT)){
                    beeperFind.status = BeeperStatus.Deployed;
                    await jsonfile.writeFile('./data/db.json', beepers);
                    setTimeout(() => {
                        beeperFind.status = BeeperStatus.Detonated;
                        beeperFind.exploded_at = new Date();
                        jsonfile.writeFile('./data/db.json', beepers);
                    }, 10000);
                }
                return; 
            default:
                console.error('Invalid beeper status');
                return;
        }

        await jsonfile.writeFile('./data/db.json', beepers);
    } catch (err: any) {
        console.error('Error:', err);
        throw err; 
    }
};
