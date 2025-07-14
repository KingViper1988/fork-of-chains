// @ts-nocheck

/*
  <<inyourbuilding 'bazaar'>>: "trong khu chợ của bạn", hoặc "một khi bạn xây một khu chợ"
*/

Macro.add('inyourbuilding', { handler() {
  this.output.append(setup.DOM.Util.twine(setup.Text.Building.inYourBuilding(this.args[0])))
} });
