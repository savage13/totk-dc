
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
