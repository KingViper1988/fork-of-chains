// @ts-nocheck

/*
  Các macro văn bản cho các đơn vị. Với mỗi macro <<uxxx unit>>, sẽ có một phiên bản <<uxxxall unit>> cung cấp mô tả trang bị.
  Ví dụ, <<utorso unit>> trở thành <<utorsoall unit>>: cơ thể vạm vỡ được bảo vệ bởi áo giáp lưới

  <<utorso unit>>: cơ thể vạm vỡ
  <<uback unit>>: lưng vạm vỡ
  <<ubelly unit>>: bụng sáu múi
  <<uwaist unit>>: eo thon
  <<uhead unit>>: đầu
  <<uface unit>>: khuôn mặt điển trai
  <<umouth unit>>: miệng rồng
  <<ueyes unit>>: đôi mắt giống mèo
  <<uears unit>>: tai elf
  <<uhorns unit>>: sừng
  <<ubreast unit>>: ngực nam tính
  <<ucleavage unit>>: khe ngực nam tính
  <<uneck unit>>: cổ dày
  <<uwings unit>>: đôi cánh rồng
  <<uarms unit>>: cánh tay cơ bắp
  <<ulegs unit>>: đôi chân thon
  <<ufeet unit>>: bàn chân đi bằng ngón
  <<utail unit>>: đuôi rồng
  <<udick unit>>: dương vật lớn
  <<udickorstrap unit>>: dương vật lớn hoặc dương vật giả
  <<uballs unit>>: tinh hoàn lớn
  <<uvagina unit>>: âm đạo rộng ngoác
  <<uanus unit>>: hậu môn rộng ngoác
  <<uhole unit>>: lỗ hậu môn rộng ngoác
  <<unipple unit>>: núm vú
  <<uhands unit>>: bàn tay
  <<ugenital unit>>: dương vật và tinh hoàn lớn
  <<utongue unit>>: lưỡi dài
  <<utailtip unit>>: chóp đuôi nhọn
  <<udickhead unit>>: đầu
  <<uteeth unit>>: răng / nanh

  KHÁC:
  <<uequipment unit>>: bộ giáp nô lệ trói buộc gợi dục quý giá
  <<ubantertraining unit>>: "John không thể không khao khát sự chú ý của bạn."
  <<uadjphys unit>>: vạm vỡ (tính từ thể chất ngẫu nhiên)
  <<uadj unit>>: thông minh (tính từ ngẫu nhiên)
  <<uadjgood unit>>: thông minh (tính từ tốt ngẫu nhiên)
  <<uadjbad unit>>: ngu ngốc (tính từ xấu ngẫu nhiên)
  <<uadv unit>>: một cách thông minh (trạng từ ngẫu nhiên)
  <<urace unit>>: neko
  <<uhomeland unit>>: neko
  <<uweapon unit>>: kiếm (vũ khí của đơn vị. Luôn là cận chiến. đơn vị luôn có vũ khí)
  <<uaweapon unit>>: một thanh kiếm

  <<upraisenoun unit>>: lòng dũng cảm (hoặc vẻ điển trai, v.v.)
  <<uinsultnoun unit>>: lòng dũng cảm (hoặc vẻ điển trai, v.v.)
  <<uhobbyverb unit>>: hồi tưởng về quá khứ của anh ấy
  
  <<ustriptorso unit>>: "John cởi áo sơ mi"
  <<ustriplegs unit>>: "John kéo quần xuống"
  <<ustripanus unit>>: "John rút nút bịt hậu môn ra"
  <<ustripgenital unit>>: "John rút nút bịt hậu môn ra"
  <<ustripmouth unit>>: "John tháo bịt miệng ra"
  <<ustripvagina unit>>: "Alice rút dương vật giả ra"
  <<ustripdick unit>>: "Bạn mở khóa lồng trinh tiết của John"
  <<ustripnipple unit>>: "John tháo kẹp núm vú ra"
  <<uslaverstripall unit>>: "Chủ nô của bạn lột trần đơn vị khỏi bộ đồ trói buộc của họ"

  <<upunishreason unit>>: "đơn vị đã thất bại trong công việc của họ"
  <<uneedrescue unit>>: "Nghe tin, bạn thở dài rõ rệt trong khi ra lệnh cho người cứu hộ Bob bắt đầu làm việc"
  <<urescuenow unit>>: "Nghe tin, bạn thở dài khi ngay lập tức bắt tay vào việc tìm kiếm chủ nô trước khi điều tồi tệ hơn xảy ra"

  <<ustripshirtand unit>> "cởi áo sơ mi và"
  <<ustrippantsand unit>> "cởi quần và"
  <<ustripequipmentand unit>> "cởi áo giáp và"
*/

import { Args_OneActor } from "../../macro/_meta"

function internalOutput(output, func, unit_raw, article) {
  let unit = unit_raw
  if (setup.isString(unit_raw)) unit = State.variables.unit[unit_raw]

  let raw = func(unit)
  if (article) raw = setup.Article(raw)

  output.append(setup.DOM.Util.twine(raw))
}

function internalOutputUnitTarget(output, func, unit_raw, target_raw) {
  let unit = setup.selfOrObject(unit_raw, State.variables.unit)
  let target
  if (target_raw) {
    target = setup.selfOrObject(target_raw, State.variables.unit)
  } else {
    target = null
  }
  let raw = func({ unit: unit, target: target })
  output.append(setup.DOM.Util.twine(raw))
}
// mỗi macro này sẽ được tạo thành hai macro, một cho mô tả khi không mặc đồ và một cho khi có trang bị
// ví dụ, "torso" trở thành hai macro: <<utorso _unit>> cho khi không mặc đồ và <<utorsoall _unit>> cho khi có mặc đồ
const candidates = [
  'torso',
  'back',
  'head',
  'face',
  'mouth',
  'eyes',
  'ears',
  'cbreast',
  'breast',
  'neck',
  'wings',
  'arms',
  'hand',
  'hands',
  'legs',
  'cfeet',
  'clegs',
  'ctorso',
  'carms',
  'cneck',
  'ceyes',
  'cnipple',
  'ctail',
  'cmouth',
  'feet',
  'foot',
  'tail',
  'dick',
  'balls',
  'vagina',
  'anus',
  'genital',
  'cgenital',
  'ass',
  'nipple',
  'nipples',
  'hole',
  'tongue',
  'skin',
  'scent',
  'horns',
  'teeth',
  'belly',
  'waist',
  'dickorstrap',
  'cum',
  'cleavage',

  /* Đồ nội thất */
  'slaverbed',
  'slavebed',
  'foodtray',
  'drinktray',
  'punishment',
  'lighting',
  'tile',
  'object',
  'wall',
];

for (let i = 0; i < candidates.length; ++i) {
  (function (candidate) {
    Macro.add(`u${candidate}`, {
      handler() {
        internalOutput(this.output, setup.Text.Unit.Trait[candidate], this.args[0]);
      }
    });
    Macro.add(`u${candidate}all`, {
      handler() {
        internalOutput(this.output, unit => setup.Text.Unit.Trait[candidate](unit, /* eq = */ true), this.args[0]);
      }
    });

    Macro.add(`ua${candidate}`, {
      handler() {
        internalOutput(
          this.output,
          setup.Text.Unit.Trait[candidate],
          this.args[0],
        /* article = */ true);
      }
    });
    Macro.add(`ua${candidate}all`, {
      handler() {
        internalOutput(
          this.output,
          unit => setup.Text.Unit.Trait[candidate](unit, /* eq = */ true),
          this.args[0],
        /* article = */ true);
      }
    });

    setup.MACROS_METADATA[`u${candidate}`] = {
      info: `Mô tả ${candidate} của đơn vị`,
      args: Args_OneActor
    }
    setup.MACROS_METADATA[`u${candidate}all`] = {
      info: `Mô tả ${candidate} của đơn vị, bao gồm cả tình trạng mặc đồ`,
      args: Args_OneActor
    }
    setup.MACROS_METADATA[`ua${candidate}`] = {
      info: `Mô tả ${candidate} của đơn vị, và thêm mạo từ vào trước`,
      args: Args_OneActor
    }
    setup.MACROS_METADATA[`ua${candidate}all`] = {
      info: `Mô tả ${candidate} của đơn vị, bao gồm cả tình trạng mặc đồ, và thêm mạo từ vào trước`,
      args: Args_OneActor
    }
  }(candidates[i]));
}

Macro.add('ubody', 'utorso');
Macro.add('ubodyall', 'utorsoall');
Macro.add('ubreasts', 'ubreast');
Macro.add('ubreastsall', 'ubreastall');
Macro.add('ucbreasts', 'ucbreast');
Macro.add('ucbreastsall', 'ucbreastall');
Macro.add('ucdick', 'ucgenital');
Macro.add('ucnipples', 'ucnipple');

Macro.add(`uflavor`, {
  handler() {
    internalOutput(this.output, unit => setup.Text.Unit.Trait.flavor(unit, /* tag = */ this.args[1]), this.args[0]);
  }
});

Macro.add(`uequipment`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Equipment.equipmentSummary, this.args[0]);
  }
});

Macro.add(`ubantertraining`, {
  handler() {
    internalOutput(this.output, setup.Text.Banter.slaveTrainingText, this.args[0]);
  }
});

Macro.add(`uadjphys`, {
  handler() {
    internalOutput(this.output, unit => setup.Text.Unit.Trait.adjectiveRandom(unit, 'physical'), this.args[0]);
  }
});

Macro.add(`uadjper`, {
  handler() {
    internalOutput(this.output, unit => setup.Text.Unit.Trait.adjectiveRandom(unit, 'per'), this.args[0]);
  }
});

Macro.add(`urace`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Trait.race, this.args[0]);
  }
});

Macro.add(`uhomeland`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Trait.homeland, this.args[0]);
  }
});

Macro.add(`uweapon`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Equipment.getWeaponRep, this.args[0]);
  }
});

Macro.add(`uaweapon`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Equipment.getAWeaponRep, this.args[0]);
  }
});

Macro.add(`uweaponall`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Equipment.getWeaponRepFull, this.args[0]);
  }
});

Macro.add(`uadj`, {
  handler() {
    internalOutput(this.output, unit => setup.Text.Unit.Trait.adjectiveRandom(unit), this.args[0]);
  }
});
Macro.add(`uadjgood`, {
  handler() {
    internalOutput(this.output, unit => setup.Text.Unit.Trait.adjectiveGoodRandom(unit), this.args[0]);
  }
});
Macro.add(`uadjbad`, {
  handler() {
    internalOutput(this.output, unit => setup.Text.Unit.Trait.adjectiveBadRandom(unit), this.args[0]);
  }
});
Macro.add(`uadv`, {
  handler() {
    internalOutput(this.output, unit => setup.Text.Banter._getAdverb(unit), this.args[0]);
  }
});
Macro.add(`uadvcare`, {
  handler() {
    internalOutput(this.output, unit => setup.Text.Banter._getAdverb(unit, true), this.args[0]);
  }
});
Macro.add(`uadvabuse`, {
  handler() {
    internalOutput(this.output, unit => setup.Text.Banter._getAdverb(unit, false, true), this.args[0]);
  }
});

Macro.add(`ustriptorso`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Equipment.stripTorso, this.args[0]);
  }
});
Macro.add(`ustriplegs`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Equipment.stripLegs, this.args[0]);
  }
});
Macro.add(`ustripanus`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Equipment.stripAnus, this.args[0]);
  }
});
Macro.add(`ustripgenital`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Equipment.stripGenital, this.args[0]);
  }
});
Macro.add(`ustripvagina`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Equipment.stripVagina, this.args[0]);
  }
});
Macro.add(`ustripdick`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Equipment.stripDick, this.args[0]);
  }
});
Macro.add(`ustripnipple`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Equipment.stripNipple, this.args[0]);
  }
});
Macro.add(`ustripmouth`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Equipment.stripMouth, this.args[0]);
  }
});
Macro.add(`uslaverstripall`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Equipment.slaverStripAll, this.args[0]);
  }
});

Macro.add(`uyoustripanus`, {
  handler() {
    internalOutput(this.output, setup.Text.Unit.Equipment.youStripAnus, this.args[0]);
  }
});

Macro.add(`upunishreason`, {
  handler() {
    internalOutput(this.output, setup.Text.Punish.punishreason, this.args[0]);
  }
});

Macro.add(`uneedrescue`, {
  handler() {
    internalOutput(this.output, setup.Text.Rescue.needrescue, this.args[0]);
  }
});

Macro.add(`urescuenow`, {
  handler() {
    internalOutput(this.output, setup.Text.Rescue.rescueNow, this.args[0]);
  }
});

Macro.add(`upraisenoun`, {
  handler() {
    internalOutput(this.output, setup.Text.Praise.noun, this.args[0]);
  }
});

Macro.add(`uinsultnoun`, {
  handler() {
    internalOutput(this.output, setup.Text.Insult.noun, this.args[0]);
  }
});

Macro.add(`upetwhine`, {
  handler() {
    internalOutput(this.output, setup.Text.Pet.whine, this.args[0]);
  }
});

Macro.add(`uhobbyverb`, {
  handler() {
    internalOutput(this.output, setup.Text.Hobby.verb, this.args[0]);
  }
});

Macro.add(`ustripverb`, {
  handler() {
    internalOutput(
      this.output,
      (unit) => setup.Text.Strip.verb(unit, this.args[1]),
      this.args[0],
    );
  }
});

Macro.add(`ustripshirtand`, {
  handler() {
    internalOutput(this.output, setup.Text.Strip.takeoffshirtand, this.args[0]);
  }
});

Macro.add(`ustrippantsand`, {
  handler() {
    internalOutput(this.output, setup.Text.Strip.takeoffpantsand, this.args[0]);
  }
});

Macro.add(`ustripequipmentand`, {
  handler() {
    internalOutput(this.output, setup.Text.Strip.takeoffequipmentand, this.args[0]);
  }
});

Macro.add(`ustripmouthand`, {
  handler() {
    internalOutput(this.output, setup.Text.Strip.takeoffmouthand, this.args[0]);
  }
});

Macro.add(`ustripeyesand`, {
  handler() {
    internalOutput(this.output, setup.Text.Strip.takeoffeyesand, this.args[0]);
  }
});

Macro.add(`ustripanusand`, {
  handler() {
    internalOutput(this.output, setup.Text.Strip.takeoffanusand, this.args[0]);
  }
});

Macro.add(`ustripgenitaland`, {
  handler() {
    internalOutput(this.output, setup.Text.Strip.takeoffgenitaland, this.args[0]);
  }
});

Macro.add(`unickname`, {
  handler() {
    internalOutputUnitTarget(this.output, setup.Text.Greeting.nickname, this.args[0], this.args[1]);
  }
});

Macro.add(`unicknamebad`, {
  handler() {
    internalOutputUnitTarget(this.output, setup.Text.Greeting.nicknamebad, this.args[0], this.args[1]);
  }
});

Macro.add(`ugreetingshort`, {
  handler() {
    internalOutputUnitTarget(this.output, setup.Text.Greeting.short, this.args[0], this.args[1]);
  }
});

Macro.add(`ugreetingfull`, {
  handler() {
    internalOutputUnitTarget(this.output, setup.Text.Greeting.full, this.args[0], this.args[1]);
  }
});

Macro.add(`ubusyshort`, {
  handler() {
    internalOutputUnitTarget(this.output, setup.Text.Greeting.busyshort, this.args[0], this.args[1]);
  }
});

Macro.add(`uyesmaster`, {
  handler() {
    internalOutputUnitTarget(this.output, setup.Text.Slave.yesmaster, this.args[0], this.args[1]);
  }
});
