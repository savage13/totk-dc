#!/usr/bin/env python

import sys
import csv
import json

infile =  sys.argv[1]
outfile =  sys.argv[2]

with open(infile, "r") as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

int_types = ['type', 'baseAttack', 'projectileAttack', 'durability', 'fuseExtraDurability', 'sortOrder',
             "hp",  "fireDamage", "fireDamageContinuous", "iceDamage", "shockDamage",
             "waterDamage", "rijuDamage", "ArrowMultiplier",
             "bombMultiplier", "elementPower", "weaponDurability",
             "mineruDurability", 
             ]
float_types = ["beamMultiplier",  "headshotMultiplier",]
str_types = ["property", "namingRule", "actorID", "name", "property1", "property2", "property3",
             "adjective", "bindTypeSword", "bindTypeSpear", "element"
             ]
bool_types = ['canCut', 'canHaveAttackUpMod', "canFreeze", "ancientBladeDefeat", "isRock",
              "canMeleeHeadshot", "canFuseToArrow", "addsShieldAttack", "replacesProperties"]

out = []
for row in data:
    t = {}
    for key, val in row.items():
        print(key, val)
        k = key[0].lower() + key[1:]
        k = k.replace(" ", "")
        if k == "hP":
            k = "hp"
            val = val.replace(",", "")
        if k in int_types:
            val = int(val)
        if k in float_types:
            val = float(val)
        #if k in str_types and val == "-":
        #    val = ""
        if k in bool_types:
            val = val == "1"
        if k in ['name']:
            val = val.replace("\u2728", "*")
        t[k] = val
    out.append(t)

json.dump(out, open(outfile, "w"), indent=2)
