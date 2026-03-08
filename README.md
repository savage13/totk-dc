TotK Damage Calculator
======================

Tears of the Kingdom Damage Calculator (website and javascript module)

See https://restite.org/totk-damage for the Damage Calculator

Example
-------
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
