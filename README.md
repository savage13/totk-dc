TotK Damage Calculator
======================

Tears of the Kingdom Damage Calculator (website and javascript module)

See https://restite.org/totk-damage for the Damage Calculator

Simple Example
--------------
```js
import { damage } from './assest/totkdc.js'

let result = damage("Royal Guard's Claymore*",
    "Silver Lynel Saber Horn", "Lynel", { durability: 1 })

```

Example
---------------
```js
import { Weapon, Fuse, Enemy, Input, Calculator } from './assets/totkdc.js'

// Find Weapon, Fuse and Enemy
let weapon = Weapon.from_name("Royal Guard's Claymore")
let fuse = Fuse.from_name("Silver Lynel Saber Horn")
let enemy = Enemy.from_name("Lynel")
// Create input options (durability, headshot, frozen ...)
let input = new Input()
input.durability = 1

// Create calculator and calculate
let calc = new Calculator(weapon, fuse, enemy, input)
let result = calc.calc()
console.log(result)
{
   success: true, message: 'Success',
   attackPowerUI: 188, damageOutput: 396,
   properties: [ 'Cut', 'Low Durability x2' ], fusedName: 'Silver Lynel Blade',
   formula: 'Formula: BaseAttack(42) + FuseUIAdjust(FuseBaseAttack(55)) * LowDurability(2) * OneDurability(2)',
   damageNumList: [], blueDamageNum: true, defeated: false, id: [ 19471499, 637665280 ]
}
```

API
---

```
function damage(weapon, fuse, enemy, options): result | null
     - weapon  - Weapon name (string, [see weapon.md](weapon.md])
     - fuse    - Fuse name (string, [see fuse.md](fuse.md])
     - enemy   - Enemy name (string, [see eneme.md](enemy.md])
     - options -
        - attackUpMod - Weapon Attack Up Modifier (number)
        - attackType - (string)
            - Standard Attack
            - Shoot Arrow
            - Shield Bash
            - Perfect Parry
            - Earthwake Technique
            - Combo Finisher
            - Throw
            - Sneakstrike
            - Flurry Rush
            - Sidon's Water
            - Riju's Lightning
            - Master Sword Beam
            - Horseback
        - criticalHitMod - Allows for Flurry Rush and Combo Finisher attackType (boolean)
        - multishot - Multishot bow, sets to x5 (boolean)
        - zonaite - Adds Mineru Damage with Mineru's Construct weapon (boolean)
        - sageWill - Adds Mineru Damage with Mineru's Construct weapon (boolean)
        - durability - Weapon Durability; fun things happen below 3 and at 1. (number)
        - freezeDurability - only useful for UI (boolean)
        - wet - If player is wet (boolean)
        - heatshot - If it was a headshot (boolean)
        - frozen - If enemy is frozen (boolean)
        - weakened - If Gibdo or Electric Chuchu is weakened (boolean)
        - fence - If Seized Construct bounding electric fence was hit (boolean)
        - hp - Player HP, fun things happen at low numbers (boolean)
        - buff1 - Player Buff (boolean)
            - Attack Up (Lv1)
            - Attack Up (Lv2)
            - Attack Up (Lv3)
            - Bone Weap. Prof.
            - Hot Weather Attack
            - Cold Weather Attack
            - Stormy Weather Attack
            - Master Sword Beam Up
        - buff2 - Player Buff (boolean)
            - Attack Up (Lv1)
            - Attack Up (Lv2)
            - Attack Up (Lv3)
            - Bone Weap. Prof.
            - Hot Weather Attack
            - Cold Weather Attack
            - Stormy Weather Attack
            - Master Sword Beam Up
        - freeMode - only useful for UI (boolean)
        - trueDamage - Show true damage(boolean)
        - sortFuseByAttack - only useful for UI (boolean)

```


Derivative Work
---------------
Translation of the original [damage calculator Phil](https://github.com/phil-macrocheira/Philidea)

- Converted from C# to Javascript
- Removed the backend
- Added tests

Build
-----
```sh
% npm install
% npm run dev
```

This builds an Javascript module (ESM) with json data stored interally within.  That data resides in `data/` and `src/` in different formats

Test
----
```sh
% node ./tests/tests.js
% node ./tests/id.js
```

License
-------
MIT
