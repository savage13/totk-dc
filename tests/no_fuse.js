
import * as fs from 'fs';

let weapons = JSON.parse(fs.readFileSync("./src/weapon_data.json","utf-8"))

for(const weapon of weapons) {
    console.log(weapon)
    break
}
