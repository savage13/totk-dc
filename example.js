import { Weapon, Fuse, Enemy, Input, Calculator } from './assets/totkdc.js'

// Find Weapon, Fuse and Enemy
let weapon = Weapon.from_name("Royal Guard's Claymore*")
let fuse = Fuse.from_name("Silver Lynel Saber Horn")
let enemy = Enemy.from_name("Lynel")
// Create input options (durability, headshot, frozen ...)
let input = new Input()
input.durability = 1

// Create calculator and calculate
let calc = new Calculator(weapon, fuse, enemy, input)
let result = calc.calc()
console.log(result)
