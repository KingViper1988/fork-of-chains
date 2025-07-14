// @ts-nocheck

/*
  Các macro về tình bạn:

  <<tfriendtitle friendshipamt>>: đối thủ, bạn bè, v.v. dựa trên số điểm
  <<tfriendslave friendshipamt>>: sợ hãi, tận tụy với, v.v. dựa trên số điểm
*/

export function getFriendTitle(amt) {
  if (amt == -1000) return 'kẻ thù không đội trời chung'
  if (amt <= -900) return 'đối thủ lớn'
  if (amt <= -500) return 'đối thủ'
  if (amt <= -300) return 'đối thủ cạnh tranh'
  if (amt <= -150) return 'đối thủ nhỏ'
  if (amt < 150) return 'người quen'
  if (amt < 300) return 'bạn bè xa'
  if (amt < 500) return 'bạn bè'
  if (amt < 900) return 'bạn đồng hành'
  if (amt < 1000) return 'bạn tâm giao'
  return 'bạn thân nhất'
}

export function getFriendSlaveTitle(amt) {
  if (amt == -1000) return 'khiếp sợ'
  if (amt <= -900) return 'sợ hãi'
  if (amt <= -500) return 'kính trọng'
  if (amt <= -300) return 'lo sợ'
  if (amt <= -150) return 'hơi kính trọng'
  if (amt < 150) return 'thờ ơ với'
  if (amt < 300) return 'hơi tin tưởng'
  if (amt < 500) return 'trung thành với'
  if (amt < 900) return 'tận tụy với'
  if (amt < 1000) return 'gắn bó với'
  return 'hoàn toàn gắn bó với'
}

/**
 * @param {setup.Unit} unit1 
 * @param {setup.Unit} unit2 
 * @returns {string}
 */
export function getFriend(unit1, unit2) {
  if (unit1.getLover() == unit2) {
    return 'người tình'
  }
  let friendship = State.variables.friendship.getFriendship(unit1, unit2)
  return getFriendTitle(friendship)
}

// lấy người tình / anh chị em / bạn bè / ''
const getRel = (unit1, unit2) => {
  if (unit1.getLover() == unit2) return 'người tình'
  let relation = State.variables.family.getRelation(unit2, unit1)
  if (relation) {
    return relation.rep()
  } else {
    if (unit1.isSlave() || unit2.isSlave()) return ''
    let friendship = State.variables.friendship.getFriendship(unit1, unit2)
    if (friendship > -200 && friendship < 200) return ''
    return getFriend(unit1, unit2)
  }
}

// unit1 và <<utheirrel>> unit2. (có thể trống)
const getTheirRel = (unit1, unit2) => {
  let rel = getRel(unit1, unit2)
  if (!rel) return ''
  return `<<their "${unit1.key}">> ${rel}`
}

// <<unamerel unit1 unit2>> trở thành anh trai của unit1 là unit2
const getNameRel = (unit1, unit2) => {
  let rel = getRel(unit1, unit2)
  if (!rel) return ''
  return `${unit1.rep()} ${rel}`
}

function internalOutput(output, func, ...params) {
  output.appendChild(document.createTextNode(func(...params)))
}

const wikiOutput = (output, func, ...params) => {
  let wrapper = $(document.createElement('span'))
  wrapper.wiki(func(...params))
  wrapper.appendTo(output)
};

Macro.add('tfriendtitle', { handler() {
  internalOutput(this.output, getFriendTitle, ...this.args);
} });
Macro.add('tfriendslave', { handler() {
  internalOutput(this.output, getFriendSlaveTitle, ...this.args);
} });

Macro.add('ufriend', { handler() {
  internalOutput(this.output, getFriend, ...this.args);
} });

Macro.add('utheirrel', { handler() {
  wikiOutput(this.output, getTheirRel, ...this.args);
} });
Macro.add('unamerel', { handler() {
  wikiOutput(this.output, getNameRel, ...this.args);
} });
