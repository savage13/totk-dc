const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
const isNode = (
  // @ts-expect-error
  typeof process !== "undefined" && // @ts-expect-error
  process.versions != null && // @ts-expect-error
  process.versions.node != null
);
let fs = void 0;
async function read_file_api(filename) {
  if (isNode) {
    if (!fs) {
      fs = await import("node:fs/promises");
    }
    return fs.readFile(filename, { encoding: "utf-8" });
  } else {
    const res = await fetch(filename);
    return res.text();
  }
}
const SUBTYPES = [
  "Rod",
  "NoThrowing",
  "ShatterWeapon",
  "ShatterWeaponLv2",
  "ShatterWeaponLv3",
  "ChemicalExplosionFire",
  "ChemicalExplosionIce",
  "ChemicalExplosionElectric",
  "ChemicalExplosionWater",
  "Torch",
  "LongThrow",
  "PowHammer",
  "Boomerang",
  "Katana",
  "Bone",
  "MasterSword",
  "ComboPlus",
  "RocketBooster",
  "BalloonFloat",
  "Beehive",
  "Spike",
  "AreaOfEffect",
  "SpWing",
  "TreeCutter",
  "Blunt",
  "Fan",
  "ChemicalAttackFire",
  "ChemicalAttackIce",
  "ChemicalAttackElectric",
  "FanShield",
  "ShieldCounter",
  "ShieldBash",
  "GuardEnhance",
  "Warm",
  "Cold",
  "Tree",
  "AtExpandSmall",
  "AtExpandLarge",
  "AtExpandExLarge",
  "Homing",
  "ShieldSurfingslipperinessUp",
  "ShieldSurfingslipperinessDown",
  "NoRotateYAxis",
  "IgnoreGravity",
  "Pile",
  "ExpandShockWave",
  "StealthAttackUp",
  "ShatterLevelUp",
  "ZonauEnergyEfficiencyUp",
  "DecreaseChargeAttackStamina",
  "FinishBlowUp",
  "IsEffectiveToGanonInfluenceEnemy",
  "AncientWeapon",
  "ChargeSpeedUp",
  "CriticalDamageUp",
  "HystericalStrength",
  "RushDamageUp",
  "LifeHeal",
  "Miasma",
  "AttachmentDamageUp",
  "WaterDamageUp",
  "WaterDamageUpElement",
  "IsEffectiveToWeakGanonInfluenceEnemy",
  "ShieldBashAnmChange",
  "Reuse",
  "ReuseSeed",
  "Floating",
  "RicketyDamageUp",
  "Spring",
  "Zonau",
  "BatteryUser",
  "GuardJustEnhance",
  "Octakos",
  "ZonauDamageUp",
  "CreateWind",
  "JumpUp",
  "HighDurability",
  "ChemicalIceInf",
  "ShieldSurfingSpring",
  "ConfuseEffect",
  "BluntWithAnyAttachment",
  "AttackUpByLife",
  "DefeatMiasma",
  "TorchNoBurning",
  "ChemicalExplosionBomb",
  "ShieldSurfingNoStaggerWithDeath",
  "ShatterLevelUpOnlyAim",
  "ImpressiveGrip",
  "ChemicalFireInf",
  "ChemicalElectricInf",
  "ChemicalExplosionLight",
  "UnlikeHammer",
  "UnlikeBat",
  "BoomerangZRotate"
];
export class Context {
  locale;
  attached_equipment_naming_rule;
  pouch_content_msg;
  pouch_content_msg_inv;
  naming_rule_table;
  actor_info_table;
  pouch_actor_info_table;
  attachment_actor_info_table;
  default_pouch_actor_info;
  default_attachment_actor_info;
  default_actor_info;
  attachment_msg;
  attachment_common_name_msg;
  essence_msg;
  essence_disable_table;
  constructor(locale = "USen") {
    this.locale = locale;
  }
  async read_file(filename) {
    return read_file_api(filename);
  }
  async load_generic(filename) {
    const data = await this.read_file(filename);
    return JSON.parse(data);
  }
  async load_rstbl(filename) {
    const data = await this.read_file(filename);
    return Object.fromEntries(
      JSON.parse(data).map((row) => [row.__RowId, row])
    );
  }
  async init(dir = ".") {
    const msg = `${dir}/message/${this.locale}`;
    const res = `${dir}/resources/`;
    this.pouch_content_msg = await this.load_generic(`${msg}/PouchContent.min.json`);
    this.attached_equipment_naming_rule = await this.load_generic(`${msg}/AttachedEquipmentNamingRule.json`);
    this.naming_rule_table = await this.load_generic(`${res}/Default.game__ui__AttachedEquipmentNamingRuleTable.json`);
    this.pouch_actor_info_table = await this.load_rstbl(`${res}/PouchActorInfo.Product.142.rstbl.min.json`);
    this.attachment_actor_info_table = await this.load_rstbl(`${res}/AttachmentActorInfo.Product.142.rstbl.min.json`);
    this.default_pouch_actor_info = await this.load_generic(`${res}/Default.game__PouchActorInfoTableRow.json`);
    this.default_attachment_actor_info = await this.load_generic(`${res}/Default.game__AttachmentActorInfoTableRow.json`);
    this.attachment_msg = await this.load_generic(`${msg}/Attachment.json`);
    this.attachment_common_name_msg = await this.load_generic(`${msg}/AttachmentCommonName.json`);
    this.default_actor_info = await this.load_generic(`${res}/Default.engine__rsdb__ActorInfoTable.json`);
    this.actor_info_table = await this.load_rstbl(`${res}/ActorInfo.Product.142.rstbl.min.json`);
    this.essence_msg = await this.load_generic(`${msg}/Essence.json`);
    this.essence_disable_table = await this.load_generic(`${res}/Default.game__ui__WeaponEssnenceDisableConditionTable.json`);
    this.pouch_content_msg_inv = Object.fromEntries(
      Object.entries(this.pouch_content_msg).filter((k) => k[0].endsWith("_Name")).map((k) => [
        k[1].replace("<1|4 Data='0x29CD'/>", " (Pristine)"),
        k[0].replace("_Name", "")
      ])
    );
  }
  lookup(name) {
    return this.pouch_content_msg_inv[name];
  }
  resolve_attachment_adjective(attachment) {
    return resolve_attachment_adjective(this, attachment);
  }
  resolve_equipment_base_name(base) {
    return resolve_equipment_base_name(this, base);
  }
  resolve_essence_adjective(base, attachment) {
    return resolve_essence_adjective(this, base, attachment);
  }
  resolve_essence_base_name(base, attachment) {
    return resolve_essence_base_name(this, base, attachment);
  }
  get_naming_rule(base, attachment) {
    return get_naming_rule(this, base, attachment);
  }
  get_resolved_name(base, attachment) {
    return get_resolved_name(this, base, attachment);
  }
  match_naming_rule(base, attachment, rules) {
    return match_naming_rule(this, base, attachment, rules);
  }
  get_subtypes(name) {
    return get_subtypes(this, name);
  }
  get_attachment_subtypes(attachment) {
    return get_attachment_subtypes(this, attachment);
  }
  get_aai_value(aai, key) {
    return get_aai_value(this, aai, key);
  }
  get_ai_value(ai, key) {
    return get_ai_value(this, ai, key);
  }
  get_pai_value(pai, key) {
    return get_pai_value(this, pai, key);
  }
}
function get_aai_value(ctx, row, key) {
  return row[key] || ctx.default_attachment_actor_info[key];
}
function get_pai_value(ctx, row, key) {
  return row[key] || ctx.default_pouch_actor_info[key];
}
function get_ai_value(ctx, row, key) {
  return row[key] || ctx.default_actor_info[key] || row.__RowId;
}
function get_attachment_subtypes(ctx, attachment) {
  let aai = ctx.attachment_actor_info_table[attachment] || null;
  if (!aai) {
    throw new Error(`${attachment} is not a valid fuse material`);
  }
  return new Set(get_aai_value(ctx, aai, "AttachmentAdditionalSubType").split(","));
}
function get_subtypes(ctx, name) {
  let pai = ctx.pouch_actor_info_table[name] || null;
  if (!pai) {
    throw new Error(`${name} is not a valid piece of equipment`);
  }
  return new Set(get_pai_value(ctx, pai, "WeaponSubType").split(","));
}
function get_base_filename(path) {
  const filename = path.split("/").at(-1);
  let k = filename.indexOf(".");
  if (k == -1) {
    return filename;
  }
  return filename.slice(0, k);
}
function match_naming_rule(ctx, base, attachment, rules) {
  let pai = ctx.pouch_actor_info_table[base] || null;
  if (!pai) {
    throw new Error(`${base} is not a valid piece of equipment`);
  }
  let aai = ctx.attachment_actor_info_table[attachment] || null;
  if (!aai) {
    throw new Error(`${attachment} is not a valid fuse material`);
  }
  let attachment_subtypes = get_attachment_subtypes(ctx, attachment);
  let base_subtypes = get_subtypes(ctx, base);
  let override_dmg_attr = get_aai_value(ctx, aai, "AttachmentIsOverrideAttribute");
  let blunt = false;
  if (override_dmg_attr) {
    blunt = attachment_subtypes.has("Blunt");
  } else {
    blunt = base_subtypes.has("Blunt");
  }
  let weapon_type = get_pai_value(ctx, pai, "WeaponType");
  let bind_type = "";
  switch (weapon_type) {
    case "Spear":
      bind_type = get_aai_value(ctx, aai, "AttachmentBindBoneSpear");
      break;
    case "LargeSword":
      bind_type = get_aai_value(ctx, aai, "AttachmentBindBoneLargeSword");
      break;
    case "SmallSword":
      bind_type = get_aai_value(ctx, aai, "AttachmentBindBoneSword");
      break;
  }
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    let matching = true;
    for (let condition of rule["ConditionPack"] || []) {
      let cond_type = condition["ConditionType"] || "Essence";
      switch (cond_type) {
        case "Essence":
          let essence_type = condition["EssenceType"] || "Fan";
          let essence_source = condition["EssenceSource"] || "Either";
          if (essence_source == "Grip") {
            matching = base_subtypes.has(essence_type);
          } else if (essence_source == "Attachment") {
            matching = attachment_subtypes.has(essence_type);
          } else {
            matching = base_subtypes.has(essence_type) || attachment_subtypes.has(essence_type);
          }
          break;
        case "DamageAttribute":
          let attr = condition["DamageAttribute"] || "Blunt";
          if (attr == "Blunt") {
            matching = blunt;
          } else {
            matching = !blunt;
          }
          break;
        case "IsOverrideDamageAttribute":
          matching = override_dmg_attr == (condition["IsOverrideDamageAttribute"] || false);
          break;
        case "PouchCategory":
          let attachment_pai = ctx.pouch_actor_info_table[attachment] || null;
          if (!attachment_pai) {
            matching = false;
          } else {
            matching = get_pai_value(ctx, attachment_pai, "PouchCategory") == (condition["PouchCategory"] || "Weapon");
          }
          break;
        case "BindType":
          matching = bind_type == (condition["BindType"] || "");
          break;
        case "WeaponType":
          matching = weapon_type == (condition["WeaponType"] || "");
          break;
        default:
          matching = false;
      }
      if (!matching) {
        break;
      }
    }
    if (matching) {
      return i;
    }
  }
  return -1;
}
function get_naming_rule_with_details(ctx, base, attachment) {
  let pai = ctx.pouch_actor_info_table[base] || null;
  if (!pai) {
    throw new Error(`${base} is not a valid piece of equipment`);
  }
  const pouch_category = get_pai_value(ctx, pai, "PouchCategory");
  let tbl;
  if (pouch_category == "Shield") {
    tbl = ctx.naming_rule_table["ConditionalNamingRuleListShield"] || [];
  } else if (pouch_category == "Weapon") {
    tbl = ctx.naming_rule_table["ConditionalNamingRuleListWeapon"] || [];
  } else {
    tbl = get_base_filename(ctx.naming_rule_table["DefaultNamingRule"] || []);
  }
  let index = match_naming_rule(ctx, base, attachment, tbl);
  if (index > -1 && index < tbl.length) {
    return [get_base_filename(tbl[index]["NamingRule"] || ""), tbl[index], index];
  }
  return [get_base_filename(ctx.naming_rule_table["DefaultNamingRule"] || ""), null, index];
}
export function get_naming_rule(ctx, base, attachment) {
  let pai = ctx.pouch_actor_info_table[base] || null;
  if (!pai) {
    throw new Error(`${base} is not a valid piece of equipment`);
  }
  const pouch_category = get_pai_value(ctx, pai, "PouchCategory");
  let tbl;
  if (pouch_category == "Shield") {
    tbl = ctx.naming_rule_table["ConditionalNamingRuleListShield"] || [];
  } else if (pouch_category == "Weapon") {
    tbl = ctx.naming_rule_table["ConditionalNamingRuleListWeapon"] || [];
  } else {
    tbl = get_base_filename(ctx.naming_rule_table["DefaultNamingRule"] || []);
  }
  let index = match_naming_rule(ctx, base, attachment, tbl);
  if (index > -1 && index < tbl.length) {
    return get_base_filename(tbl[index]["NamingRule"] || "");
  }
  return get_base_filename(ctx.naming_rule_table["DefaultNamingRule"] || "");
}
function resolve_equipment_base_name(ctx, name) {
  let out = ctx.pouch_content_msg[`${name}_BaseName`];
  if (!out) {
    throw new Error(`${name} does not have a BaseName`);
  }
  return out;
}
function get_actor_name(ctx, actor) {
  let row = ctx.actor_info_table[actor] || null;
  if (!row) {
    throw new Error(`Invalid actor name: ${actor}`);
  }
  return get_base_filename(get_ai_value(ctx, row, "ActorName"));
}
function resolve_attachment_adjective(ctx, attachment) {
  let aai = ctx.attachment_actor_info_table[attachment] || null;
  if (!aai) {
    throw new Error(`${attachment} is not a valid fuse material`);
  }
  let common_name = get_aai_value(ctx, aai, "AttachmentCommonName");
  if (common_name == "") {
    let adj = ctx.attachment_msg[`${get_actor_name(ctx, attachment)}_Adjective`];
    if (!adj) {
      throw new Error(`${get_actor_name(ctx, attachment)} does not have an Adjective`);
    }
    return adj;
  }
  let out = ctx.attachment_common_name_msg[`${common_name}_Adjective`];
  if (!out) {
    throw new Error(`${common_name} does not have an Adjective`);
  }
  return out;
}
function resolve_essence_adjective(ctx, base, attachment) {
  let t = get_essence(ctx, base, attachment);
  return ctx.essence_msg[t + "_Any"];
}
function get_essence_name(ctx, base, attachment, with_equipment_type) {
  let pai = ctx.pouch_actor_info_table[base] || null;
  if (!pai) {
    throw new Error(`${base} is not a valid piece of equipment`);
  }
  let pouch_category = get_pai_value(ctx, pai, "PouchCategory");
  let tbl = [];
  if (pouch_category == "Shield") {
    tbl = ctx.naming_rule_table["ConditionalNamingRuleListShield"] || [];
  } else if (pouch_category == "Weapon") {
    tbl = ctx.naming_rule_table["ConditionalNamingRuleListWeapon"] || [];
  } else {
    return "";
  }
  if (!tbl) {
    throw new Error(`Rule table is not defined for ${base} ${attachment}`);
  }
  let index = match_naming_rule(ctx, base, attachment, tbl);
  if (index < 0) {
    throw new Error(`Error finding match naming rule for ${base} ${attachment}`);
  }
  let rule = tbl[index];
  let name_rule = "";
  if (with_equipment_type) {
    name_rule = rule["EssenceWithEquipmentTypeRule"] || "Default";
  } else {
    name_rule = rule["EssenceNameRule"] || "Default";
  }
  if (name_rule == "Default") {
    for (let condition of rule["ConditionPack"] || []) {
      let cond_type = condition["ConditionType"] || "Essence";
      if (cond_type == "DamageAttribute") {
        return condition["DamageAttribute"] || "Blunt";
      } else if (cond_type == "Essence") {
        return condition["EssenceType"] || "Fan";
      }
    }
  } else if (name_rule == "AttachmentBase") {
    for (let condition of rule["ConditionPack"] || []) {
      let cond_type = condition["ConditionType"] || "Essence";
      if (cond_type == "DamageAttribute") {
        return condition["DamageAttribute"] || "Blunt";
      } else if (cond_type == "Essence" && (condition["EssenceSource"] || "Either") == "Attachment") {
        return condition["EssenceType"] || "Fan";
      }
    }
    let attachment_subtypes = get_attachment_subtypes(ctx, attachment);
    for (let subtype of SUBTYPES) {
      if (!attachment_subtypes.has(subtype)) {
        continue;
      }
      if (is_enable_essence(ctx, base, attachment, subtype)) {
        return subtype;
      }
    }
  } else if (name_rule == "GripBase") {
    for (let condition of rule["ConditionPack"] || []) {
      let cond_type = condition["ConditionType"] || "Essence";
      if (cond_type == "DamageAttribute") {
        return condition["DamageAttribute"] || "Blunt";
      } else if (cond_type == "Essence" && (condition["EssenceSource"] || "Either") == "Grip") {
        return condition["EssenceType"] || "Fan";
      }
    }
    let subtypes = get_subtypes(ctx, base);
    for (let subtype of SUBTYPES) {
      if (!(subtype in subtypes)) {
        continue;
      }
      if (is_enable_essence(ctx, base, attachment, subtype)) {
        return subtype;
      }
    }
  }
  for (let condition of rule["ConditionPack"] || []) {
    let cond_type = condition["ConditionType"] || "Essence";
    if (cond_type == "DamageAttribute") {
      return condition["DamageAttribute"] || "Blunt";
    } else if (cond_type == "Essence") {
      return condition["EssenceType"] || "Fan";
    }
  }
  return "";
}
function is_enable_essence(ctx, base, attachment, subtype) {
  let aai = ctx.attachment_actor_info_table[attachment] || null;
  if (!aai) {
    throw new Error(`${attachment} is not a valid fuse material`);
  }
  let attachment_subtypes = get_attachment_subtypes(ctx, attachment);
  let base_subtypes = get_subtypes(ctx, base);
  let override_dmg_attr = get_aai_value(ctx, aai, "AttachmentIsOverrideAttribute");
  if (!attachment_subtypes.has(subtype) && !base_subtypes.has(subtype)) {
    return false;
  }
  if (!override_dmg_attr || !base_subtypes.has(subtype)) {
    return true;
  }
  for (let condition of ctx.essence_disable_table["ConditionList"] || []) {
    let essence = condition["WeaponEssence"] || "Rod";
    let is_reverse = condition["IsReverse"] || false;
    if (essence != subtype) {
      continue;
    }
    if (is_reverse) {
      if ((condition["AttachmentEssenceList"] || []).every((st) => !attachment_subtypes.has(st))) {
        return false;
      }
    } else {
      if ((condition["AttachmentEssenceList"] || []).some((st) => attachment_subtypes.has(st))) {
        return false;
      }
    }
  }
  return true;
}
function get_essence(ctx, base, attachment) {
  return get_essence_name(ctx, base, attachment, false);
}
function get_essence_with_equipment_type(ctx, base, attachment) {
  return get_essence_name(ctx, base, attachment, true);
}
function resolve_essence_base_name(ctx, base, attachment) {
  let pai = ctx.pouch_actor_info_table[base] || null;
  if (!pai) {
    throw new Error(`${base} is not a valid piece of equipment`);
  }
  let eq_type = get_essence_with_equipment_type(ctx, base, attachment);
  let w_type = get_pai_value(ctx, pai, "WeaponType");
  return ctx.essence_msg[`${eq_type}_${w_type}`];
}
export function get_resolved_name(ctx, base, attachment) {
  const rule = get_naming_rule(ctx, base, attachment);
  let out = ctx.attached_equipment_naming_rule[rule];
  if (!out) {
    throw new Error(`Unknown rule ${base} ${attachment}`);
  }
  if (out.includes("<2|24/>"))
    out = out.replace("<2|24/>", resolve_attachment_adjective(ctx, attachment));
  if (out.includes("<2|25/>"))
    out = out.replace("<2|25/>", resolve_equipment_base_name(ctx, base));
  if (out.includes("<2|26/>"))
    out = out.replace("<2|26/>", resolve_essence_adjective(ctx, base, attachment));
  if (out.includes("<2|27/>"))
    out = out.replace("<2|27/>", resolve_essence_base_name(ctx, base, attachment));
  return out;
}
async function main() {
  const ctx = new Context();
  await ctx.init();
  let filename = "names.csv";
  let split_ch = ",";
  let tests = (await read_file_api(filename, { encoding: "utf-8" })).split("\n");
  let ok = 0;
  for (const test of tests.slice(1)) {
    if (test.trim().length == 0)
      continue;
    let [equip, fuse, name] = test.split(split_ch);
    name = name.trim();
    if (equip.endsWith("_Base") || fuse.endsWith("_Base") || !equip.startsWith("Weapon")) {
      continue;
    }
    if (name.length == 0) {
      continue;
    }
    let out = "";
    try {
      out = get_resolved_name(ctx, equip, fuse);
    } catch (e) {
      continue;
    }
    if (out && out != name) {
      console.log("out", out);
      console.log("name", name);
      console.log(equip, fuse);
      console.log("error");
      break;
    }
    ok += 1;
    continue;
  }
  console.log("done", ok);
  if (ok != 142608) {
    console.log("expected number of successful tests is 142608, you got", ok);
  }
}
if (isNode) {
  main();
}
//# sourceMappingURL=fuse_naming.js.map
