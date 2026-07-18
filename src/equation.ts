interface Equation {
    str(names: boolean, html: boolean, level: number): string;
    valueOf(): number;
}


export class Value implements Equation {
    name: String
    value: number | Expr
    constructor(name: string, value: number) {
        this.name = name
        this.value = value
    }
    str(names: boolean = true, html: boolean = true, level: number) {
        let value = (this.value instanceof Expr) ? this.value.str(names, level + 1) : this.value
        let t = `${this.name}`
        let s = ""
        if (names) {
            s = `${this.name}(${value})`
        } else {
            s = `${value}`
        }
        if (html) {
            s = `<span class="${t}">${s}</span>`
        }
        return s
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
    str(names: boolean = true, html: boolean = true, level: number) {
        return this.values.map(v => v.str(names, html, level + 1)).join(' * ')
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
    add_term(value: Equation): Expr {
        if (value.valueOf() == 0) { return this }
        this.terms.push(value)
        return this
    }
    add(name: string, value: number): Expr {
        let t = new Terms(new Value(name, value))
        if (value == 0) { return this }
        return this.add_term(t)
    }
    clone(): Expr {
        let t = new Expr("empty", 0)
        t.terms = [...this.terms]
        return t
    }
    mul_term(value: Equation): Expr {
        if (value.valueOf() == 1) { return this }
        let t = new Terms(this.clone())
        t.mul(value)
        this.terms = [t]
        return this
    }
    mul(name: string, value: number): Expr {
        if (value == 1) { return this }
        let t = new Value(name, value)
        return this.mul_term(t)
    }
    html(names: boolean = true, level: number = 0): string {
        return this.str(names, true, level)
    }
    raw(names: boolean = true, level: number = 0): string {
        return this.str(names, false, level)
    }
    str(names: boolean = true, html: boolean = true, level: number = 0): string {
        let s = this.terms.map(t => t.str(names, html, level + 1)).join(" + ")
        if (this.terms.length > 1 && level > 0 && !this._floor && !this._ceil) {
            s = `(${s})`
        } else {
            s = func_wrap(s, this._floor, "floor", html)
            s = func_wrap(s, this._ceil, "ceil", html)
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
    floor(): Expr {
        let t = this.wrap()
        t._floor = true
        return this
    }
    ceil(): Expr {
        let t = this.wrap()
        t._ceil = true
        return this
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
function func_wrap(v: string, flag: boolean, name: string, html: boolean) {
    if (!flag) { return v }
    if (html) {
        name = `<span class="funcname">${name}</span>`
    }
    v = `${name}(${v})`
    if (html) {
        v = `<span class="func">${v}</span>`
    }
    return v
}


function _testing() {
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
