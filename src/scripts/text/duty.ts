// @ts-nocheck


setup.Text.Duty.competence = function (duty) {
  let unit = duty.getAssignedUnit()
  let chance = duty.computeChance()

  // X là <bác sĩ> của bạn, <giá trị trả về>.
  // Bạn thấy <bác sĩ> của bạn đang làm việc chăm chỉ ở đó, <giá trị trả về>.

  let t = ``
  if (duty instanceof setup.DutyInstanceBedchamberSlave) {
    let owner = duty.getBedchamber().getSlaver()
    let friendship = State.variables.friendship.getFriendship(owner, unit)
    if (friendship < -900) {
      t = `hoàn toàn khiếp sợ chủ nhân của a|their là ${owner.rep()}`
    } else if (friendship < -500) {
      t = `bị chủ nhân của a|their là ${owner.rep()} lạm dụng một cách tàn nhẫn`
    } else if (friendship < -200) {
      t = `thường xuyên bị chủ nhân của a|their là ${owner.rep()} lạm dụng`
    } else if (friendship <= 200) {
      t = `bận rộn phục vụ chủ nhân của a|their là ${owner.rep()}, người mà a|they vẫn còn thờ ơ`
    } else if (friendship <= 500) {
      t = `sẵn lòng phục vụ chủ nhân của a|their là ${owner.rep()}`
    } else if (friendship <= 900) {
      t = `hết lòng phục vụ chủ nhân của a|their là ${owner.rep()}`
    } else {
      t = `phục vụ chủ nhân của a|their là ${owner.rep()} một cách mù quáng`
    }
  } else if (duty.TYPE == 'prestige') {
    if (chance < 1) {
      t = `nhưng a|they hoàn toàn không phù hợp với vị trí này`
    } else if (chance < 2) {
      t = `nhưng a|they hầu như không hấp dẫn trong nhiệm vụ được giao của a|their`
    } else if (chance < 4) {
      t = `và a|they là một nô lệ phù hợp cho công việc`
    } else if (chance < 6) {
      t = `và a|they phù hợp với nhiệm vụ nô lệ được giao cho a|them`
    } else if (chance < 8) {
      t = `và bạn đã khôn ngoan chọn đúng nô lệ cho nhiệm vụ này`
    } else if (chance < 10) {
      t = `và a|they rất giỏi trong nhiệm vụ được giao`
    } else {
      t = `và a|they cực kỳ giỏi trong nhiệm vụ được giao`
    }
  } else {
    if (chance < 0.05) {
      t = `nhưng a|they rất tệ trong công việc của a|their và thực sự không hoàn thành được gì`
    } else if (chance < 0.2) {
      t = `mặc dù a|they không có năng lực lắm trong công việc`
    } else if (chance < 0.4) {
      t = `một nhiệm vụ a|they thực hiện khá tốt`
    } else if (chance < 0.6) {
      t = `và a|they khá giỏi trong việc đó`
    } else if (chance < 0.8) {
      t = `--- a|they thậm chí có thể đủ tiêu chuẩn như một chuyên gia nếu a|they muốn`
    } else if (chance < 1.0) {
      t = `và a|they cực kỳ giỏi trong việc đó`
    } else {
      t = `và a|they giỏi một cách phi thường trong việc đó`
    }
  }

  return setup.Text.replaceUnitMacros(t, { a: unit })
}

setup.Text.Duty.slavevalue = function (duty) {
  let prestige = duty.getCurrentPrestige()

  let unit = duty.getAssignedUnit()

  // <giá trị trả về> [động từ] họ.
  // ví dụ, <giá trị trả về> muốn hành hạ họ.
  let t
  if (prestige <= 1) {
    t = `a|They không hấp dẫn và không được huấn luyện tốt, và chỉ có một vài khách hàng`
  } else if (prestige < 3) {
    t = `a|They có sức hấp dẫn khá trung bình cho nhiệm vụ này, và một số khách hàng`
  } else if (prestige < 5) {
    t = `a|They thu hút nhiều khách hàng, những người`
  } else if (prestige < 7) {
    t = `Thường có một hàng dài người xếp hàng, những người`
  } else if (prestige < 9) {
    t = `a|They là một trong những điểm thu hút chính trong pháo đài của bạn và nhiều người`
  } else if (prestige < 11) {
    t = `a|They thu hút nhiều khách hàng từ khắp khu vực đến pháo đài của bạn và nhiều người`
  } else if (prestige < 13) {
    t = `a|They là một nô lệ cực kỳ uy tín đến nỗi bất cứ ai`
  } else if (prestige < 15) {
    t = `a|They có uy tín cao đến nỗi thỉnh thoảng những người nổi tiếng đến pháo đài của bạn và họ`
  } else {
    t = `Có rất ít nô lệ có uy tín như a|they và mọi người`
  }

  return setup.Text.replaceUnitMacros(t, { a: unit })
}
