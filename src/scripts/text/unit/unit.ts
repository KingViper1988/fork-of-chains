// @ts-nocheck


setup.Text.genital = function(unit) {
  if (unit.isHasTrait(setup.trait.dick_huge)) {
    return 'dương vật khổng lồ'
  }
  if (unit.isHasTrait(setup.trait.dick_small)) {
    return 'dương vật'
  }
  if (unit.isHasTrait(setup.trait.dick_tiny)) {
    return 'dương vật nhỏ'
  }
  if (unit.isHasTrait(setup.trait.breast_huge)) {
    return 'cặp vú khổng lồ'
  }
  if (unit.isHasTrait(setup.trait.breast_small)) {
    return 'cặp vú'
  }
  if (unit.isHasTrait(setup.trait.breast_tiny)) {
    return 'cặp vú nhỏ'
  }
  if (unit.isHasTrait(setup.trait.vagina_tight)) {
    return 'âm đạo'
  }
  return 'hậu môn'
}
