interface Equation {
    str(names: boolean, level: number): string;
    valueOf(): number;
}

let _index = 0

export class Value implements Equation {
    name: String
    value: number | Expr
    constructor(name: string, value: number) {
        this.name = name
        this.value = value
    }
    str(names: boolean = true, level: number) {
        let value = (this.value instanceof Expr) ? this.value.str(names, level + 1) : this.value
        let t = `${this.name}`
        _index += 1
        if (names) {
            return `<span class="${t}">${this.name}(${value})</span>`
        }
        return `<span class="${t}">${value}</span>`
    }
    valueOf(): number {
        if (this.value instanceof Expr) {
            return this.value.valueOf()
        }
        return this.value
    }
}

export class Terms implements Equation {
    values: Equation[]
    constructor(value: Equation) {
        this.values = [value]
    }
    mul(value: Equation) {
        this.values.push(value)
    }
    str(names: boolean = true, level: number) {
        return this.values.map(v => v.str(names, level + 1)).join(' * ')
    }
    valueOf() {
        let out = 1
        for (const v of this.values) {
            out *= v.valueOf()
        }
        return out
    }
}

export class Expr implements Equation {
    terms: Equation[]
    _floor: boolean
    _ceil: boolean
    constructor(name: string, value: number) {
        let v = new Terms(new Value(name, value))
        this.terms = [v]
        this._floor = false
        this._ceil = false
    }
    add_term(value: Equation) {
        if (value.valueOf() == 0) { return }
        this.terms.push(value)
    }
    add(name: string, value: number) {
        let t = new Terms(new Value(name, value))
        if (value == 0) { return }
        this.add_term(t)
    }
    clone() {
        let t = new Expr("empty", 0)
        t.terms = [...this.terms]
        return t
    }
    mul_term(value: Equation) {
        if (value.valueOf() == 1) { return }
        let t = new Terms(this.clone())
        t.mul(value)
        this.terms = [t]
    }
    mul(name: string, value: number) {
        if (value == 1) { return }
        let t = new Value(name, value)
        this.mul_term(t)
    }
    str(names: boolean = true, level: number = 0): string {
        if (level == 0) { _index = 0 }
        let FL = "floor("
        let FR = ")"
        let CL = "ceil("
        let CR = ")"
        let s = this.terms.map(t => t.str(names, level + 1)).join(" + ")
        if (this.terms.length > 1 && level > 0 && !this._floor && !this._ceil) {
            s = `(${s})`
        } else {
            if (this._floor) { s = `<span class="func">${FL}${s}${FR}</span>` }
            if (this._ceil) { s = `<span class="func">${CL}${s}${CR}</span>` }
        }
        return s
    }
    wrap() {
        const t = this.clone()
        t._floor = false
        t._ceil = false
        this.terms = [t]
        return t
    }
    floor() {
        let t = this.wrap()
        t._floor = true
    }
    ceil() {
        let t = this.wrap()
        t._ceil = true
    }
    valueOf() {
        let out = 0
        for (let t of this.terms) {
            out += t.valueOf()
        }
        if (this._floor) {
            out = Math.floor(out)
        }
        if (this._ceil) {
            out = Math.ceil(out)
        }
        return out
    }
}

function testing() {
    let e = new Expr("BaseAttack", 5)
    //let fba = new Expr("FuseBaseAttack", 1)
    //let atk = new Expr("AttackUp", 1.2)
    //let e = new Expr(ba)
    e.add("FuseBAseAttack", 1)
    e.mul("AttackUp", 1.2)
    e.add("Elemental", 17)

    //console.log(e.str())
    //console.log(e.str(false))
    //console.log(e.valueOf())

    let pro = new Expr("Projectile", 15)
    pro.mul("AttackUp", 1.2)
    e.add_term(pro)

    //console.log(e.str())
    //console.log(e.str(false))
    //console.log(e.valueOf())

    let e3 = new Expr("BaseAttack", 28)
    e3.mul("AttackUp", 1.2)
    e3.floor()
    e3.add("Projectile", 33)
    console.log(e3.terms)
    console.log(e3.terms[0])
    console.log(e3.terms[1])
    console.log(e3.str())
    console.log(e3.str(false))
    console.log(e3.valueOf())

}
//testing()
