
import { Calculator } from '../assets/totkdc.js'
import assert from 'node:assert'

let ntests = 0

function deepStrictPartialEqual(result, expected) {
    if(typeof result != typeof expected) {
        return assert.deepStrictEqual(result, expected)
    }
    let keys = Object.keys(expected)
    for(const key of keys) {
        assert.deepStrictEqual(result[key], expected[key])
    }
}


let id = [ 19471499, 637665280 ]

let out = Calculator.from_id(id).calc()
deepStrictPartialEqual(out, { fusedName: 'Silver Lynel Blade', damageOutput: 396 })
deepStrictPartialEqual(out.id, id)

let id2 = id.map(v => v.toString(16)).join("-")
let out2 = Calculator.from_id(id2).calc()
deepStrictPartialEqual(out2, { fusedName: 'Silver Lynel Blade', damageOutput: 396 })
deepStrictPartialEqual(out2.id, id)
