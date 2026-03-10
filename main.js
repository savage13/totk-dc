import { WeaponData, EnemyData, FuseData, Enemy, Input, Calculator } from './assets/totkdc.js'
var previousWeaponType = 0;
let Properties = [];

const url_opts = {
    weapon: '#weaponDropdown',
    enemy: '#enemyDropdown',
    fuse: '#fuseDropdown',
    attacktype: '#attacktypeDropdown',
    durability: '#numberDurability',
}

$(document).ready(function () {
    $('#weaponDropdown').select2();
    $('#weaponDropdown').on('select2:open', function () {
        window.setTimeout(function () {
            document.querySelector('.select2-search__field').focus();
        }, 0);
    });

    $('#fuseDropdown').select2();
    $('#fuseDropdown').on('select2:open', function () {
        window.setTimeout(function () {
            document.querySelector('.select2-search__field').focus();
        }, 0);
    });

    $('#enemyDropdown').select2();
    $('#enemyDropdown').on('select2:open', function () {
        window.setTimeout(function () {
            document.querySelector('.select2-search__field').focus();
        }, 0);
    });

    const wdd = $('#weaponDropdown')[0]
    for(const weapon of WeaponData.default) {
        let text = weapon.name.replace("*", " ✨")
        wdd.appendChild( new Option(text, weapon.name))
    }
    const edd = $('#enemyDropdown')[0]
    for(const enemy of EnemyData.default) {
        edd.appendChild( new Option(enemy.name))
    }
    const fdd = $('#fuseDropdown')[0]
    for(const fuse of FuseData.default) {
        fdd.appendChild( new Option(fuse.name))
    }

    $('#checkboxFreeMode')[0].addEventListener('change', (ev) => update() )
    $('#checkboxTrueDamage')[0].addEventListener('change', (ev) => update() )
    $('#checkboxSortFuseByAttack')[0].addEventListener('change', (ev) => updateFuseDropdown() )

    $('#weaponDropdown').on('change', (ev) => { update('weapon') } )
    $('#checkboxZonaite')[0].addEventListener('change', (ev) => update() )
    $('#checkboxSagewill')[0].addEventListener('change', (ev) => update() )
    $('#numberAttackUpMod')[0].addEventListener('change', (ev) => update() )
    $('#numberAttackUpMod')[0].addEventListener('input', (ev) => restrictAttackUpMod(ev) )
    $('#checkboxCritical')[0].addEventListener('change', (ev) => update() )
    $('#checkboxMultishot')[0].addEventListener('change', (ev) => update() )

    $('#fuseDropdown').on('change', (ev) => update('fuse') )
    $('#numberDurability')[0].addEventListener('change', (ev) => update() )
    $('#checkboxFreezeDurability')[0].addEventListener('change', (ev) => update() )
    $('#attacktypeDropdown')[0].addEventListener('change', (ev) => update() )
    $('#numberHP')[0].addEventListener('change', (ev) => update() )
    $('#buffDropdown1')[0].addEventListener('change', (ev) => update() )
    $('#buffDropdown2')[0].addEventListener('change', (ev) => update() )
    $('#checkboxWet')[0].addEventListener('change', (ev) => update() )

    $('#enemyDropdown').on('change', (ev) => update('enemy') )
    $('#checkboxWeakened')[0].addEventListener('change', (ev) => update() )
    $('#checkboxFence')[0].addEventListener('change', (ev) => update() )
    $('#checkboxHeadshot')[0].addEventListener('change', (ev) => update() )
    $('#checkboxFrozen')[0].addEventListener('change', (ev) => update('frozen') )
    $('#toggleInfoButton')[0].addEventListener('click', (ev) => toggleInfo() )

    const url = new URL(window.location)
    const args = Object.fromEntries( new URLSearchParams(url.search) )
    //console.log(url)
    let flag = false
    for(const [key, value] of Object.entries(args)) {
        if(key in url_opts) {
            $(url_opts[key]).val(value)
            update(key)
            flag = true
        }
    }
    if(!flag) {
        update('weapon')
        update('fuse')
        update('enemy')
    }
});


function toggleInfo() {
    var content = document.getElementById('contentSection');
    content.style.display = (content.style.display === 'none' || content.style.display === '') ? 'block' : 'none';
}
function findObjByName(objData, selectedName) {
    return objData.find(function (w) {
        return w.name === selectedName;
    });
}
function bestWeapon() {
    $('#weaponDropdown').val("Royal Guard's Claymore✨");
    $('#numberAttackUpMod').val(10);
    $('#fuseDropdown').val("Molduga Jaw");
    $('#numberDurability').val(1);
    $('#checkboxFreezeDurability').prop('checked', true);
    $('#buffDropdown1').val("Attack Up (Lv3)");
    $('#buffDropdown2').val("Bone Weap. Prof.");
    $('#weaponDropdown, #fuseDropdown, #buffDropdown1, #buffDropdown2').trigger('change');

    update();
}
function updateFuseDropdown() {
    var checkboxSortFuseByAttack = document.getElementById('checkboxSortFuseByAttack');
    var selectElement = document.getElementById('fuseDropdown');
    var firstOption = selectElement.querySelector('option');
    var options = Array.from(selectElement.querySelectorAll('option:not(:first-child)'));
    if (checkboxSortFuseByAttack.checked) {
        options.sort(function (a, b) {
            var attackA = parseInt(a.getAttribute('attack'));
            var attackB = parseInt(b.getAttribute('attack'));
            return attackB - attackA;
        });
        options.forEach(function (option) {
            selectElement.removeChild(option);
        });
        options.forEach(function (option) {
            selectElement.appendChild(option);
        });
        selectElement.insertBefore(firstOption, selectElement.firstChild);
    }
    else {
        options.sort(function (a, b) {
            var orderA = parseInt(a.getAttribute('default-order'));
            var orderB = parseInt(b.getAttribute('default-order'));
            return orderA - orderB;
        });
        options.forEach(function (option) {
            selectElement.removeChild(option);
        });
        options.forEach(function (option) {
            selectElement.appendChild(option);
        });
    }
}
function update(dropdownEdited, url_update = true) {
    //console.log('update')
    var weaponData = WeaponData.default //@Html.Raw(System.Text.Json.JsonSerializer.Serialize(Model.Weapons));
    var fuseData = FuseData.default //@Html.Raw(System.Text.Json.JsonSerializer.Serialize(Model.Fuses));
    var enemyData = EnemyData.default // @Html.Raw(System.Text.Json.JsonSerializer.Serialize(Model.Enemies));

    var selectedWeaponName = $('#weaponDropdown').val();
    var selectedFuseName = $('#fuseDropdown').val();
    var selectedEnemyName = $('#enemyDropdown').val();

    
    var selectedWeaponObj = findObjByName(weaponData, selectedWeaponName);
    var selectedFuseObj = findObjByName(fuseData, selectedFuseName);
    var selectedEnemyObj = findObjByName(enemyData, selectedEnemyName);

    //console.log('fuse', selectedFuseName, selectedFuseObj)

    // UPDATE MASTER SWORD ICON FOR FUSED/NOT FUSED
    var MasterSwordIconSet = false;
    if (dropdownEdited == 'weapon' || dropdownEdited == 'fuse') {
        if (selectedWeaponObj.name == "Master Sword") {
            if (selectedFuseObj.name != "None") {
                $('#weaponImage').prop('src', selectedWeaponObj ?
                                       "https://raw.githubusercontent.com/TOTKSheet/TOTKImages/main/Weapons/Weapon_Sword_070_Attached.png" : '');
                MasterSwordIconSet = true;
            } else {
                //console.log("set icon image")
                $('#weaponImage').prop('src', selectedWeaponObj ? selectedWeaponObj.iconURL : '');
                MasterSwordIconSet = true;
            }
        } else if (selectedWeaponObj.name == "Master Sword (Awakened +15)" || selectedWeaponObj.name == "Master Sword (Awakened +30)") {
            if (selectedFuseObj.name != "None") {
                $('#weaponImage').prop('src', selectedWeaponObj ?
                                       "https://raw.githubusercontent.com/TOTKSheet/TOTKImages/main/Weapons/Weapon_Sword_070_TrueForm_Attached.png" : '');
                MasterSwordIconSet = true;
            } else {
                $('#weaponImage').prop('src', selectedWeaponObj ? selectedWeaponObj.iconURL : '');
                MasterSwordIconSet = true;
            }
        }
    }

    // UPDATE ICONS AND ENEMY TEXT
    switch (dropdownEdited) {
    case 'weapon':
        if (!MasterSwordIconSet) {
            $('#weaponImage').prop('src', selectedWeaponObj ? selectedWeaponObj.iconURL : '');
        }
        break;
    case 'fuse':
        $('#fuseImage').prop('src', selectedFuseObj ? selectedFuseObj.iconURL : '');
        break;
    case 'enemy':
        var HP = selectedEnemyObj.hp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $('#HPText').text(HP);
        $('#EnemyNameText').text(selectedEnemyObj.name);
        $('#enemyImage').prop('src', selectedEnemyObj ? selectedEnemyObj.iconURL : '');
        break;
    }

    // Freeze Durability
    var checkbox = document.getElementById('checkboxFreezeDurability');
    if (checkbox.checked) {
        numberDurability.disabled = true;
    } else {
        numberDurability.disabled = false;
    }

    // UPDATE MAX DURABILITY IF WEAPON OR FUSE EDITED
    if ((numberDurability.disabled == false) && (dropdownEdited === 'weapon' || dropdownEdited === 'fuse')) {
        var FuseDurability = 0;
        var DurabilityMod = 0;
        var FuseDurabilityWeapon = selectedFuseObj.weaponDurability;

        if (selectedWeaponObj.canHaveAttackUpMod === true) {
            DurabilityMod = 10;
        }

        if (selectedWeaponObj.name == "Mineru's Construct") {
            FuseDurability = selectedFuseObj.mineruDurability;
        }
        else if (FuseDurabilityWeapon > 0) {
            FuseDurability = Math.min(selectedWeaponObj.fuseExtraDurability, FuseDurabilityWeapon);
        }
        else if (selectedFuseObj.name != "None") {
            FuseDurability = selectedWeaponObj.fuseExtraDurability;
        }

        var MaxDurability = selectedWeaponObj.durability + FuseDurability;

        $('#numberDurability').attr('max', MaxDurability + DurabilityMod);

        if (checkboxFreeMode.checked) {
            $('#numberDurability').attr('max', 2147483647);
        }
        else {
            $('#numberDurability').val(MaxDurability);
        }
    }

    // TRIGGER IF WEAPON DROPDOWN EDITED
    if (dropdownEdited === 'weapon' || checkboxFreeMode.checked) {
        // UPDATE ATTACK UP MOD MAXIMUM
        if (selectedWeaponObj.canHaveAttackUpMod === false) {
            $('#numberAttackUpMod').prop('max', 0);
            $('#numberAttackUpMod').val(0);
        } else {
            $('#numberAttackUpMod').prop('max', 10);
        }
        if (checkboxFreeMode.checked) {
            $('#numberAttackUpMod').prop('max', 2147483647);
        }

        // UPDATE FUSE DROPDOWN AND ICON
        var fuseDropdown = $('#fuseDropdown');

        if (selectedWeaponObj.name == "Decayed Master Sword" || selectedWeaponObj.name == "Master Sword (Prologue)") {
            fuseDropdown.empty();
            fuseDropdown.append('<option value="None">None</option>')
            fuseDropdown.val("None");
            $('#fuseImage').prop('src', "https://raw.githubusercontent.com/TOTKSheet/TOTKImages/main/Items/Obj_OneTouchBond.png");
            selectedFuseObj = findObjByName(fuseData, "None");
        } else if (selectedWeaponObj.type == previousWeaponType) {
            // Do nothing if type did not change
        } else if ((selectedWeaponObj.type == 3 && previousWeaponType != 3) || selectedWeaponObj.yype == 5) {
            //var FusesArrow = [] //@Html.Raw(System.Text.Json.JsonSerializer.Serialize(Model.FusesArrow));
            const FusesArrow = FuseData.default.filter(f => f.canFuseToArrow)
            fuseDropdown.empty();
            $.each(FusesArrow, function (index, fuse) {
                fuseDropdown.append('<option value="' + fuse.name + '">' + fuse.name + '</option>');
            });

            fuseDropdown.val(FusesArrow[0].name);
            $('#fuseImage').prop('src', "https://raw.githubusercontent.com/TOTKSheet/TOTKImages/main/Items/Obj_OneTouchBond.png");
            selectedFuseObj = findObjByName(fuseData, "None");
        } else if (selectedWeaponObj.type != 3) {
            //var Fuses = [] //@Html.Raw(System.Text.Json.JsonSerializer.Serialize(Model.Fuses));
            const Fuses = FuseData.default
            fuseDropdown.empty();
            $.each(Fuses, function (index, fuse) {
                fuseDropdown.append('<option value="' + fuse.name + '">' + fuse.name + '</option>');
            });

            fuseDropdown.val(selectedFuseName);
        }
        previousWeaponType = selectedWeaponObj.type;

        // UPDATE FUSE DROPDOWN TITLE TEXT TO "THROW" IF EARTHWAKE
        if (selectedWeaponObj.type == 5) {
            $('#FuseDropdownTitleText').text('Throw');
        } else {
            $('#FuseDropdownTitleText').text('Fuse');
        }

        // UPDATE DURABILITY TITLE TEXT IF MINERU
        if (selectedWeaponObj.name == "Mineru's Construct") {
            $('#DurabilityTitleText').text('Fuse Durability');
        } else {
            $('#DurabilityTitleText').text('Durability');
        }

        // Show Backscratcher Button
        if (selectedWeaponObj.name == "Royal Guard's Claymore✨") {
            backscratcherButton.classList.remove("hidden");
        } else {
            backscratcherButton.classList.add("hidden");
        }
    }

    var checkboxHeadshot = document.getElementById('checkboxHeadshot');
    var checkboxFrozen = document.getElementById('checkboxFrozen');
    var SelectedWeaponType = selectedWeaponObj.type;
    var dropdown = document.getElementById('attacktypeDropdown');
    var dropdownvalue = dropdown.value;

    // Disable Frozen Checkbox if enemy cannot be frozen
    if (dropdownEdited === 'enemy') {
        if (selectedEnemyObj.canFreeze || checkboxFreeMode.checked) {
            checkboxFrozen.disabled = false;
        } else {
            checkboxFrozen.checked = false;
            checkboxFrozen.disabled = true;
        }
    }

    // Enable Headshot Checkbox if Bow on Headshottable enemy, Melee on Meleeheadshottable enemy, or Molduga; AND NOT FROZEN
    if (((SelectedWeaponType == 3 && selectedEnemyObj.headshotMultiplier > 1) ||
         (SelectedWeaponType != 3 && selectedEnemyObj.canMeleeHeadshot == true) ||
         selectedEnemyObj.name == "Molduga")  && (checkboxFrozen.checked == false) || checkboxFreeMode.checked) {
        checkboxHeadshot.disabled = false;
    } else {
        checkboxHeadshot.checked = false;
        checkboxHeadshot.disabled = true;
    }

    // Change 'Headshot' to 'Weakpoint'
    if (dropdownEdited === 'enemy') {
        if (selectedEnemyObj.name === 'Molduga') {
            $('#HeadshotText').text('Weakpoint (Belly)');
        } else if (selectedEnemyObj.canMeleeHeadshot == true) {
            if (selectedEnemyObj.name === 'Stalnox' || selectedEnemyObj.name.includes("Hinox")) {
                $('#HeadshotText').text('Weakpoint (Eye)');
            }
            else if (selectedEnemyObj.name.includes("Gleeok")) {
                $('#HeadshotText').text('Weakpoint (Head)');
            }
            else if (selectedEnemyObj.name.includes("Like")) {
                $('#HeadshotText').text('Weakpoint (Heart)');
            }
        } else {
            $('#HeadshotText').text('Headshot');
        }
    }

    // Show CriticalHitMod checkbox if possible
    var criticalLabel = document.getElementById("criticalLabel");
    if (SelectedWeaponType != 3 && selectedWeaponObj.canHaveAttackUpMod == true || checkboxFreeMode.checked) {
        criticalLabel.classList.remove("hidden");
    } else {
        checkboxCritical.checked = false;
        criticalLabel.classList.add("hidden");
    }

    // Show Multishot checkbox if possible
    var multishotLabel = document.getElementById("multishotLabel");
    if (selectedWeaponObj.property == "Multishot x3-5" || checkboxFreeMode.checked) {
        multishotLabel.classList.remove("hidden");
    } else {
        checkboxMultishot.checked = false;
        multishotLabel.classList.add("hidden");
    }

    // Disable Attack Up Mod if other mod selected
    if ((checkboxMultishot.checked == true || checkboxCritical.checked == true) && !checkboxFreeMode.checked) {
        numberAttackUpMod.disabled = true;
        numberAttackUpMod.value = 0;
    } else {
        numberAttackUpMod.disabled = false;
    }

    // Show Weakened checkbox if gibdo
    var weakenedLabel = document.getElementById("weakenedLabel");
    var IsGibdo = selectedEnemyObj.name.includes("Gibdo");
    var IsCharged = selectedEnemyObj.name.includes("Electric Chuchu");
    if (IsGibdo) {
        $('#WeakenedText').text('Weakened');
    } else if (IsCharged) {
        $('#WeakenedText').text('Charged');
    }
    if (IsGibdo || IsCharged) {
        weakenedLabel.classList.remove("hidden");
        weakenedLabel.style.marginTop = "-22px";
    } else {
        checkboxWeakened.checked = false;
        weakenedLabel.classList.add("hidden");
    }

    // Show Fence checkbox
    var fenceLabel = document.getElementById("fenceLabel");
    if (selectedEnemyObj.name.includes("Seized Construct")) {
        fenceLabel.classList.remove("hidden");
        fenceLabel.style.marginTop = "-22px";
    } else {
        checkboxFence.checked = false;
        fenceLabel.classList.add("hidden");
    }

    // Show Mineru checkboxes if Mineru
    var zonaiteLabel = document.getElementById("zonaiteLabel");
    var sagewillLabel = document.getElementById("sagewillLabel");
    if (selectedWeaponObj.name == "Mineru's Construct") {
        zonaiteLabel.classList.remove("hidden");
        sagewillLabel.classList.remove("hidden");
    } else {
        checkboxZonaite.checked = false;
        checkboxSagewill.checked = false;
        zonaiteLabel.classList.add("hidden");
        sagewillLabel.classList.add("hidden");
    }

    // Clamp numbers (0 if NaN)
    var AttackUpModClamped = 0;
    var PlayerHPClamped = 0;
    var DurabilityClamped = 0;
    if (!isNaN($('#numberAttackUpMod').val())) {
        AttackUpModClamped = Math.min(2147483647, parseInt($('#numberAttackUpMod').val(), 10));
    }
    if (!isNaN($('#numberHP').val())) {
        PlayerHPClamped = Math.min(40, parseFloat($('#numberHP').val()));
    }
    if (!isNaN($('#numberDurability').val())) {
        DurabilityClamped = Math.min(810, parseInt($('#numberDurability').val(), 10));
    }


    let input = new Input()
    input.attackUpMod = parseInt($('#numberAttackUpMod').val())        // 4 (10)
    input.attackType = $('#attacktypeDropdown').val()                  // 4 (12)
    input.criticalHitMod = $('#checkboxCritical')[0].checked           // 1
    input.multishot = $('#checkboxMultishot')[0].checked               // 1
    input.zonaite = $('#checkboxZonaite')[0].checked                   // 1
    input.sageWill = $('#checkboxSagewill')[0].checked                 // 1
    input.durability = DurabilityClamped                               // 8 (256)
    input.freezeDurability = $('#checkboxFreezeDurability')[0].checked // 1
    input.wet = $('#checkboxWet')[0].checked                           // 1
    input.headshot = $('#checkboxHeadshot')[0].checked                 // 1
    input.frozen = $('#checkboxFrozen')[0].checked                     // 1
    input.weakened = $('#checkboxWeakened')[0].checked                 // 1
    input.fence = $('#checkboxFence')[0].checked                       // 1
    input.hp = PlayerHPClamped                                         // 8 (256)
    input.buff1 = $('#buffDropdown1').val()                            // 3 (8)
    input.buff2 = $('#buffDropdown2').val()                            // 3 (8)
    input.freeMode = $('#checkboxFreeMode')[0].checked                 // 1
    input.trueDamage = $('#checkboxTrueDamage')[0].checked             // 1
    input.sortFuseByAttack = $('#checkboxSortFuseByAttack')[0].checked // 1

    let calc = new Calculator(selectedWeaponObj, selectedFuseObj, selectedEnemyObj, input).calc()
    //console.log(calc)
    success(calc, dropdownEdited, selectedWeaponObj, selectedFuseObj, selectedEnemyObj)

    if(url_update) {
        let url = new URL(window.location)
        let args = new URLSearchParams(url.search)
        //console.log(selectedWeaponObj.sortOrder, WeaponData.default.at(-1).sortOrder)
        //console.log(selectedFuseObj.sortOrder, FuseData.default.at(-1).sortOrder)
        //console.log(selectedEnemyObj.sortOrder, EnemyData.default.at(-1).sortOrder)
        //console.log(F, W, E, D, N)
        //args.set('id', N)
        args.set('weapon', selectedWeaponName)
        args.set('fuse', selectedFuseName)
        args.set('enemy', selectedEnemyName)
        args.set('attacktype', $('#attacktypeDropdown').val() || "Standard Attack")
        args.set('durability', $('#numberDurability').val())
        url.search = args
        //console.log(args, url)
        history.replaceState('', '', url.toString())
    }
    

}


function success (response, dropdownEdited, selectedWeaponObj, selectedFuseObj, selectedEnemyObj) {
    if (selectedFuseObj.name == "None") {
        if (selectedWeaponObj.name == "Master Sword (Prologue)") {
            $('#WeaponNameText').text("MsgNotFound");
        } else if (selectedWeaponObj,name == "Master Sword (Awakened +15)" || selectedWeaponObj.name == "Master Sword (Awakened +30)") {
            $('#WeaponNameText').text("Master Sword");
        } else {
            $('#WeaponNameText').text(selectedWeaponObj.name.replace("*", " ✨"));
        }
    } else {
        $('#WeaponNameText').text(response.name.replace("*", " ✨"));
    }

    // Master Sword Awakened
    if (dropdownEdited === 'enemy') {
        let enemy = selectedEnemyObj.name;
        let weapon = selectedWeaponObj.name;
        let dropdown = $('#weaponDropdown');

        if (enemy === 'Demon Dragon' || enemy.includes('Ganondorf')) {
            dropdown.val(dropdown.children()[2].value); // Change to MS +30
        }
        else if (enemy.includes('Phantom') && (weapon === 'Master Sword' || weapon === 'Master Sword (Awakened +15)')) {
            dropdown.val(dropdown.children()[2].value); // Change to MS +30
        }
        dropdown.trigger('change');
    }

    $('#DamageOutputText').text(response.damageOutput);
    $('#AttackPowerText').text(response.attackPowerUI);

    if (response.blueDamageNum == true) {
        $('#AttackPowerText').css('color', '#b3ffff');
    } else {
        $('#AttackPowerText').css('color', 'white');
    }

    $('#PropertiesList').empty();
    Properties = [];
    $.each(response.properties, function (index, property) {
        $('#PropertiesList').append('<li>' + property + '</li>');
        Properties.push(property);
    });

    if (response.defeated == true) {
        DefeatedText.classList.remove("hidden");
    } else {
        DefeatedText.classList.add("hidden");
    }

    var fullDamageText = response.damageNumList.join(' + ');
    $('#FullDamageText').text(fullDamageText);

    $('#FormulaText').text(response.formula);

    // UPDATE ATTACK TYPE DROPDOWN
    if (dropdownEdited === 'weapon' || dropdownEdited === 'fuse' || dropdownEdited === 'enemy' || dropdownEdited === 'frozen' || checkboxFreeMode.checked) {
        var StandardAttack = NewOption("Standard Attack");
        var Shoot = NewOption("Shoot Arrow");
        var ShieldBash = NewOption("Shield Bash");
        var PerfectParry = NewOption("Perfect Parry");
        var Earthwake = NewOption("Earthwake Technique");
        var ComboFinisher = NewOption("Combo Finisher");
        var Throw = NewOption("Throw");
        var Sneakstrike = NewOption("Sneakstrike");
        var FlurryRush = NewOption("Flurry Rush");
        var Sidon = NewOption("Sidon's Water");
        var Riju = NewOption("Riju's Lightning");
        var MasterSwordBeam = NewOption("Master Sword Beam");
        var Horseback = NewOption("Horseback");
        var dropdown = document.getElementById('attacktypeDropdown');
        var dropdownvalue = dropdown.value;

        while (dropdown.options.length > 0) {
            dropdown.remove(0);
        }

        if (!checkboxFreeMode.checked) {
            if (selectedWeaponObj.name == "Mineru's Construct") {
                dropdown.add(StandardAttack);
                dropdown.value = "Standard Attack";
            } else if (selectedWeaponObj.type < 3) {
                var NotRod = !Properties.includes("Melee Projectile");
                dropdown.add(StandardAttack);
                if (selectedWeaponObj.fuseBaseName == "Master Sword") {
                    dropdown.add(MasterSwordBeam);
                } else if (NotRod) {
                    dropdown.add(Throw);
                }
                if (selectedEnemyObj.canSneakstrike == true && checkboxFrozen.checked == false) {
                    dropdown.add(Sneakstrike);
                }
                dropdown.add(FlurryRush);
                dropdown.add(ComboFinisher);
                dropdown.add(Sidon);
                dropdown.add(Horseback);

                // add weapon type to fuse data and replace this check
                var IsShieldFuse = selectedFuseObj.name.includes("Shield") || selectedFuseObj.name == "Pot Lid" || selectedFuseObj.name == "Daybreaker";
                if (IsShieldFuse) {
                    dropdown.add(ShieldBash);
                    dropdown.add(PerfectParry);
                }

                if ((dropdownvalue == "Sneakstrike" && selectedEnemyObj.canSneakstrike == false) || (dropdownvalue == "Sneakstrike" && checkboxFrozen.checked == true)) {
                    dropdown.value = "Standard Attack";
                } else if (dropdownvalue == "Master Sword Beam" && selectedWeaponObj.fuseBaseName != "Master Sword") {
                    dropdown.value = "Standard Attack";
                } else if (dropdownvalue == "Throw" && selectedWeaponObj.fuseBaseName == "Master Sword") {
                    dropdown.value = "Standard Attack";
                } else if (dropdownvalue == "Throw" && !NotRod) {
                    dropdown.value = "Standard Attack";
                } else if ((dropdownvalue == "Shield Bash" || dropdownvalue == "Perfect Parry") && !IsShieldFuse) {
                    dropdown.value = "Standard Attack";
                } else if (dropdownvalue == "Shoot Arrow" || dropdownvalue == "Riju's Lightning" || dropdownvalue == "Earthwake Technique") {
                    dropdown.value = "Standard Attack";
                } else {
                    dropdown.value = dropdownvalue;
                }
            } else if (selectedWeaponObj.type == 3) {
                dropdown.add(Shoot);
                dropdown.add(Riju);
                if (dropdownvalue != "Riju's Lightning") {
                    dropdown.value = "Shoot Arrow";
                } else {
                    dropdown.value = dropdownvalue;
                }
            } else if (selectedWeaponObj.type == 4) {
                dropdown.add(ShieldBash);
                dropdown.add(PerfectParry);
                if (dropdownvalue != "Perfect Parry") {
                    dropdown.value = "Shield Bash";
                } else {
                    dropdown.value = dropdownvalue;
                }
            } else if (selectedWeaponObj.type == 5) {
                dropdown.add(Earthwake);
                dropdown.add(Throw);
                if (dropdownvalue != "Throw") {
                    dropdown.value = "Earthwake Technique";
                } else {
                    dropdown.value = dropdownvalue;
                }
            }
        } else {
            dropdown.add(StandardAttack);
            dropdown.add(MasterSwordBeam);
            dropdown.add(Throw);
            dropdown.add(Sneakstrike);
            dropdown.add(FlurryRush);
            dropdown.add(ComboFinisher);
            dropdown.add(Sidon);
            dropdown.add(ShieldBash);
            dropdown.add(PerfectParry);
            dropdown.add(Shoot);
            dropdown.add(Riju);
            dropdown.add(Earthwake);
            dropdown.add(Horseback);
            dropdown.value = dropdownvalue;
        }
    }

}
function error_msg (error) {
    console.error('UPDATE ERROR', error);
}

function NewOption(OptionName) {
    var newOption = document.createElement('option');
    newOption.value = OptionName;
    newOption.text = OptionName;
    return newOption;
}

function restrictAttackUpMod(event) {
    console.log("restrict attack up mod")
    if (!checkboxFreeMode.checked) {
        //console.log("not free mode")
        var AttackUpMod = $('#numberAttackUpMod').val();
        if (AttackUpMod == 2) {
            $('#numberAttackUpMod').val(0);
            $('#numberAttackUpMod').prop('step', 3);
        } else {
            $('#numberAttackUpMod').prop('step', 1);
        }
    } else {
        console.log("free mode")
        $('#numberAttackUpMod').prop('step', 1);
        $('#numberAttackUpMod').prop('max', 2147483647);
    }
}
