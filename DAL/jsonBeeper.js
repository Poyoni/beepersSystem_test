var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from 'jsonfile';
export const writeBeeperToJsonFile = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    jsonfile.readFile('./data/db.json')
        .then(beepers => {
        beepers.push(beeper);
        jsonfile.writeFile('./data/db.json', beepers, function (err) {
            if (err)
                console.error(err);
        });
    })
        .catch(error => console.error(error));
});
export const readBeepersJsonFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile.readFile('./data/db.json');
    return beepers;
});
export const deleteBeeperFromJson = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield jsonfile.readFile('./data/db.json');
        const newBeepersArray = beepers.filter((b) => b.id !== beeperId);
        yield jsonfile.writeFile('./data/db.json', newBeepersArray, function (err) {
            if (err)
                console.error(err);
        });
    }
    catch (error) {
        console.error("Error updating user's books:", error);
        throw error;
    }
});
