// @ts-nocheck

/**
 * Thay thế một macro bằng biến thể của đơn vị. Vd: a|their với {a: unit} trở thành <<their "unit.key">>
 * HÃY CẨN THẬN KHÔNG BAO GỒM NHỮNG THỨ LỚN NHƯ IMAGE GLOB (đặc biệt trên bản dựng itch.io)
 * @param {string | string[]} raw_text 
 * @param {Object<string, setup.Unit>} [unit_map]  (nếu trống, sẽ sử dụng các biến trong $g$)
 * @returns {string}
 */
setup.Text.replaceUnitMacros = function (raw_text, unit_map) {
  if (!raw_text) return ''

  /**
   * @type {string}
   */
  let text
  if (Array.isArray(raw_text)) {
    if (!raw_text.length) return ''
    text = setup.rng.choice(raw_text)
  } else {
    text = raw_text
  }
  return text.replace(/([\w]{1,20})\|([\w]{1,20})/g,
    /**
     * @param {any} match 
     * @param {string} unitname 
     * @param {string} unitverb 
     */
    (match, unitname, unitverb) => {
      let unit = null
      if (unit_map) {
        unit = unit_map[unitname]
      } else if (State.variables.g) {
        // U là một trường hợp đặc biệt
        if (unitname == 'U') {
          unit = State.variables.unit.player
        } else {
          unit = State.variables.g[unitname]
        }
      }
      if (!unit || !(unit instanceof setup.Unit)) {
        console.log(`Thiếu đơn vị ${unitname}`)
        return `${unitname}|${unitverb}`
      }

      if (unitverb == 'Rep' || unitverb == 'rep') {
        if (unit.isYou()) {
          if (unitverb == 'Rep') {
            return 'Bạn'
          } else {
            return 'bạn'
          }
        }
        return unit.rep()
      }

      if (unitverb == 'name') {
        return unit.getName()
      }

      if (unitverb == 'Reps' || unitverb == 'reps') {
        if (unit.isYou()) {
          if (unitverb == 'Reps') {
            return 'Của bạn'
          } else {
            return 'của bạn'
          }
        }
        return `${unit.rep()}'s`
      }

      if (unitverb in setup.DOM.PronounYou) {
        return setup.DOM.PronounYou[unitverb](unit)
      }

      if (unitverb in setup.Text.REPLACE_MACROS) {
        let idx = 0
        if (!unit.isYou()) {
          idx = 1
        }
        return setup.Text.REPLACE_MACROS[unitverb][idx]
      }

      const uverb = `u${unitverb}`
      if (Macro.has(uverb)) {
        // đây là một macro bộ phận cơ thể, yikes.
        return setup.runSugarCubeCommandAndGetOutput(
          `<<${uverb} "${unit.key}">>`
        )
      }

      if (unit.isYou()) return unitverb
      if (unitverb.length == 1) return unitverb

      const lowcase = unitverb.toLowerCase()

      // ngược lại thì chuyển sang thì hiện tại
      if (lowcase.endsWith('y')) {
        const lp = lowcase[unitverb.length - 2]
        if (!['a', 'e', 'i', 'o', 'u'].includes(lp)) {
          // thở dài, đến lúc dùng dạng đặc biệt.
          const trm = unitverb[unitverb.length - 1]
          let base = unitverb.substr(0, unitverb.length - 1)
          if (trm.toLowerCase() == trm) {
            base += 'ies'
          } else {
            base += 'IES'
          }
          return base
        }
      }

      for (const ending in setup.Text.END_REPLACE) {
        if (unitverb.endsWith(ending)) {
          return unitverb + setup.Text.END_REPLACE[ending]
        }
      }

      if (unitverb[unitverb.length - 1].toLowerCase() == unitverb[unitverb.length - 1]) {
        return unitverb + 's'
      } else {
        return unitverb + 'S'
      }
    })
}

setup.Text.END_REPLACE = {
  ch: 'es',
  CH: 'ES',
  sh: 'es',
  SH: 'ES',
  s: 'es',
  S: 'ES',
  x: 'es',
  X: 'es',
  z: 'es',
  Z: 'ES',
}

setup.Text.REPLACE_MACROS = {
  is: ['are', 'is'],
  are: ['are', 'is'],
  am: ['are', 'is'],
  was: ['were', 'was'],
  were: ['were', 'was'],
  do: ['do', 'does'],
  go: ['go', 'goes'],
  have: ['have', 'has'],
  has: ['have', 'has'],
}


/**
 * Cho các chuỗi, tạo thành a, b, và c
 * @param {string[]} strings
 * @returns {string}
 */
setup.Text.addCommas = function (strings) {
  let result = ''
  const n = strings.length
  for (let i = 0; i < n; ++i) {
    result += strings[i]
    if (i == 0 && n == 2) {
      result += ' và '
    } else {
      if (n >= 3 && i < n - 1) {
        result += ', '
      }
      if (i == n - 2) {
        result += 'và '
      }
    }
  }
  return result
}

/**
 * Thay thế một macro bằng biến thể rep. Vd: a|rep với {a: furniture} trở thành <<rep furniture>>.
 * @param {string | string[]} raw_text 
 * @param {Object<string, Object>} object_map
 * @returns {string}
 */
setup.Text.replaceRepMacros = function (raw_text, object_map) {
  if (!raw_text) return ''

  /**
   * @type {string}
   */
  let text
  if (Array.isArray(raw_text)) {
    if (!raw_text.length) return ''
    text = setup.rng.choice(raw_text)
  } else {
    text = raw_text
  }

  return text.replace(/([\w]{1,20})\|([\w]{1,20})/g,
    /**
     * @param {any} match 
     * @param {string} unitname 
     * @param {string} unitverb 
     */
    (match, unitname, unitverb) => {
      const obj = object_map[unitname]
      if (!obj) {
        console.log(`Thiếu đối tượng ${unitname}`)
        return `${unitname}|${unitverb}`
      }

      if (unitverb == 'Rep' || unitverb == 'rep') {
        return obj.rep()
      }

      return `${unitname}|${unitverb}`
    })
}

/**
 * Sửa tất cả các lần xuất hiện của mạo từ về dạng đúng trong một câu.
 * Phần kết thúc là câu tiếp theo sau câu này.
 * 
 * @param {string} text 
 * @param {string} ending 
 * @returns {string}
 */
setup.Text.fixArticles = function (text, ending) {
  const splitted = text.match(/\b(\w+\W*)/g)
  if (!splitted) return text

  for (let i = splitted.length - 1; i >= 0; --i) {
    const word_raw = splitted[i]
    const word_parsed = word_raw.match(/\b(\w+)\b/g)[0]
    if (['a', 'A', 'an', 'An'].includes(word_parsed)) {
      let next
      if (i == splitted.length - 1) {
        next = ending || ''
        const next_raw_match = next.match(/\b(\w+)\b/g)
        if (next_raw_match) {
          next = next_raw_match[0] || ''
        } else {
          next = ''
        }
      } else {
        next = splitted[i + 1].match(/\b(\w+)\b/g)[0] || ''
      }
      let article = setup.ArticleOnly(next) || 'a'
      if (word_parsed[0] == 'A') {
        article = article.toUpperFirst()
      }
      splitted[i] = word_raw.replace(/\b(\w+)\b/g, article)
    }
  }

  let i = 0
  return text.replace(/\b(\w+\W+)/g, () => {
    i += 1
    return splitted[i - 1]
  })
}
