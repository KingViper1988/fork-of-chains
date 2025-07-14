// @ts-nocheck

// Hoặc là: "trong tòa nhà của bạn" hoặc "một khi bạn xây một tòa nhà"
/**
 * 
 * @param {setup.BuildingTemplate | string} building_template
 * @returns {string}
 */
setup.Text.Building.inYourBuilding = function(building_template) {
  let t
  const rep = setup.selfOrObject(building_template, setup.buildingtemplate).rep()
  if (State.variables.fort.player.isHasBuilding(building_template)) {
    t = [
      `trong ${rep} của bạn`,
      `thông qua ${rep} của bạn`,
    ]
  } else {
    t = [
      `một khi bạn xây dựng ${rep}`,
      `sau khi bạn xây dựng ${rep}`,
    ]
  }
  return setup.rng.choice(t)
}
