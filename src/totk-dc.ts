
//import { TotKCalculatorModel } from './totk-calc'

import WeaponData from './weapon_data.json'
import FuseData from './fuse_data.json'
import EnemyData from './enemy_data.json'


export * as WeaponData from './weapon_data.json'
export * as FuseData from './fuse_data.json'
export * as EnemyData from './enemy_data.json'

function weapon_from_name(name: string): any | undefined {
    return WeaponData.find((w: any) => w.name == name)
}
function fuse_from_name(name: string): any | undefined {
    return FuseData.find((f: any) => f.name == name)
}
function enemy_from_name(name: string): any | undefined {
    return EnemyData.find((e: any) => e.name == name)
}
function fuse_from_sort_order(n: number): any | undefined {
    return FuseData.find((e: any) => e.sortOrder == n)
}
function weapon_from_sort_order(n: number): any | undefined {
    return WeaponData.find((e: any) => e.sortOrder == n)
}
function enemy_from_sort_order(n: number): any | undefined {
    return EnemyData.find((e: any) => e.sortOrder == n)
}


const attackOptions = [
    "Standard Attack",
    "Shoot Arrow",
    "Shield Bash",
    "Perfect Parry",
    "Earthwake Technique",
    "Combo Finisher",
    "Throw",
    "Sneakstrike",
    "Flurry Rush",
    "Sidon's Water",
    "Riju's Lightning",
    "Master Sword Beam",
    "Horseback"
]

function unpack(value: number, bits: number[]): number[] {
    let N0 = value
    let out = []
    for (let i = 0; i < bits.length; i++) {
        out.push(N0 & ((1 << bits[i]) - 1))
        N0 = N0 >> bits[i]
    }
    return out
}
function pack(values: number[], bits: number[]): number {
    let k = 0
    let N0 = 0
    for (let i = 0; i < bits.length; i++) {
        N0 = N0 | (values[i] << k)
        k += bits[i]
    }
    return N0
}


export class Weapon {
    actorID: string;
    name: string;
    type: number;
    canCut: boolean;
    baseAttack: number;
    projectileAttack: number;
    durability: number;
    property: string;
    canHaveAttackUpMod: boolean;
    fuseExtraDurability: number;
    fuseBaseName: string;
    namingRule: string;
    iconURL: string;
    sortOrder: number;
    constructor(w: any) {
        this.actorID = w.actorID
        this.name = w.name
        this.type = w.type
        this.canCut = w.canCut
        this.baseAttack = w.baseAttack
        this.projectileAttack = w.projectileAttack
        this.durability = w.durability
        this.property = w.property
        this.canHaveAttackUpMod = w.canHaveAttackUpMod
        this.fuseExtraDurability = w.fuseExtraDurability
        this.fuseBaseName = w.fuseBaseName
        this.namingRule = w.namingRule
        this.iconURL = w.iconURL
        this.sortOrder = w.sortOrder
    }
    static from_name(name: string): Weapon | null {
        let w = weapon_from_name(name)
        if (!w) { return null }
        return new Weapon(w)
    }
}

export class Fuse {
    actorID: string;
    name: string;
    baseAttack: number;
    projectileAttack: number;
    elementPower: number;
    weaponDurability: number;
    mineruDurability: number;
    canFuseToArrow: boolean;
    arrowMultiplier: number;
    canCut: boolean;
    addsShieldAttack: boolean;
    replaceProperties: boolean;
    property1: string;
    property2: string;
    property3: string;
    namingRule: string;
    adjective: string;
    bindTypeSword: string;
    bindTypeSpear: string;
    iconURL: string;
    sortOrder: number;
    constructor(f: any) {
        this.actorID = f.actorID
        this.name = f.name
        this.baseAttack = f.baseAttack
        this.projectileAttack = f.projectileAttack
        this.elementPower = f.elementPower
        this.weaponDurability = f.weaponDurability
        this.mineruDurability = f.mineruDurability
        this.canFuseToArrow = f.canFuseToArrow
        this.arrowMultiplier = f.arrowMultiplier
        this.canCut = f.canCut
        this.addsShieldAttack = f.addsShieldAttack
        this.replaceProperties = f.replaceProperties
        this.property1 = f.property1
        this.property2 = f.property2
        this.property3 = f.property3
        this.namingRule = f.namingRule
        this.adjective = f.adjective
        this.bindTypeSword = f.bindTypeSword
        this.bindTypeSpear = f.bindTypeSpear
        this.iconURL = f.iconURL
        this.sortOrder = f.sortOrder

    }
    static from_name(name: string): Fuse | null {
        let f = fuse_from_name(name)
        if (!f) { return null }
        return new Fuse(f)
    }
}

export class Enemy {
    actorID: string;
    name: string;
    hp: number;
    element: string;
    fireDamage: number;
    fireDamageContinuous: number;
    canFreeze: boolean;
    iceDamage: number;
    shockDamage: number;
    waterDamage: number;
    rijuDamage: number;
    ancientBladeDefeat: boolean;
    isRock: boolean;
    canSneakstrike: boolean;
    canMeleeHeadshot: boolean;
    headshotMultiplier: number;
    arrowMultiplier: number;
    beamMultiplier: number;
    bombMultiplier: number;
    iconURL: string;
    sortOrder: number
    constructor(e: any) {
        this.actorID = e.actorID
        this.name = e.name
        this.hp = e.hp
        this.element = e.element
        this.fireDamage = e.fireDamage
        this.fireDamageContinuous = e.fireDamageContinuous
        this.canFreeze = e.canFreeze
        this.iceDamage = e.iceDamage
        this.shockDamage = e.shockDamage
        this.waterDamage = e.waterDamage
        this.rijuDamage = e.rijuDamage
        this.ancientBladeDefeat = e.ancientBladeDefeat
        this.isRock = e.isRock
        this.canSneakstrike = e.canSneakstrike
        this.canMeleeHeadshot = e.canMeleeHeadshot
        this.headshotMultiplier = e.headshotMultiplier
        this.arrowMultiplier = e.arrowMultiplier
        this.beamMultiplier = e.beamMultiplier
        this.bombMultiplier = e.bombMultiplier
        this.iconURL = e.iconURL
        this.sortOrder = e.sortOrder

    }
    static from_name(name: string): Enemy | null {
        let e = enemy_from_name(name)
        if (!e) { return null }
        return new Enemy(e)
    }
}


export class TotKCalculatorModel {
    selectedWeapon: Weapon;
    selectedFuse: Fuse;
    selectedEnemy: Enemy;
    constructor() {
        this.selectedWeapon = new Weapon()
        this.selectedFuse = new Fuse()
        this.selectedEnemy = new Enemy()
    }
}

export class Input {
    attackUpMod: number;
    attackType: string;
    criticalHitMod: boolean;
    multishot: boolean
    zonaite: boolean;
    sageWill: boolean;
    durability: number;
    freezeDurability: boolean;
    wet: boolean;
    headshot: boolean;
    frozen: boolean;
    weakened: boolean;
    fence: boolean;
    hp: number;
    buff1: string;
    buff2: string;
    freeMode: boolean;
    trueDamage: boolean;
    sortFuseByAttack: boolean;
    constructor() {
        this.attackUpMod = 0
        this.attackType = "Standard Attack"
        this.criticalHitMod = false
        this.multishot = false
        this.zonaite = false
        this.sageWill = false
        this.durability = 40
        this.freezeDurability = false
        this.wet = false
        this.headshot = false
        this.frozen = false
        this.weakened = false
        this.fence = false
        this.hp = 38
        this.buff1 = "None"
        this.buff2 = "None"
        this.freeMode = false
        this.trueDamage = false
        this.sortFuseByAttack = false
    }
}


export class Calculator {
    weapon: Weapon;
    fuse: Fuse;
    enemy: Enemy;
    input: Input;
    properties: string[];
    damageNumList: number[];
    damageBeforeElement: number;
    constructor(weapon: Weapon, fuse: Fuse, enemy: Enemy, input: Input) {
        this.weapon = weapon
        this.fuse = fuse
        this.enemy = enemy
        this.input = input
        this.properties = []
        this.damageNumList = []
        this.damageBeforeElement = 0
        this.getProperties()
    }
    calc() {
        let fusedName = this.getName()
        let attackPowerUI = this.calculateAttackPowerUI()
        let blueDamageNum = (this.getGerudoBonus() > 1 || this.getZonaiBonus() > 0 ||
            this.getLowHealth() > 1 || this.getLowDurability() > 1 || this.getWetPlayer() > 1);
        let damageOutput = this.calculate()
        //console.log('damageOutput (calc)', damageOutput)
        // Clamp Frox HP
        if (this.enemy.name == "Frox" && damageOutput > 140)
            damageOutput = 140;
        if (this.enemy.name == "Obsidian Frox" && damageOutput > 270)
            damageOutput = 270;
        if (this.enemy.name == "Blue-White Frox" && damageOutput > 420)
            damageOutput = 420;

        // Clamp Demon Dragon HP
        if (this.enemy.name == "Demon Dragon" && damageOutput > 1200)
            damageOutput = 1200;

        let defeated = false
        // Defeated Check
        if (damageOutput >= this.enemy.hp) {
            defeated = true;
        }
        //console.log(damageOutput)
        let totalBaseAttack = this.getBaseAttack() + this.getAttackUpMod();
        let totalFuseAttack = this.getFuseBaseAttack() * this.getGerudoBonus() + this.getZonaiBonus();
        let totalAttack = totalBaseAttack + totalFuseAttack;

        let Formula = `Formula: BaseAttack(${this.getBaseAttack()})`;
        if (this.fuse.name != "None") {
            Formula += ` + FuseUIAdjust(FuseBaseAttack(${this.getFuseBaseAttack()})`;
            if (this.getGerudoBonus() > 1) { Formula += ` * GerudoBonus(${this.getGerudoBonus()})`; }
            if (this.getAttackUpMod() > 0) { Formula += ` + AttackUpMod(${this.getAttackUpMod()})`; }
            if (this.getZonaiBonus() > 0) { Formula += ` + ZonaiBonus(${this.getZonaiBonus()})`; }
            Formula += ")";
        } else if (this.getAttackUpMod() > 0) {
            Formula += ` + AttackUpMod({this.getAttackUpMod})`;
        }
        if (this.getLowHealth() > 1) {
            Formula += ` * LowHealth({this.getLowHealth})`;
        }
        if (this.getWetPlayer() > 1) { Formula += ` * WetPlayer(${this.getWetPlayer()})`; }
        if (this.getSneakstrike() > 1) { Formula += ` * Sneakstrike(${this.getSneakstrike()})`; }
        if (this.getLowDurability() > 1) { Formula += ` * LowDurability(${this.getLowDurability()})`; }
        if (this.getBone() > 1) { Formula += ` * Bone(${this.getBone()})`; }
        if (this.getFlurryRush() > 1) { Formula += ` * FlurryRush(${this.getFlurryRush()})`; }
        if (this.getShatter() > 1) { Formula += ` * Shatter(${this.getShatter()})`; }
        if (this.getAttackUp() > 1) { Formula += ` * AttackUp(${this.getAttackUp()})`; }
        if (this.getHeadshot() > 1) { Formula += ` * Headshot(${this.getHeadshot()})`; }
        if (this.getThrow() > 1) { Formula += ` * Throw(${this.getThrow()})`; }
        if (this.getOneDurability() > 1) { Formula += ` * OneDurability(${this.getOneDurability()})`; }
        if (this.getFrozen() > 1) { Formula += ` * Frozen(${this.getFrozen()})`; }
        if (this.getTreeCutter() > 1) { Formula += ` * TreeCutter(${this.getTreeCutter()}))`; }
        if (this.getArrowEnemyMult() > 1) { Formula += ` * ArrowEnemyMult(${this.getArrowEnemyMult()})`; }
        if (this.getCriticalHit() > 1) { Formula += ` * CriticalHit(${this.getCriticalHit()})`; }
        if (this.getHorseback() > 1) { Formula += ` * Horseback(${this.getHorseback()})`; }
        if (this.getDemonDragon() > 1) { Formula += ` * DemonDragon(${this.getDemonDragon()})`; }
        if (this.getElementalDamage() > 0) { Formula += ` + ElementalDamage(${this.getElementalDamage()})`; }
        if (this.getElementalMult() > 1) { Formula += `; Multiply result by ElementalMult(${this.getElementalMult()})`; }
        if (this.getContinuousFire() > 0) { Formula += ` + ContinuousFire(${this.getContinuousFire()})`; }

        const id = this.encode_input()
        //const ID = id.map(x => x.toString(16).padStart(8, '0')).join("-")
        //let id2 = ID.split("-").map(v => parseInt(v, 16))
        //console.log(id, ID, id2, this.decode_id(id))


        //`Base({TotalBaseAttack}) + Fuse(${TotalFuseAttack}) = ${TotalAttack}`;
        return {
            success: true,
            message: "Success",
            attackPowerUI,
            damageOutput,
            properties: this.properties,
            fusedName,
            formula: Formula,
            damageNumList: this.damageNumList,
            blueDamageNum,
            defeated,
            id,
        }
    }
    static from_id(id: number[] | string) {
        if (typeof id == 'string') {
            id = id.split("-").map(v => parseInt(v, 16))
        }
        let out = Calculator.decode_id(id)
        return new Calculator(out.weapon, out.fuse, out.enemy, out)
    }

    static decode_id(id: number[]) {
        let out = {}
        {
            let n = [10, 8, 8, 4]
            let x = unpack(id[0], n)
            out.fuse_num = x[0]
            out.weapon_num = x[1]
            out.enemy_num = x[2]
            out.attackType_num = x[3]
            out.fuse = fuse_from_sort_order(out.fuse_num)
            out.weapon = weapon_from_sort_order(out.weapon_num)
            out.enemy = enemy_from_sort_order(out.enemy_num)
            out.attackType = attackOptions[out.attackType_num]
        }
        {
            let n = [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 8]
            let x = unpack(id[1], n)
            out.attackUpMod = x[0]
            out.criticalHitMod = x[1] == 1
            out.multishot = x[2] == 1
            out.zonaite = x[3] == 1
            out.sageWill = x[4] == 1
            out.wet = x[5] == 1
            out.headshot = x[6] == 1
            out.frozen = x[7] == 1
            out.weakened = x[8] == 1
            out.fence = x[9] == 1
            out.freezeDurability = x[10] == 1
            out.freeMode = x[11] == 1
            out.trueDamage = x[12] == 1
            out.sortFuseByAttack = x[13] == 1
            out.durability = x[14]
            out.hp = x[15]
        }
        return out
    }
    encode_input() {
        let N0 = 0
        let N1 = 1
        {
            let n = [10, 8, 8, 4]
            let x = [
                this.fuse.sortOrder, this.weapon.sortOrder, this.enemy.sortOrder,
                attackOptions.indexOf(this.input.attackType)
            ]
            N0 = pack(x, n)
        }

        {
            let n = [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 8]
            let x = [
                this.input.attackUpMod, +this.input.criticalHitMod,
                +this.input.multishot, +this.input.zonaite, +this.input.sageWill,
                +this.input.wet,
                +this.input.headshot, +this.input.frozen, +this.input.weakened,
                +this.input.fence, +this.input.freezeDurability, +this.input.freeMode,
                +this.input.trueDamage, +this.input.sortFuseByAttack,
                this.input.durability, this.input.hp
            ]
            N1 = pack(x, n)
        }
        return [N0, N1]
        //}
    }
    xdecode_input(ids) {
        let [id, id2] = ids
        let fuse_id = id & ((1 << NF) - 1)
        let weapon_id = (id >> NF) & ((1 << NW) - 1)
        let enemy_id = (id >> (NF + NW)) & ((1 << NE) - 1)
        let attack_id = (id >> (NF + NW + NE)) & ((1 << NA) - 1)
        let durability = id2 & ((1 << ND) - 1)
        console.log(id, id2, fuse_id, weapon_id, enemy_id, attack_id, attackOptions[attack_id], durability)
    }


    getName() {

        let adjective = this.fuse.adjective
        let fuseName = this.fuse.name
        let fuseNamingRule = this.fuse.namingRule
        let fuseIsWeapon = this.fuse.weaponDurability > 0
        let replaceProperties = this.fuse.replaceProperties
        //let fuseCanCut = fuse.canCut

        let baseName = this.weapon.fuseBaseName
        let weaponNamingRule = this.weapon.namingRule
        let weaponName = this.weapon.name
        let weaponProperty = this.weapon.property
        let weaponType = this.weapon.type
        let weaponCanCut = this.weapon.canCut

        let isBoomerang = weaponProperty == "Boomerang"

        let meleeProjectileProperty = this.scanProperties("Melee Projectile")
        let shatterProperty = this.scanProperties("Shatter Rock")
        let treeCutterProperty = this.scanProperties("Tree Cutter")
        let canCut = this.scanProperties("Cut")

        let bindType

        let isZonaiWeapon = false
        let elementAdjective = "Flame "
        let reuseSeedElement = false

        bindType = (weaponType == 2) ? this.fuse.bindTypeSpear : this.fuse.bindTypeSword;

        // console.log('adjective', adjective)
        // console.log('fuseName', fuseName)
        // console.log('fuseNamingRule', fuseNamingRule)
        // console.log('weaponName', weaponName)
        // console.log('weaponNamingRule', weaponNamingRule)
        // console.log('weaponType', weaponType)
        // console.log('fuseIsWeapon', fuseIsWeapon)
        // console.log('meleeProjectileProperty', meleeProjectileProperty)
        // console.log('shatterProperty', shatterProperty)
        // console.log('treeCutterProperty', treeCutterProperty)
        // console.log('canCut', canCut)
        // console.log('replaceProperties', replaceProperties)
        // console.log('baseName', baseName)

        if (weaponProperty == "Zonai Lv1" ||
            weaponProperty == "Zonai Lv2" ||
            weaponProperty == "Zonai Lv3") {
            isZonaiWeapon = true
        }

        if (baseName == "Master Sword") {
            if (weaponName == "Master Sword (Prologue)") {
                return "MsgNotFound"
            }
            return "Master Sword"
        }

        if (baseName == "Decayed Master Sword") {
            return baseName
        }

        if (weaponType == 3) {
            return `${weaponName} (${fuseName} Arrow)`
        }
        if (weaponType == 4) {
            return `${adjective} ${baseName} `
        }
        if (weaponType == 5) {
            return weaponName
        }
        if (fuseIsWeapon) {
            return `${adjective} ${baseName} `
        }
        if (fuseNamingRule == "Whip") {
            return `${adjective} Tail Whip`
        }
        if (fuseName == "Courser Bee Honey") {
            return `${adjective} ${baseName} `
        }
        if (meleeProjectileProperty) {
            if (weaponProperty == "Bone" || isBoomerang || isZonaiWeapon) {
                return `${adjective} Rod`
            }
            return `${adjective} ${baseName} `
        }
        if (fuseNamingRule == "UnlikeHammer") {
            switch (weaponType) {
                case 0: return `${adjective} Pounder` // 1H
                case 1: return `${adjective} Smasher` // 2H
                case 2: return `${adjective} Pulverizer` // Spear
                default: break
            }
        }
        if (shatterProperty) {
            if (weaponName == "Gloom Club") { // Removed code about bindType == Attach?
                return `${adjective} ${baseName} `
            }
            if (isBoomerang) {
                return `${adjective} Boomerang`
            }
            if (weaponType == 2) {
                return `${adjective} Sledge` // Spear
            }
            if (weaponType < 2) {
                return `${adjective} Hammer` // 1H or 2H
            }
        }

        if (weaponNamingRule == "ImpressiveGrip") {
            if (weaponType == 2 && !weaponCanCut) {
                return `${adjective} ${baseName} `
            }
        }

        if ((weaponNamingRule == "ImpressiveGrip" ||
            weaponNamingRule == "UnlikeBat") &&
            !canCut) {
            return `${adjective} ${baseName} `
        }

        // Incorrect Rule?
        // if(weaponType == 2 && !fuseCanCut) {
        //    return `${ adjective } Spear`
        // }
        if (fuseNamingRule == "Fan") {
            if (weaponType == 2) {
                return `${adjective} Spear`
            }
            return `${adjective} Guster`
        }

        if (fuseNamingRule == "PowHammer") {
            if (isZonaiWeapon) {
                switch (weaponType) {
                    case 0: return "Bouncy Club" // 1H
                    case 1: return "Bouncy Bat" // 2H
                    case 2: return "Bouncy Spear" // Spear
                    default: break
                }
            }
            return `Bouncy ${baseName} `
        }

        if (fuseNamingRule == "ReuseSeedFireBurst") {
            elementAdjective = "Flame"
            reuseSeedElement = true
        }
        if (fuseNamingRule == "ReuseSeedIceBurst") {
            elementAdjective = "Freezing"
            reuseSeedElement = true
        }
        if (fuseNamingRule == "ReuseSeedShockBurst") {
            elementAdjective = "Electric"
            reuseSeedElement = true
        }
        if (reuseSeedElement) {
            if (isZonaiWeapon) {
                switch (weaponType) {
                    case 0: return `${elementAdjective} Club` // 1H
                    case 1: return `${elementAdjective} Bat` // 2H
                    case 2: return `${elementAdjective} Spear` // Spear
                    default: break
                }
            }
            return `${elementAdjective} ${baseName} `
        }

        if (fuseNamingRule == "LongThrow" || fuseNamingRule == "SpWing") {
            if (isZonaiWeapon) {
                switch (weaponType) {
                    case 0: return `Soaring Club` // 1H
                    case 1: return `Soaring Bat` // 2H
                    case 2: return `Soaring Spear` // Spear
                    default: break
                }
            }
            return `Soaring ${baseName} `
        }
        if (isBoomerang) {
            return `${adjective} ${baseName} `
        }

        if (fuseNamingRule == "Torch") {
            return `${adjective} Torch`
        }

        if (treeCutterProperty) {
            switch (weaponType) {
                case 0: return `${adjective} Axe` // 1H
                case 1: return `${adjective} Two - Handed Axe` // 2H
                case 2: return `${adjective} Halberd` // Spear
                default: break
            }
        }
        if (canCut && replaceProperties) {
            switch (weaponType) {
                case 0: return `${adjective} Reaper`; // 1H
                case 1: return `${adjective} Blade`; // 2H
                case 2: return `${adjective} Spear`; // Spear
                default: break;
            }
        }

        //console.log("getName()", adjective, baseName, canCut, weaponType)
        if ((!canCut && weaponType != 2) || replaceProperties || isZonaiWeapon) {
            switch (weaponType) {
                case 0: return `${adjective} Club` // 1H
                case 1: return `${adjective} Bat` // 2H
                case 2: return `${adjective} Spear` // Spear
                default: break
            }
        }
        //console.log("getName()", adjective, baseName)
        // Pointless check?
        if (canCut && !replaceProperties && bindType == "Replace") {
            return `${adjective} ${baseName} `
        }

        return `${adjective} ${baseName} `
    }


    getProperties() {
        this.properties = []
        if (this.weapon.type != 2 && this.weapon.type != 3) {
            if (this.fuse.replaceProperties == true) {
                if (this.fuse.canCut == true) {
                    this.properties.push("Cut");
                }
            } else {
                if (this.weapon.canCut == true) {
                    this.properties.push("Cut");
                }
            }
        }

        // Don't add Wind Razor if not cut
        if (this.weapon.property == "Wind Razor" && this.properties.length == 0) {
            this.weapon.property = "-";
        }

        // Add weapon property
        if (this.weapon.property != "-") {
            //console.log("weapon property", this.weapon.property)
            if ((this.weapon.property == "Shatter Rock" && this.fuse.replaceProperties == true) &&
                (this.fuse.property1 != "Shatter Rock" && this.fuse.property2 != "Shatter Rock" && this.fuse.property3 != "Shatter Rock")) {
                // Don't add Shatter property if the fuse replaces properties and doesn't have Shatter
            } else {
                this.properties.push(this.weapon.property);
            }
        }

        // Don't add Bone from fuse if weapon is bow
        if (this.weapon.type == 3) {
            if (this.fuse.property1 == "Bone") {
                this.fuse.property1 = "-";
            }
            if (this.fuse.property2 == "Bone") {
                this.fuse.property2 = "-";
            }
            if (this.fuse.property3 == "Bone") {
                this.fuse.property3 = "-";
            }
        }

        // Don't add Melee Projectile from fuse is weapon is bow or shield
        if (this.weapon.type >= 3) {
            if (this.fuse.property1 == "Melee Projectile") {
                this.fuse.property1 = "-";
            }
            if (this.fuse.property2 == "Melee Projectile") {
                this.fuse.property2 = "-";
            }
            if (this.fuse.property3 == "Melee Projectile") {
                this.fuse.property3 = "-";
            }
        }

        // Add fuse properties
        if (this.fuse.property1 != "-" && this.fuse.property1 != this.weapon.property) { this.properties.push(this.fuse.property1); }
        if (this.fuse.property2 != "-" && this.fuse.property2 != this.weapon.property) { this.properties.push(this.fuse.property2); }
        if (this.fuse.property3 != "-" && this.fuse.property3 != this.weapon.property) { this.properties.push(this.fuse.property3); }

        if (this.properties.length == 0) {
            this.properties.push("None");
        }
    }


    calculateAttackPowerUI() {
        let baseAttack = this.getBaseAttack()
        let fuseAttackUI = this.getFuseBaseAttack()
        let attackUpMod = this.input.attackUpMod
        let gerudoBonus = this.getGerudoBonus()
        let zonaiBonusUI = this.getZonaiBonusUI()
        let lowHealth = this.getLowHealth()
        let lowDurability = this.getLowDurability()
        let wetPlayer = this.getWetPlayer()
        let mineruBonus = this.getMineruBonus()

        if (this.weapon.type == 5) {
            return baseAttack
        }
        if (this.input.trueDamage) {
            let zonaiBonus = this.getZonaiBonus()
            return Math.floor(baseAttack + mineruBonus +
                this.fuseUIAdjust((fuseAttackUI * gerudoBonus) +
                    attackUpMod + zonaiBonus) *
                lowHealth * lowDurability * wetPlayer)
        }
        let baseAttackUI = (this.weaponUIAdjust(baseAttack) + mineruBonus +
            (fuseAttackUI * gerudoBonus) + attackUpMod + zonaiBonusUI) *
            lowHealth * lowDurability * wetPlayer

        return Math.floor(baseAttackUI)
    }
    weaponUIAdjust(input: number) {
        switch (this.weapon.type) {
            case 1: return Math.floor(input * 0.95) // 2H
            case 2: return Math.floor(input * 1.326856) // Spear
            default: return Math.floor(input)
        }
    }

    getZonaiBonusUI() {
        let zonaiFuseProperty = this.scanProperties("Zonai Fuse")
        if (zonaiFuseProperty == false) {
            return 0
        }
        switch (this.weapon.property) {
            case "Zonai Lv1": return 3
            case "Zonai Lv2": return 5
            case "zonai lv3": return 10
            default: return 0
        }
    }
    calculate() {
        let attackType = this.input.attackType
        let weaponType = this.weapon.type
        let weaponProperty = this.weapon.property
        let usingFire = this.getUsingFire()
        let usingIce = this.getUsingIce()
        let usingShock = this.getUsingShock()
        //let usingBomb = this.getUsingBomb()
        let usingWater = this.getUsingWater()
        //let usingBeam = this.getUsingBeam()
        let attackUp = this.getAttackUp()
        let fuseBaseAttack = this.getFuseBaseAttack()
        let zonaiBonus = this.getZonaiBonus()
        let sneakstrike = this.getSneakstrike()
        let criticalHit = this.getCriticalHit()
        let horseback = this.getHorseback()
        let oneDurability = this.getOneDurability()
        let bone = this.getBone()
        let flurryRush = this.getFlurryRush()
        let shatter = this.getShatter()
        let _throw = this.getThrow()
        let headshot = this.getHeadshot()
        let windRazor = this.scanProperties("Wind Razor")
        let frozen = this.getFrozen()
        let treeCutter = this.getTreeCutter()
        let arrowEnemyMult = this.getArrowEnemyMult()
        let elementalDamage = this.getElementalDamage()
        let elementalMult = this.getElementalMult()
        let continuousFire = this.getContinuousFire()
        let demonDragon = this.getDemonDragon()
        let isBomb = this.scanProperties("Bomb")
        let isChuchu = this.enemy.name.includes("Chuchu")
        let isPebblit = this.enemy.name.includes("Pebblit")
        let isGibdo = this.enemy.name.includes("Gibdo")
        let isKeese = this.enemy.name.includes("Keese")
        let projectileDamage
        let fenceDamage = this.getFenceDamage()

        // Added
        let baseAttack = this.getBaseAttack()
        //let fuseAttackUI = this.getFuseBaseAttack()
        let attackUpMod = this.input.attackUpMod
        let gerudoBonus = this.getGerudoBonus()
        //let zonaiBonusUI = this.getZonaiBonusUI()
        let lowHealth = this.getLowHealth()
        let lowDurability = this.getLowDurability()
        let wetPlayer = this.getWetPlayer()
        let mineruBonus = this.getMineruBonus()

        //console.log("calculate 1", this.enemy.hp, this.enemy.name)

        //let attackPower = (baseAttack + mineruBonus + (fuseBaseAttack * gerudoBonus) + attackUpMod + zonaiBonus)

        // Aerocuda/Keese Shield Bash Instalkill
        if (attackType == "Perfect Parry" && (this.enemy.name == "Aerocuda" || isKeese)) {
            //console.log("perfect parry on thing")
            return this.enemy.hp
        }
        //console.log("calculate 2")
        // No damage if shield bash from weapon with shield fuse
        if (weaponType < 3 && (attackType == "Shield Bash" || attackType == "Perfect Parry")) {
            return 0
        }
        //console.log("calculate 2b", this.fuse.name, isChuchu)
        // Return enemy's HP if ancient blade or wind razor chuchu
        if ((this.fuse.name == "Ancient Blade" && this.enemy.ancientBladeDefeat == true) || (isChuchu && windRazor)) {
            return this.enemy.hp
        }
        //console.log("calculate 3")
        // Pebblit Damage
        if (isPebblit) {
            //console.log("pebblit")
            if (attackType == "Master Sword Beam" || attackType == "Sidon's Water") {
                //console.log("    Master sword or Sidon Water")
                return 0
            }
            //console.log("   Shatter", shatter)
            if (shatter > 1 && attackType == "Throw") {
                //console.log("   Shatter Thrown", shatter)
                if (this.weapon.property == "Boomerang" && weaponType == 0) {
                    //console.log("   Boomerang")
                    return this.enemy.hp / 2
                }
                return this.enemy.hp
            }
            if (shatter == 1.5 || isBomb || attackType == "Riju's Lightning") {
                //console.log("   Riju's Lightning or Bomb shatter ", shatter)
                return this.enemy.hp
            }
            if (shatter == 1.25) {
                return this.enemy.hp / 2
            }
            return 0
        }
        //console.log("calculate 4")
        // No damage if armored and no shatter
        if (this.enemy.name.includes("(Armored)") && shatter == 1 && !this.input.weakened) {
            return 0
        }

        // Gibdo unweakened
        if (isGibdo) {
            if (!usingFire && !usingIce && !usingShock && !usingWater && this.fuse.property1 != "Dazzle" && !this.input.weakened) {
                return 1
            }
        }
        //console.log("help", this.enemy.name, this.weapon.name, attackType)
        // Fire Chuchu Water Instakill
        if (this.enemy.name.includes("Fire Chuchu")) {
            if (this.scanProperties("Water") || attackType == "Sidon's Water") {
                return this.enemy.hp
            }
        }

        // MASTER SWORD BEAM
        if (attackType == "Master Sword Beam") {
            let masterSwordBeamUp = 1.0

            if (this.input.buff1 == "Master Sword Beam Up" ||
                this.input.buff2 == "Master Sword Beam Up") {
                masterSwordBeamUp = 1.5
            }
            return Math.floor(this.weapon.projectileAttack * masterSwordBeamUp * attackUp * demonDragon)
        }
        //console.log("help", this.enemy.name, this.weapon.name, attackType)
        // Sidon's Water
        if (attackType == "Sidon's Water") {
            let waterMult = 1
            if (this.enemy.element == "Fire") {
                waterMult = 1.5
            }
            //console.log("     sidon's water")
            return Math.floor((baseAttack + this.fuseUIAdjust((fuseBaseAttack * gerudoBonus) +
                attackUpMod + zonaiBonus)) *
                attackUp * frozen * waterMult)
        }

        // Earthwake Technique / Throwing Materials
        if (this.weapon.name == "None (Earthwake Technique)") {
            //console.log("    earthwake", attackType)
            if (attackType == "Throw") {
                if (this.enemy.name == "Evermean") {
                    return 0
                }
                //console.log("    earthwake fuseBaseAttack", fuseBaseAttack)
                let damageOutput = this.fuseUIAdjust(fuseBaseAttack)
                if (elementalMult != 0) {
                    damageOutput += elementalDamage
                    damageOutput *= elementalMult
                }
                damageOutput += continuousFire
                return damageOutput
            }
            return baseAttack * attackUp
        }

        // MAIN DAMAGE FORMULA
        //console.log('main damage', baseAttack, mineruBonus, this.fuseUIAdjust((fuseBaseAttack * gerudoBonus) + attackUpMod + zonaiBonus))

        let damageOutput = baseAttack + mineruBonus +
            this.fuseUIAdjust((fuseBaseAttack * gerudoBonus) +
                attackUpMod + zonaiBonus)
        //console.log('damage mult', damageOutput, lowHealth, wetPlayer, sneakstrike, lowDurability)
        damageOutput *= lowHealth * wetPlayer * sneakstrike * lowDurability * bone * flurryRush * shatter
        //console.log('damage', damageOutput)
        damageOutput *= attackUp * headshot * _throw * oneDurability * frozen * treeCutter
        //console.log('damage', damageOutput)
        damageOutput *= arrowEnemyMult * criticalHit * horseback * demonDragon
        //console.log('damage', damageOutput)
        this.damageBeforeElement = damageOutput
        if (elementalMult != 0) {
            damageOutput += elementalDamage
            damageOutput *= elementalMult
        }
        //console.log(damageOutput)
        damageOutput += continuousFire
        damageOutput += fenceDamage
        damageOutput = Math.min(2147483647, Math.floor(damageOutput))

        projectileDamage = this.createDamageNumList(damageOutput)
        //console.log('damage, projectile', damageOutput, projectileDamage)
        if (this.scanProperties("Melee Projectile")) {
            return this.damageBeforeElement + projectileDamage
        }
        //console.log(damageOutput, projectileDamage, this.properties)
        return damageOutput + projectileDamage
    }

    getBaseAttack(): number {
        // DEMON KING'S BOW
        if (this.weapon.name == "Demon King's Bow") {
            //console.log("demon king's bow")
            return Math.max(1, Math.min(60, Math.floor(this.input.hp) * 2))
        }

        return this.weapon.baseAttack
    }
    getFuseBaseAttack(): number {
        let fuseBaseAttack = this.fuse.baseAttack

        switch (this.weapon.type) {
            case 3: return fuseBaseAttack * this.fuse.arrowMultiplier
            case 4: if (this.fuse.addsShieldAttack == true) {
                return fuseBaseAttack
            }
                return 0
            default:
                return fuseBaseAttack
        }
    }
    fuseUIAdjust(input: number): number {
        switch (this.weapon.type) {
            case 1: return Math.floor(input * 1.052632)
            case 2: return Math.ceil(input * 0.7536613)
            default: return Math.floor(input)
        }
    }
    scanProperties(search: string) {
        return this.properties.includes(search)
    }

    getZonaiBonus(): number {
        let selectedWeapon = this.weapon.name
        let zonaiFuseProperty = this.scanProperties("Zonai Fuse")

        if (zonaiFuseProperty == false) {
            return 0
        }

        switch (this.weapon.property) {
            case "Zonai Lv1": return 3
            case "Zonai Lv2":
                return (selectedWeapon == "Strong Zonaite Spear") ? 4 : 5
            case "Zonai Lv3":
                return (selectedWeapon == "Mighty Zonaite Spear") ? 8 : 10
            default:
                return 0
        }
    }
    getGerudoBonus(): number {
        let gerudoProperty = this.scanProperties("Gerudo")

        if (gerudoProperty == true) {
            return 2
        }
        return 1
    }
    getLowHealth(): number {
        let lowHealthProperty = this.scanProperties("Low Health x2")

        if (lowHealthProperty == true && this.input.hp <= 1) {
            return 2
        }
        return 1
    }
    getWetPlayer(): number {
        let wetProperty = this.scanProperties("Wet x2")
        let waterFuse = this.scanProperties("Water")

        if (wetProperty == true && (this.input.wet == true || waterFuse)) {
            return 2
        }
        return 1
    }

    getSneakstrike(): number {
        if (this.input.attackType == "Sneakstrike") {
            let sneakstrikeProperty = this.scanProperties("Sneakstrike x2")
            //console.log(this.weapon.name, sneakstrikeProperty, this.properties)
            if (sneakstrikeProperty == true) {
                return 16
            }
            return 8
        }
        return 1
    }
    getLowDurability(): number {
        let lowDurabilityProperty = this.scanProperties("Low Durability x2")
        //console.log('low durability', lowDurabilityProperty)
        if (lowDurabilityProperty == true && this.input.durability <= 3) {
            return 2
        }
        return 1
    }
    getOneDurability(): number {
        if (this.weapon.name == "Mineru's Construct") {
            return 1
        }

        if (this.weapon.type != 3 && this.weapon.type != 5 &&
            this.input.durability == 1 && this.input.attackType != "Perfect Parry" && this.getCriticalHit() == 1 && this.getHorseback() == 1) {
            return 2
        }
        return 1
    }
    getBone(): number {
        let boneProperty = this.scanProperties("Bone")

        if (this.weapon.name == "Mineru's Construct") {
            return 1
        }

        if (boneProperty == true && (this.input.buff1 == "Bone Weap. Prof." || this.input.buff2 == "Bone Weap. Prof.")) {
            return 1.8
        }
        return 1
    }
    getFlurryRush(): number {
        let flurryRushProperty = this.scanProperties("Flurry Rush x2")

        if (flurryRushProperty == true && this.input.attackType == "Flurry Rush") {
            return 2
        }
        return 1
    }

    getShatter(): number {
        let shatterProperty = this.scanProperties("Shatter Rock")
        //console.log('   shatterProperty', shatterProperty, this.properties)
        // If armored enemy is unarmored, no shatter
        if (this.input.weakened) {
            return 1
        }

        if (this.enemy.isRock == true) {
            if (this.getUsingBomb()) {
                return 1.5
            }

            if (shatterProperty == true) {
                switch (this.weapon.type) {
                    case 0: return 1.25 // 1H
                    case 1: return 1.5 // 2H
                    case 2: return 1.25 // Spears
                    case 3: return 1.5 // Bows
                    case 4: return 1.5 // Shields
                    default: return 1
                }
            }
        }
        return 1
    }
    getAttackUp(): number {
        let buff1 = this.input.buff1
        let buff2 = this.input.buff2

        if (this.weapon.name == "Mineru's Construct") {
            return 1
        }

        if (buff1 == "Attack Up (Lv3)" || buff2 == "Attack Up (Lv3)") {
            return 1.5
        }
        else if (buff1 == "Attack Up (Lv2)" || buff2 == "Attack Up (Lv2)") {
            return 1.3
        }
        else if (buff1 == "Attack Up (Lv1)" || buff2 == "Attack Up (Lv1)") {
            return 1.2
        }

        return 1
    }
    getHeadshot(): number {
        if (this.input.headshot == true) {
            return this.enemy.headshotMultiplier
        }
        return 1
    }
    getCriticalHit(): number {
        if (this.input.criticalHitMod == true) {
            if (this.input.attackType == "Combo Finisher" || this.input.attackType == "Flurry Rush") {
                return 2
            }
        }
        return 1
    }
    getHorseback(): number {
        if (this.input.attackType == "Horseback") {
            return 2
        }
        return 1
    }
    getThrow(): number {
        let projectileProperty = this.scanProperties("Melee Projectile")
        let boomerang = (this.weapon.property == "Boomerang")

        if (this.input.attackType != "Throw" || projectileProperty) {
            return 1
        }

        if (!boomerang && this.getOneDurability() == 2) {
            return this.getAttackUp()
        }
        else if (boomerang) {
            return 1.5 * this.getAttackUp()
        }

        return 2 * this.getAttackUp()
    }
    getFrozen(): number {
        let selectedEnemy = this.enemy.name

        if (selectedEnemy == "Gibdo" || selectedEnemy == "Moth Gibdo") {
            return 1
        }
        if (this.input.frozen == true) {
            return 3
        }
        return 1
    }
    getTreeCutter(): number {
        let cutProperty = this.scanProperties("Cut")
        let treeCutterProperty = this.scanProperties("Tree Cutter")

        if (this.enemy.name == "Evermean") {
            if (!cutProperty && !treeCutterProperty) {
                return 0
            }
            if (this.input.attackType == "Sidon's Water") {
                return 0
            }
            if (treeCutterProperty) {
                return 3
            }
        }
        return 1
    }
    getArrowEnemyMult(): number {
        if (this.weapon.type == 3) {
            return this.enemy.arrowMultiplier
        }
        return 1
    }
    getUsingFire(): boolean {
        if (this.fuse.name == "Time Bomb") {
            return false
        }
        return this.scanProperties("Fire") ||
            this.scanProperties("Fire Burst") ||
            this.getHotWeatherAttack() ||
            this.scanProperties("Bomb")
    }
    getUsingIce(): boolean {
        return this.scanProperties("Ice") ||
            this.scanProperties("Ice Burst") ||
            this.getColdWeatherAttack()
    }
    getUsingShock(): boolean {
        return this.scanProperties("Shock") ||
            this.scanProperties("Shock Burst") ||
            this.getStormyWeatherAttack()
    }
    getUsingBomb(): boolean {
        return this.scanProperties("Bomb")
    }
    getUsingWater(): boolean {
        return this.scanProperties("Water")
    }
    getUsingBeam(): boolean {
        return this.fuse.name == "Beam Emitter"
    }
    getElementalDamage(): number {
        let elementPower = 0
        let fireDamage = this.enemy.fireDamage
        let iceDamage = this.enemy.iceDamage
        let shockDamage = this.enemy.shockDamage
        let hotWeatherPower = 0
        let coldWeatherPower = 0
        let stormyWeatherPower = 0
        if (this.getHotWeatherAttack()) { hotWeatherPower = 5 }
        if (this.getColdWeatherAttack()) { coldWeatherPower = 5 }
        if (this.getStormyWeatherAttack()) { stormyWeatherPower = 5 }
        let usingJelly = this.fuse.name.includes("Chuchu Jelly")

        if (this.weapon.type == 3 || this.input.attackType == "Throw" || usingJelly) {
            elementPower = this.fuse?.elementPower ?? 0.0
        }

        if (this.getUsingBomb()) {
            elementPower = this.fuse?.elementPower ?? 0.0
            if (this.fuse.name == "Cannon") {
                elementPower = 12
            }
            elementPower *= this.enemy.bombMultiplier
        }

        elementPower *= this.getAttackUp()

        if (this.getUsingIce()) {
            if (this.input.frozen == true) {
                return 0
            }
            return elementPower + iceDamage + coldWeatherPower
        }
        if (this.getUsingFire()) {
            elementPower += fireDamage + hotWeatherPower
        }
        if (this.getUsingShock()) {
            elementPower += shockDamage + stormyWeatherPower
        }
        if (this.getUsingWater()) {
            elementPower += this.enemy.waterDamage
        }
        if (this.getUsingBeam()) {
            elementPower += 12 * this.enemy.beamMultiplier
        }
        return elementPower
    }
    getHotWeatherAttack(): boolean {
        let buff1 = this.input.buff1
        let buff2 = this.input.buff2
        return (this.input.attackType == "Combo Finisher" && (buff1 == "Hot Weather Attack" || buff2 == "Hot Weather Attack"))
    }
    getColdWeatherAttack(): boolean {
        let buff1 = this.input.buff1
        let buff2 = this.input.buff2
        return (this.input.attackType == "Combo Finisher" && (buff1 == "Cold Weather Attack" || buff2 == "Cold Weather Attack"))
    }
    getStormyWeatherAttack(): boolean {
        let buff1 = this.input.buff1
        let buff2 = this.input.buff2
        return (this.input.attackType == "Combo Finisher" && (buff1 == "Stormy Weather Attack" || buff2 == "Stormy Weather Attack"))
    }
    getElementalMult(): number {
        return 1 // This isn't a real thing??
        /*
        let enemyElement = this.enemy.element
    
        switch (enemyElement) {
            case "Fire":
                if (this.getUsingIce()) { return 2 }
                if (this.getUsingWater()) { return 1.5 }
                if (this.getUsingFire()) { return 0 }
                return 1
            case "Ice":
                if (this.getUsingFire()) { return 2 }
                if (this.getUsingIce()) { return 0 }
                return 1
            case "Shock":
                if (this.getUsingShock()) { return 0 }
                return 1
            default:
                return 1
         }
        */
    }
    getContinuousFire(): number {
        if (this.getUsingFire() && this.enemy.name == "Evermean") {
            return this.enemy.fireDamageContinuous
        }

        return 0 // SCRAP THIS FOR NOW
        // if (this.getUsingFire() && this.enemy.element != "Fire") {
        //     return this.enemy.fireDamageContinuous
        // }
        // return 0
    }
    getDemonDragon(): number {
        let fuseBaseName = this.weapon.fuseBaseName

        if (this.enemy.name == "Demon Dragon" && (fuseBaseName == "Master Sword" || fuseBaseName == "Decayed Master Sword")) {
            if (this.input.attackType == "Master Sword Beam") {
                return 30
            }
            return 5
        }
        return 1
    }
    getFenceDamage(): number {
        if (this.input.fence == true) {
            return 2500
        }
        return 0
    }
    getMineruBonus(): number {
        let mineruBonus = 0

        if (this.input.zonaite == true) {
            mineruBonus += 13
        }
        if (this.input.sageWill == true) {
            mineruBonus += 13
        }
        return mineruBonus
    }
    createDamageNumList(damageOutput: number): number {
        let windRazorAttack = 10
        let windRazorElement = this.scanProperties("Fire") || this.scanProperties("Ice") || this.scanProperties("Shock")
        let multishotCount = 0
        let extraProjectileCount = 0
        let meleeProjectile = this.scanProperties("Melee Projectile")
        let projectileAttack = 0
        let firstProjectileAttack = 0
        let rijuDamage = 10 + this.enemy.rijuDamage
        let enemyElement = this.enemy.element
        let waterMult = 1
        let fireMult = 1

        // Added
        let elementalMult = this.getElementalMult()

        rijuDamage += this.enemy.fireDamage + this.enemy.shockDamage

        if (enemyElement == "Fire" && this.getUsingWater()) {
            waterMult = 1.5
        }
        if (enemyElement == "Ice" && this.getUsingFire()) {
            fireMult = 2
        }

        // WIND RAZOR
        if (this.scanProperties("Wind Razor")) {
            this.damageNumList.push(damageOutput)

            windRazorAttack += this.getFuseBaseAttack()
            windRazorAttack *= this.getAttackUp()
            if (elementalMult != 0 && windRazorElement) {
                windRazorAttack += this.getElementalDamage()
                windRazorAttack *= elementalMult
            }
            windRazorAttack *= waterMult * fireMult
            windRazorAttack += this.getContinuousFire()
            this.damageNumList.push(Math.floor(windRazorAttack))

            //data.damageNumList = damageNumList
            return Math.floor(windRazorAttack)
        }

        // IF USING ICE
        if ((this.getUsingIce() && this.enemy.canFreeze == true) || this.input.frozen == true) {
            return 0
        }

        // MULTISHOT
        if (this.weapon.property == "Multishot x2") {
            multishotCount = 2
        }
        else if (this.weapon.property == "Multishot x3" || this.weapon.property == "Multishot x3-5") {
            multishotCount = 3
        }
        if (this.input.multishot == true) {
            multishotCount = 5
        }
        if (multishotCount > 0) {
            this.damageNumList.push(damageOutput)

            for (let i = 0; i < multishotCount - 1; i++) {
                if (true || this.getUsingBomb() || this.getUsingWater() || this.getUsingBeam()) { // TEMPORARILY MAKE ALWAYS TRUE
                    this.damageNumList.push(damageOutput - this.getContinuousFire())
                }
                else {
                    this.damageNumList.push(this.damageBeforeElement)
                }
            }

            if (this.input.attackType == "Riju's Lightning") {
                this.damageNumList.push(rijuDamage)
                //data.damageNumList = damageNumList
                return (damageOutput - this.getContinuousFire()) * (multishotCount - 1) + rijuDamage
            }

            //data.damageNumList = damageNumList

            if (true || this.getUsingBomb() || this.getUsingWater() || this.getUsingBeam()) { // TEMPORARILY MAKE ALWAYS TRUE
                return (damageOutput - this.getContinuousFire()) * (multishotCount - 1)
            }

            return this.damageBeforeElement * (multishotCount - 1)
        }

        // MELEE PROJECTILE
        if (meleeProjectile) {
            projectileAttack = this.fuse.projectileAttack
            if (this.weapon.property == "Rod") {
                projectileAttack *= 2
                if (this.fuse.property1 != "Ice Burst") {
                    extraProjectileCount = 2
                }
            }
            projectileAttack *= waterMult * fireMult

            this.damageNumList.push(this.damageBeforeElement)

            if (elementalMult != 0) {
                firstProjectileAttack = projectileAttack + this.getElementalDamage()
                firstProjectileAttack *= elementalMult
            }
            firstProjectileAttack += this.getContinuousFire()
            firstProjectileAttack = Math.floor(firstProjectileAttack)
            this.damageNumList.push(firstProjectileAttack)

            for (let i = 0; i < extraProjectileCount; i++) {
                if (this.getUsingWater()) {
                    this.damageNumList.push(firstProjectileAttack)
                } else {
                    this.damageNumList.push(projectileAttack)
                }
            }

            //data.damageNumList = damageNumList

            if (this.getUsingWater()) {
                return firstProjectileAttack + firstProjectileAttack * extraProjectileCount
            }
            return firstProjectileAttack + projectileAttack * extraProjectileCount
        }

        // RIJU'S LIGHTNING
        if (this.input.attackType == "Riju's Lightning") {
            this.damageNumList.push(damageOutput)
            this.damageNumList.push(rijuDamage)
            // data.damageNumList = damageNumList
            return rijuDamage
        }
        return 0
    }
    getAttackUpMod(): number {
        return this.input.attackUpMod
    }

}


/*
let w = Weapon.from_name("Royal Broadsword")
console.log(w)
let f = Fuse.from_name("Ice Keese Eyeball")
console.log(f)
let e = Enemy.from_name("Chuchu (Small)")
console.log(e)

let i = new Input()

let c = new Calculator(w, f, e, i)
console.log(c)
c.calculate()
*/
