
import * as fs from 'fs'
import assert from 'node:assert'

import { Weapon, Fuse, Enemy, Input, Calculator } from '../assets/totkdc.js'

let ntests = 0

function deepStrictPartialEqual(result, expected) {
    if(typeof result != typeof expected) {
        return assert.deepStrictEqual(result, expected)
    }
    let keys = Object.keys(expected)
    for(const key of keys) {
        console.log(key)
        assert.deepStrictEqual(result[key], expected[key])
    }
}

function run_test(test) {
    ntests += 1
    let weapon = Weapon.from_name(test.weapon)
    let fuse = Fuse.from_name(test.fuse)
    let enemy = Enemy.from_name(test.enemy)
    assert.strictEqual(weapon.name, test.weapon)
    assert.strictEqual(fuse.name, test.fuse)
    assert.strictEqual(enemy.name, test.enemy)

    let input = new Input()
    if(test.attackType) { input.attackType = test.attackType }
    if(test.weakened !== undefined) { input.weakened = test.weakened }
    if(test.buff1) { input.buff1 = test.buff1 }
    if(test.buff2) { input.buff2 = test.buff2 }
    if(test.zonaite !== undefined) { input.zonaite = test.zonaite }
    if(test.sageWill !== undefined) { input.sageWill = test.sageWill }
    if(test.hp !== undefined) { input.hp = test.hp }
    if(test.wet !== undefined) { input.wet = test.wet }
    if(test.durability !== undefined) { input.durability = test.durability }

    let calc = new Calculator(weapon, fuse, enemy, input)
    let result = calc.calc()
    //console.log(result)
    deepStrictPartialEqual(result, test.expected)
}
let tests = []
try {
    tests = JSON.parse(fs.readFileSync('./tests/tests.json','utf-8'))
} catch(err) {
    console.log("Error reading tests.json file")
    console.log(err)
}

for(const test of tests) {
    run_test(test)
}

let weapons = []
try {
    weapons = JSON.parse(fs.readFileSync("./src/weapon_data.json","utf-8"))
} catch(err) {
    console.log(err)
}


let enemy = Enemy.from_name("Bokoblin")
let base = { fuse: "None", enemy: "Bokoblin" }
for(const weapon of weapons) {
    let add = 0
    let mul = 1
    if(weapon.property == "Wind Razor") {
        add = 10
    } else if(weapon.property == "Multishot x3-5" || weapon.property == "Multishot x3") {
        mul = 3
    } else if(weapon.property == "Multishot x2") {
        mul = 2
    }
    {
        let test = Object.assign({}, base, { weapon: weapon.name, expected: { damageOutput: (weapon.baseAttack + add) * mul} })
        run_test(test)
    }
    {
        // Acient Blade on All weapons
        let test = Object.assign({}, { fuse: "Ancient Blade", enemy: "Bokoblin" },
                                 { weapon: weapon.name, expected: { damageOutput: enemy.hp  } })
        run_test(test)
    }
    {
        // Mineru Bonus
        let extra = 13
        if(weapon.name == "None (Earthwake Technique)") {
            add = 0
            extra = 0
        }
        let test = Object.assign({}, base, { weapon: weapon.name, expected: { damageOutput: (weapon.baseAttack + add + extra) * mul }, zonaite: true})
        run_test(test)
    }
    {
        // Mineru Bonus
        let extra = 13
        if(weapon.name == "None (Earthwake Technique)") {
            add = 0
            extra = 0
        }
        let test = Object.assign({}, base, { weapon: weapon.name, expected: { damageOutput: (weapon.baseAttack + add + extra) * mul }, sageWill: true})
        run_test(test)
    }
    
    {
        // Low Health
        let mul_low = 1
        let hp = weapon.baseAttack
        if(weapon.property == "Low Health x2") { mul_low = 2 }
        if(weapon.name == "Demon King's Bow") { hp = 1 * 2 }
        let test = Object.assign({}, base, { weapon: weapon.name, expected: { damageOutput: (hp + add ) * mul * mul_low }, hp: 1})
        run_test(test)
    }
    {
        // Wet Player
        let mul_wet = 1
        let hp = weapon.baseAttack
        if(weapon.property == "Wet x2") { mul_wet = 2 }
        let test = Object.assign({}, base, { weapon: weapon.name, expected: { damageOutput: (hp + add) * mul * mul_wet }, wet: true})
        run_test(test)
    }
    {
        // Sneakstrike
        let mul2 = 8
        let hp = weapon.baseAttack
        if(weapon.property == "Sneakstrike x2") { mul2 *= 2 }
        if(weapon.name == "None (Earthwake Technique)") { add = 0; mul = 1; mul2 = 1; }

        let test = Object.assign({}, base, { weapon: weapon.name, expected: { damageOutput: (hp) * mul * mul2 + add }, attackType: "Sneakstrike"})
        //console.log(test)
        run_test(test)
    }
    {
        // Low Durability
        let mul2 = 1
        let hp = weapon.baseAttack
        if(weapon.property == "Low Durability x2") { mul2 = 2 }
        if(weapon.name == "None (Earthwake Technique)") { add = 0; mul = 1; mul2 = 1; }

        let test = Object.assign({}, base, { weapon: weapon.name, expected: { damageOutput: (hp) * mul * mul2 + add }, durability: 2})
        run_test(test)
    }
    {
        // Bone Proficiency
        let mul2 = 1
        let hp = weapon.baseAttack
        if(weapon.property == "Bone") { mul2 = 1.8 }
        if(weapon.name == "None (Earthwake Technique)") { add = 0; mul = 1; mul2 = 1; }
        if(weapon.name == "Mineru's Construct") { add = 0; mul = 1; mul2 = 1; }

        let test = Object.assign({}, base, { weapon: weapon.name, expected: { damageOutput: Math.floor( (hp) * mul * mul2 + add ) }, buff1: "Bone Weap. Prof."})
        run_test(test)
    }
    {
        // FlurryRush
        let mul2 = 1
        let hp = weapon.baseAttack
        if(weapon.property == "Flurry Rush x2") { mul2 = 2 }
        if(weapon.name == "None (Earthwake Technique)") { add = 0; mul = 1; mul2 = 1; }

        let test = Object.assign({}, base, { weapon: weapon.name, expected: { damageOutput: Math.floor( (hp) * mul * mul2 + add ) }, attackType: "Flurry Rush"})
        run_test(test)
    }
    {
        // Shatter
        let mul2 = 1
        let hp = weapon.baseAttack
        if(weapon.property == "Shatter Rock") { mul2 = 1.25 + ( (weapon.type == 1 || weapon.type >= 3) ? 0.25 : 0); }
        if(weapon.name == "None (Earthwake Technique)") { add = 0; mul = 1; mul2 = 1; }

        let test = Object.assign({}, base,
                                 {enemy: "Battle Talus"},
                                 { weapon: weapon.name, expected: { damageOutput: Math.floor( (hp) * mul * mul2 + add ) }})
        run_test(test)
    }
    

}

// Chuchu with Wind Razor => Enemy.HP
const small = Enemy.from_name("Chuchu (Small)")
const medium = Enemy.from_name("Chuchu (Medium)")
const large = Enemy.from_name("Chuchu (Large)")
run_test({weapon: "Eightfold Longblade", enemy: "Chuchu (Small)", fuse: "None", expected: { damageOutput: small.hp}  })
run_test({weapon: "Eightfold Longblade", enemy: "Chuchu (Medium)", fuse: "None", expected: { damageOutput: medium.hp}  })
run_test({weapon: "Eightfold Longblade", enemy: "Chuchu (Large)", fuse: "None", expected: { damageOutput: large.hp}  })

const aerocuda = Enemy.from_name("Aerocuda")
run_test({weapon: "Master Sword", enemy: "Aerocuda", fuse: "None", attackType: "Perfect Parry", expected: { damageOutput: aerocuda.hp }})
const keese = Enemy.from_name("Keese")
run_test({weapon: "Master Sword", enemy: "Keese", fuse: "None", attackType: "Perfect Parry", expected: { damageOutput: keese.hp }})

// 0, 1 and 2 weapon types (Shield Bash = 0)
run_test({weapon: "Master Sword", enemy: "Keese", fuse: "None", attackType: "Shield Bash", expected: { damageOutput: 0 }})
run_test({weapon: "Giant Boomerang", enemy: "Keese", fuse: "None", attackType: "Shield Bash", expected: { damageOutput: 0 }})
run_test({weapon: "Zora Spear", enemy: "Keese", fuse: "None", attackType: "Shield Bash", expected: { damageOutput: 0 }})

run_test({weapon: "Master Sword", enemy: "Bokoblin", fuse: "None", attackType: "Perfect Parry", expected: { damageOutput: 0 }})
run_test({weapon: "Giant Boomerang", enemy: "Bokoblin", fuse: "None", attackType: "Perfect Parry", expected: { damageOutput: 0 }})
run_test({weapon: "Zora Spear", enemy: "Bokoblin", fuse: "None", attackType: "Perfect Parry", expected: { damageOutput: 0 }})

let pebblit = Enemy.from_name("Stone Pebblit")
run_test({weapon: "Master Sword", enemy: "Stone Pebblit", fuse: "None", expected: {damageOutput: 0}, attackType: "Master Sword Beam"})
run_test({weapon: "Master Sword", enemy: "Stone Pebblit", fuse: "None", expected: {damageOutput: 0}, attackType: "Sidon's Water"})

run_test({weapon: "Cobble Crusher", enemy: "Stone Pebblit", fuse: "None", expected: {damageOutput: pebblit.hp}, attackType: "Throw"})
run_test({weapon: "Boomerang", enemy: "Stone Pebblit", fuse: "Lynel Hoof", expected: {damageOutput: pebblit.hp/2}, attackType: "Throw"})
run_test({weapon: "Cobble Crusher", enemy: "Stone Pebblit", fuse: "None", expected: {damageOutput: pebblit.hp}, attackType: "Riju's Lightning"})
run_test({weapon: "Boomerang", enemy: "Stone Pebblit", fuse: "None", expected: {damageOutput: pebblit.hp}, attackType: "Riju's Lightning"})
run_test({weapon: "Giant Boomerang", enemy: "Stone Pebblit", fuse: "Lynel Hoof", expected: {damageOutput: pebblit.hp}})
run_test({weapon: "Master Sword", enemy: "Stone Pebblit", fuse: "Lynel Hoof", expected: {damageOutput: pebblit.hp/2}})

run_test({weapon: "Master Sword", enemy: "Stone Pebblit", fuse: "None", expected: {damageOutput: 0}})


let master_sword = Weapon.from_name("Master Sword")
run_test({weapon: "Master Sword", enemy: "Bokoblin (Armored)", fuse: "None", expected: {damageOutput: 0}})
run_test({weapon: "Master Sword", enemy: "Bokoblin (Armored)", fuse: "None", expected: {damageOutput: master_sword.baseAttack}, weakened: true})


let gibdo = Enemy.from_name("Gibdo")
run_test({weapon: "Master Sword", enemy: "Gibdo", fuse: "None", expected: {damageOutput: 1}})

let fire_chuchu = Enemy.from_name("Fire Chuchu (Small)")
run_test({weapon: "Master Sword", enemy: "Fire Chuchu (Small)", fuse: "None", expected: {damageOutput: fire_chuchu.hp}, attackType: "Sidon's Water"})
run_test({weapon: "Master Sword", enemy: "Fire Chuchu (Small)", fuse: "Splash Fruit", expected: {damageOutput: fire_chuchu.hp}})

run_test({weapon: "Master Sword", enemy: "Fire Chuchu (Small)", fuse: "None", expected: {damageOutput: master_sword.projectileAttack}, attackType: "Master Sword Beam"})
run_test({weapon: "Master Sword", enemy: "Fire Chuchu (Small)", fuse: "None", expected: {damageOutput: master_sword.projectileAttack * 1.5}, attackType: "Master Sword Beam", buff1: "Master Sword Beam Up"})
run_test({weapon: "Master Sword", enemy: "Fire Chuchu (Small)", fuse: "None", expected: {damageOutput: master_sword.projectileAttack * 1.5}, attackType: "Master Sword Beam", buff2: "Master Sword Beam Up"})

run_test({weapon: "Master Sword", enemy: "Chuchu (Small)", fuse: "None", expected: {damageOutput: master_sword.baseAttack}, attackType: "Sidon's Water"})
run_test({weapon: "Master Sword", enemy: "Fire Wizzrobe", fuse: "None", expected: {damageOutput: master_sword.baseAttack * 1.5}, attackType: "Sidon's Water"})

let ew = Weapon.from_name("None (Earthwake Technique)")
run_test({weapon: "None (Earthwake Technique)", enemy: "Fire Wizzrobe", fuse: "None", expected: {damageOutput: ew.baseAttack}})
run_test({weapon: "None (Earthwake Technique)", enemy: "Evermean", fuse: "None", expected: {damageOutput: 0}, attackType: "Throw"})
run_test({weapon: "None (Earthwake Technique)", enemy: "Bokoblin", fuse: "None", expected: {damageOutput: 0}, attackType: "Throw"})

run_test({weapon: "Eightfold Blade", enemy: "Bokoblin", fuse: "Silver Lynel Saber Horn", attackType: 'Sneakstrike',
          expected: { fusedName: "Silver Lynel Reaper", damageOutput: 976 }})
run_test({weapon: "Eightfold Blade", enemy: "Bokoblin", fuse: "Silver Lynel Saber Horn", 
          expected: { fusedName: "Silver Lynel Reaper", damageOutput: 61 }})
run_test({weapon: "Royal Guard's Claymore*", enemy: "Lynel", fuse: "Silver Lynel Saber Horn", durability: 1,
          expected: { fusedName: "Silver Lynel Blade", damageOutput: 396 }})

console.log(`Ran ${ntests} tests`)
