// @ts-nocheck

/**
 * @param {setup.Unit} unit 
 */
setup.Text.Unit.background = function (unit) {
  let backgrounds = unit.getTraits().filter(trait => trait.getTags().includes('bg'))
  if (!backgrounds.length) {
    return setup.Text.replaceUnitMacros([
      `a|Rep a|have không có xuất thân rõ ràng.`,
      `a|Rep a|have không có xuất thân nào mà bạn biết.`,
    ], { a: unit })
  }
  const race = unit.getRace()
  const subrace = unit.getSubrace()
  let job = unit.getJob()

  let texts = []
  for (let i = 0; i < backgrounds.length; ++i) {
    let bg = backgrounds[i]
    let basetext = null
    let slavertext = null
    let slavetext = null
    // trước khi trở thành chủ nô, đơn vị xxx
    // Đơn vị này cũng đã có một nghề khác trước khi làm nô lệ: đơn vị này cũng
    if (bg == setup.trait.bg_farmer) {
      basetext = `xuất thân từ một vùng nông thôn nơi a|they trồng trọt rau màu\
      cũng như chăn nuôi gia súc`
      slavertext = `Vì con người xét cho cùng cũng là động vật, một vài kỹ năng này chắc chắn sẽ\
      có ích trong sự nghiệp chủ nô`
      slavetext = `Bây giờ a|they hẳn đã hiểu được cảm giác của những con vật dưới sự chăm sóc của a|their`
    } else if (bg == setup.trait.bg_noble) {
      basetext = `từng sống trong sự xa hoa tương đối và được chu cấp đầy đủ.\
      Kết quả là, a|rep nhận được nền giáo dục tốt hơn hầu hết những người khác cũng như một số huấn luyện võ thuật`
      slavetext = `Bây giờ a|They nên sử dụng nền giáo dục tốt hơn của a|their để nhanh chóng học cách trở thành một nô lệ tốt`
    } else if (bg == setup.trait.bg_slave) {
      basetext = `chưa bao giờ biết đến ý nghĩa của việc là một a|race tự do`
      slavertext = `Giờ đây tình thế đã đảo ngược, a|they a|is đang mong chờ được cầm roi`
      slavetext = `Và a|they có lẽ sẽ không bao giờ học được điều đó`
    } else if (bg == setup.trait.bg_monk) {
      basetext = `rèn luyện thân thể và tinh thần trong sự cô độc`
      if (unit.isHasTrait('muscle_strong')) {
        slavetext = `Chắc chắn là định mệnh đã cho cơ thể cường tráng của a|their giờ đây được bạn tự do xem xét`
        slavertext = `a|Rep mạnh cả về tinh thần lẫn thể chất, chắc chắn là một lợi thế cho một đoàn nô lệ như thế này`
      } else {
        slavetext = `Mặc dù nhìn vào cơ thể a|their bây giờ, bạn không chắc liệu a|they có còn nhớ bất cứ điều gì từ quá trình luyện tập của a|their không`
        slavertext = `Mặc dù nhìn vào cơ thể a|their bây giờ, bạn không chắc liệu a|they có còn nhớ bất cứ điều gì từ quá trình luyện tập của a|their không`
      }
    } else if (bg == setup.trait.bg_mercenary) {
      basetext = `a|was là một phần của một nhóm lính đánh thuê và đi khắp nơi để theo đuổi vàng bạc.\
      Xuất thân như vậy mang lại cho a|rep nhiều kinh nghiệm chiến đấu`
      slavetext = `Có lẽ a|rep sẽ trở thành một nô lệ chiến đấu xuất sắc để bạn giải trí`
    } else if (bg == setup.trait.bg_pirate) {
      basetext = `sống trên biển săn mồi những nạn nhân không ngờ và các tàu buôn.\
      a|Rep không lạ gì việc bắt làm nô lệ bất cứ ai trên những con tàu a|they từng đột kích`
      slavetext = `Tình thế đã đảo ngược thế nào khi giờ đây a|rep không là gì ngoài nô lệ của bạn`
    } else if (bg == setup.trait.bg_thief) {
      if (subrace == setup.trait.subrace_humankingdom) {
        basetext = `kiếm sống bằng nghề móc túi người dân trên khắp Thành phố Lucgate`
      } else {
        basetext = `kiếm sống bằng cách đột nhập và trộm cắp từ nhà của người dân trên khắp vùng đất gần đó`
      }
      slavertext = `a|Rep có những ngón tay nhanh nhẹn đầy kinh nghiệm, chắc chắn hữu ích trong sự nghiệp buôn bán nô lệ`
      slavetext = `Nhưng có vẻ như nghiệp chướng đã báo ứng cho tội ác của a|their`
    } else if (bg == setup.trait.bg_mystic) {
      let magics = unit.getTraits().filter(trait => trait.getTags().includes('magic'))
      if (!magics.length) {
        basetext = `a|was một người thực hành ma thuật nói chung mà không chuyên về bất kỳ lĩnh vực nào`
      } else if (magics.length == 2) {
        basetext = `a|was một thiên tài thực hành ma thuật có năng khiếu trong nhiều lĩnh vực ma thuật`
      } else {
        basetext = `a|was một người thực hành ma thuật chuyên về lĩnh vực ${magics[0].rep()}`
      }
      slavertext = `Điều này mang lại cho a|rep một sự tương thích với bí thuật, điều này chắc chắn sẽ giúp ích cho sự nghiệp buôn bán nô lệ của a|their`
      slavetext = `Bạn phải cẩn thận khi ở gần nô lệ này cho đến khi được huấn luyện đúng cách`
    } else if (bg == setup.trait.bg_apprentice) {
      let magics = unit.getTraits().filter(trait => trait.getTags().includes('magic'))
      if (!magics.length) {
        basetext = `a|was một sinh viên đang cố gắng làm chủ ma thuật nói chung mà không chuyên về bất kỳ lĩnh vực nào`
      } else if (magics.length == 2) {
        basetext = `a|was một sinh viên ma thuật tài năng vẫn chưa phát huy hết tiềm năng thực sự của a|their`
      } else {
        basetext = `a|was một pháp sư tập sự của ${magics[0].rep()}`
      }
      slavertext = `Điều này mang lại cho a|rep một sự tương thích mạnh mẽ hơn với bí thuật so với những người khác, nếu được làm chủ chắc chắn sẽ thúc đẩy sự nghiệp buôn bán nô lệ của a|their`
      slavetext = `Có thể bạn có thể tiếp tục việc huấn luyện ma thuật của a|their một khi nô lệ này đã ngoan ngoãn`
    } else if (bg == setup.trait.bg_hunter) {
      if ([
        setup.trait.race_human,
        setup.trait.race_wolfkin,
        setup.trait.race_catkin,
        setup.trait.race_elf].includes(race)) {
        basetext = `sống bằng nghề săn bắn các loài động vật hoang dã trong các khu rừng xung quanh`
      } else if (race == setup.trait.race_greenskin || subrace == setup.trait.subrace_humandesert) {
        basetext = `sống bằng nghề săn bắn các loài động vật hoang dã khan hiếm ở các sa mạc phía đông`
      } else {
        basetext = `sống bằng nghề săn bắn các loài động vật kỳ lạ ngoài khơi các vùng biển phía nam`
      }
      slavertext = `Kỹ năng săn bắn động vật của a|Their chắc chắn sẽ có ích bây giờ khi a|they săn những con vật nguy hiểm nhất`
      slavetext = `Nhưng kẻ đi săn đã trở thành con mồi và giờ phải sống trong lồng trong đoàn của bạn`
    } else if (bg == setup.trait.bg_priest) {
      basetext = `cống hiến thân thể và tâm hồn của a|their cho các đấng tối cao`
      slavertext = `a|They hẳn đã cuối cùng thấy mình vỡ mộng với ý tưởng đó để quay ngoắt 180 độ và trở thành một chủ nô.\
      Một linh mục có thể không phải là lựa chọn truyền thống của bạn cho một chủ nô, nhưng không ai có thể phủ nhận rằng a|rep chữa lành tốt hơn hầu hết`
      slavetext = `Và bây giờ a|they được định mệnh để cống hiến tâm hồn và đặc biệt là cơ thể của a|their cho chủ nhân của a|their`
    } else if (bg == setup.trait.bg_whore) {
      basetext = `theo truyền thống cổ xưa là bán chính cơ thể của a|their để kiếm lời`
      if (unit.isHasTrait(setup.trait.per_lustful) || unit.isMasochistic()) {
        basetext = `${basetext}.\
        Trong khi hầu hết sẽ kinh hoàng trước ý tưởng này, a|rep dường như đã thích\
        nghề nghiệp trước đây của a|their quá nhiều..`
        slavetext = 'Có lẽ đây là thứ bạn gọi là một con điếm bẩm sinh'
        slavertext = 'Có lẽ sự dâm đãng này có thể hữu ích cho sự nghiệp chủ nô?'
      } else {
        slavertext = `${basetext}.\
        a|Rep đã rất vui khi chôn vùi quá khứ của a|their và bắt đầu lại với tư cách là một chủ nô`
        slavetext = `Bạn có phần hy vọng a|they có thể tiếp tục bán thân và kiếm tiền cho bạn, nhưng không may là bạn không điều hành một nhà thổ`
      }
    } else if (bg == setup.trait.bg_courtesan) {
      basetext = `giải trí cho những khách hàng giàu có nhất bằng cơ thể của a|their`
      if (unit.isHasTrait(setup.trait.per_lustful) || unit.isMasochistic()) {
        basetext = `${basetext}.\
        Trong khi hầu hết các kỹ nữ có xu hướng giả vờ thích thú,\
        a|Rep dường như thực sự tận hưởng sự suy đồi.`
        slavetext = 'Có lẽ đây là thứ bạn gọi là một con điếm bẩm sinh'
        slavertext = 'Có lẽ sự dâm đãng này có thể hữu ích cho sự nghiệp chủ nô?'
      } else {
        slavertext = `${basetext}.\
        a|Rep sẽ phải học cách sử dụng sự quyến rũ và cơ thể của a|their vì lợi ích của đoàn của bạn`
        slavetext = `Có lẽ đây là một cơ hội hiếm có để bạn tận dụng một con điếm cao cấp như vậy`
      }
    } else if (bg == setup.trait.bg_laborer) {
      basetext = `làm bất cứ công việc nặng nhọc nào có sẵn xung quanh nơi a|they sống, có thể là khai thác mỏ, khai thác đá, hoặc chỉ di chuyển đồ vật.\
      Kinh nghiệm đã làm cho ${job.getName().toLowerCase()} mạnh hơn hầu hết mọi người,\
      đó luôn là một đặc điểm tốt để có ở ${setup.Article(job.getName().toLowerCase())}`
    } else if (bg == setup.trait.bg_merchant) {
      basetext = `kiếm được nhiều lợi nhuận từ việc mua rẻ bán đắt`
      slavertext = `a|Rep là một a|race bạn có thể tin tưởng giao tiền bạc của mình`
    } else if (bg == setup.trait.bg_soldier) {
      if (race == setup.trait.race_lizardkin) {
        basetext = `từng là một phần của một đội quân a|race đáng sợ, tàn phá vùng đất của các chủng tộc khác để tìm kho báu`
        slavertext = `Bây giờ a|they là chủ nhân của chính a|their và cuối cùng có thể chiến đấu cho a|themself và giành được kho báu của riêng a|their`
        slavetext = `Có một chiến binh a|race mạnh mẽ như vậy làm nô lệ của bạn là một kỳ công thực sự đáng kinh ngạc cho bản thân và đoàn của bạn`
      } else {
        basetext = `chiến đấu như một phần của một đội quân mà không thực sự biết tại sao`
        slavertext = `Bây giờ a|they là chủ nhân của chính a|their và cuối cùng có thể chiến đấu cho a|themself`
        slavetext = `Ít nhất dưới sự quản lý của bạn, cơ thể và các lỗ của a|their sẽ được tận dụng tốt`
      }
    } else if (bg == setup.trait.bg_wildman) {
      basetext = `sống hoang dã với ít văn hóa ở ${setup.Text.Race.region(subrace)}`
      slavetext = `a|They hẳn là một con vật thú vị để thuần hóa`
    } else if (bg == setup.trait.bg_nomad) {
      if (race == setup.trait.race_greenskin) {
        basetext = `sống trong một trong những trại của orc và theo quân đội đi bất cứ đâu`
      } else {
        basetext = `sống nay đây mai đó ở ${setup.Text.Race.region(subrace)} mà không định cư ở bất kỳ nơi nào,\
        điều này khiến a|them đặc biệt cứng cỏi`
      }
    } else if (bg == setup.trait.bg_raider) {
      basetext = `đột kích các khu định cư gần ${setup.Text.Race.region(subrace)}, cướp bóc các trại và hãm hiếp người dân của họ`
      slavetext = `Đoàn của bạn chứng tỏ là những kẻ cướp bóc giỏi hơn khi sự nghiệp cướp bóc của a|them bị cắt ngắn\
      để bắt đầu sự nghiệp nô lệ mới của a|their`
      slavertext = `Kinh nghiệm của a|Their gần như hoàn toàn phù hợp với loại kinh nghiệm\
      mà đoàn của bạn đang tìm kiếm, khiến a|them rất phù hợp với vị trí chủ nô`
    } else if (bg == setup.trait.bg_adventurer) {
      if (race == setup.trait.race_lizardkin) {
        basetext = `rời bỏ anh em a|race của a|their để đi phiêu lưu tìm kiếm hậu cung và kho báu`
      } else {
        basetext = `đi khắp nơi tìm kiếm xác thịt và phiêu lưu`
      }
      slavetext = `Bạn tự hỏi liệu a|they có nghĩ rằng làm nô lệ chỉ là một phần nhỏ của cuộc phiêu lưu`
      slavertext = `Đó là, cho đến khi a|they nhận ra rằng làm chủ nô là một con đường tắt để có được phần xác thịt`
    } else if (bg == setup.trait.bg_entertainer) {
      basetext = `kiếm sống bằng việc giải trí cho cả giới quý tộc và thường dân`
      if (unit.isHasTrait(setup.trait.skill_entertain)) {
        basetext = `${basetext}. a|Rep đặc biệt giỏi trong công việc của a|their và nổi tiếng trong một số giới`
      }
      slavetext = `Mô tả công việc không thực sự thay đổi bây giờ khi a|they là một nô lệ, ngoại trừ có thể là lao động nặng nhọc thêm mà chủ nhân có thể yêu cầu`
      slavertext = `Khả năng giải trí chắc chắn sẽ hữu ích trong sự nghiệp mới của a|their với tư cách là một chủ nô`
    } else if (bg == setup.trait.bg_mist) {
      basetext = `a|was một du khách thường xuyên giữa thế giới này và thế giới tiếp theo`
      slavetext = `Sở hữu một nô lệ có nguồn gốc bí ẩn như vậy mang lại cho bạn một cảm giác quyền lực kỳ lạ và trụy lạc`
      slavertext = `Có một chủ nô có nguồn gốc khác thường như vậy đôi khi khiến bạn rùng mình trong đêm`
    } else if (bg == setup.trait.bg_knight) {
      basetext = `a|was được đào tạo về nghệ thuật hiệp sĩ để bảo vệ kẻ yếu và tiêu diệt cái ác`
      slavetext = `Có một a|race của một công việc được đánh giá cao như vậy làm nô lệ mang lại cho bạn một cảm giác thỏa mãn, và bạn không thể chờ đợi để đùa giỡn với a|rep thêm nữa sau này`
      slavertext = `Trở thành một chủ nô có lẽ là điều xa vời nhất mà một hiệp sĩ có thể đi chệch khỏi con đường của a|their`
    } else if (bg == setup.trait.bg_healer) {
      basetext = `a|was một người chữa bệnh tận tụy làm dịu bệnh tật của người dân a|their`
      slavertext = `Với những nguy hiểm mà đoàn của bạn phải đối mặt hàng ngày, có một chủ nô có năng khiếu về nghệ thuật chữa bệnh phải là một phước lành`
      slavetext = `Với sự huấn luyện phù hợp, có lẽ bạn có thể dạy a|them chữa bệnh không chỉ bằng tinh thần mà còn bằng cơ thể của a|their`
    } else if (bg == setup.trait.bg_foodworker) {
      basetext = `làm việc trong ngành công nghiệp thực phẩm nuôi sống dạ dày của mọi người`
      slavertext = `Bạn sẽ ghi nhớ a|rep nếu một ngày nào đó đoàn của bạn cần một đầu bếp`
      if (unit.isHasTrait(setup.trait.dick_tiny)) {
        slavetext = `Việc a|Rep thay đổi công việc thành chủ nô có nghĩa là bây giờ họ cũng cần phải tự sản xuất nhiều "sữa" tươi a|themself`
      } else if (unit.isHasTrait(setup.trait.breast_tiny)) {
        slavetext = `Việc a|Rep thay đổi công việc thành chủ nô có nghĩa là bây giờ họ cũng cần phải tự sản xuất nhiều "sữa" tươi a|themself`
      }
    } else if (bg == setup.trait.bg_wiseman) {
      basetext = `đưa ra những lời khuyên khôn ngoan cho cộng đồng của a|their`
    } else if (bg == setup.trait.bg_slaver) {
      basetext = `từng quen với việc mua bán và bán lại người khác`
      slavertext = `a|They sẽ cảm thấy như ở nhà trong đoàn chủ nô của bạn`
      slavetext = `Đó là một cảm giác tốt đẹp kỳ lạ khi biết rằng đoàn của bạn đã đánh bại một chủ nô khác và biến a|them thành nô lệ của bạn`
    } else if (bg == setup.trait.bg_engineer) {
      basetext = `nổi tiếng rộng rãi về năng lực thiết kế và chế tạo các máy móc và công trình phức tạp`
      slavertext = `Mặc dù a|they có kiến thức vô song trong lĩnh vực của a|their, a|rep lại có ác cảm nghiêm trọng với ma thuật`
      slavetext = `Một số kỹ năng khiến nô lệ trở nên cực kỳ có giá trị, đặc biệt là trên thị trường phù hợp`
    } else if (bg == setup.trait.bg_unemployed) {
      basetext = `không có việc gì để làm, và chủ yếu sống bằng lòng tốt của người khác`
      slavertext = `Chủ nô là công việc đầu tiên hẳn phải khá thú vị đối với a|race`
      slavetext = `Bạn phải tự hỏi liệu làm nô lệ có được coi là một công việc không`
    } else if (bg == setup.trait.bg_artisan) {
      basetext = `a|was một nghệ nhân lành nghề có khả năng chế tạo các công cụ, đồ mặc và đồ chơi tình dục khác nhau`
      slavertext = `Bạn thỉnh thoảng thấy a|race tự chế tạo đồ chơi tình dục và đồ kiềm chế\
      để sử dụng trên các nô lệ`
    } else if (bg == setup.trait.bg_seaman) {
      basetext = `đi biển và sống nhờ những sản vật của biển cả`
      slavetext = `May mắn cho bạn, a|they đã đi nhầm 'chiến lợi phẩm' và cuối cùng trở thành nô lệ của bạn`
      slavertext = `Đừng lo, bạn chắc chắn rằng sẽ có cơ hội để a|them ra khơi trở lại như một phần công việc trong đoàn của bạn`
    } else if (bg == setup.trait.bg_woodsman) {
      basetext = `sống nhờ những sản vật của rừng, có thể là gỗ, trái cây, hoặc động vật hoang dã`
    } else if (bg == setup.trait.bg_clerk) {
      basetext = `xử lý vô số giấy tờ hàng ngày`
      slavetext = `Bạn tự hỏi liệu làm nô lệ cho ý muốn của bạn có tốt hơn làm nô lệ cho giấy tờ không`
      slavertext = `a|Rep chắc chắn biết ơn sự thay đổi nghề nghiệp, một nghề sống động hơn nhiều so với nghề a|they quen thuộc`
    } else if (bg == setup.trait.bg_scholar) {
      basetext = `am hiểu về một loạt các lĩnh vực`
      slavetext = `Bạn chắc chắn có thể tận dụng một nô lệ có kiến thức để quản lý đoàn của mình`
      slavertext = `Bạn chắc chắn có thể tin tưởng vào a|them nếu bạn cần biết bất cứ điều gì`
    } else if (bg == setup.trait.bg_thug) {
      basetext = `hành hung người khác để kiếm sống`
      slavetext = `Và bây giờ không còn lại gì của nô lệ khi tình thế đã đảo ngược`
      slavertext = `a|They chắc chắn sẽ rất tự nhiên khi hành hung các nô lệ`
    } else if (bg == setup.trait.bg_mythical) {
      basetext = `được tôn thờ như một sinh vật thần thoại giống như các vị thần`
      slavetext = `Một nô lệ tuyệt vời như vậy trong tay bạn khiến bạn cảm thấy lâng lâng bên trong`
      slavertext = `Bạn thề rằng bạn thỉnh thoảng thấy những con bướm bay lượn quanh a|race`
    } else if (bg == setup.trait.bg_royal) {
      basetext = `a|was một thành viên của hoàng gia cai trị vùng đất của họ`
      slavetext = `Bạn đã luôn mơ ước được chịch hoàng gia, và bây giờ bạn có thể biến giấc mơ thành hiện thực`
      slavertext = `a|They hiện đang xem công việc chủ nô hiện tại của a|their như một kỳ nghỉ khỏi cuộc sống đơn điệu của a|their`
    } else if (bg == setup.trait.bg_boss) {
      basetext = `a|was một thành viên có ảnh hưởng lớn trong thế giới ngầm tội phạm`
      slavetext = `Chắc chắn bọn côn đồ của a|their đang bận rộn cố gắng giải cứu ông chủ của a|their ngay bây giờ`
      slavertext = `Và a|they có lẽ vẫn vậy -- Thỉnh thoảng a|race khiến bạn vô cùng bất an`
    } else if (bg == setup.trait.bg_maid) {
      basetext = `giữ cho ngôi nhà ấm áp và sạch sẽ`
      slavetext = `Một người hầu gái bẩm sinh, nếu bạn tự nói như vậy`
    } else if (bg == setup.trait.bg_informer) {
      basetext = `buôn bán thông tin cả công khai và ngầm`
      slavetext = `Có lẽ a|they thậm chí còn có một kế hoạch dự phòng khi a|they bị bắt làm nô lệ`
      slavertext = `Một kẻ lừa đảo gian xảo, hoàn hảo cho đoàn của bạn`
    } else if (bg == setup.trait.bg_assassin) {
      basetext = `đoạt nhiều mạng sống để đổi lấy vàng`
      slavetext = `Bạn phải cẩn thận khi a|they ở gần một nô lệ khác`
      slavertext = `a|They sẽ cần một thời gian để thích nghi từ việc giết người đồng loại sang bắt giữ họ`
    } else if (bg == setup.trait.bg_metalworker) {
      basetext = `a|was nổi tiếng tại địa phương với tư cách là một thợ thủ công bậc thầy về nguồn gốc kim loại`
      slavertext = `a|Their đôi tay chai sạn rất thích hợp để cầm roi`
      slavetext = `Một kỹ năng cực kỳ quý giá để có ở một nô lệ`
    } else if (bg == setup.trait.bg_artist) {
      basetext = `kiếm sống bằng nghề nghệ thuật`
      slavertext = `Có lẽ theo thời gian a|they sẽ coi việc buôn bán nô lệ như một hình thức nghệ thuật cao hơn khác`
      slavetext = `Nô lệ này sẽ hoàn toàn phù hợp với hậu cung của giới quý tộc`
    }

    let text = `${basetext}`
    if (unit.isSlaver() && slavertext) text = `${text} ${slavertext}`
    if (unit.isSlave() && slavetext) text = `${text} ${slavetext}`

    const pretext_slaver = [
      `Trước khi gia nhập đoàn của bạn, a|rep `,
      `Ngoài ra, a|rep cũng `,
      `Nhưng đó không phải là tất cả. Trong quá khứ, a|rep `,
      `Đáng ngạc nhiên, đó vẫn chưa phải là tất cả. a|rep `,
      `Hơn nữa, a|rep `,
    ]

    const pretext_slave = [
      `Trước khi bị đoàn của bạn bắt làm nô lệ, a|rep `,
      `Ngoài ra, a|rep cũng `,
      `Nhưng đó không phải là tất cả. Trong quá khứ, a|rep `,
      `Đáng ngạc nhiên, đó vẫn chưa phải là tất cả. a|rep `,
      `Hơn nữa, a|rep `,
    ]

    let touse = null
    if (unit.isSlaver()) {
      touse = pretext_slaver
    } else {
      touse = pretext_slave
    }

    let idx = Math.min(i, touse.length - 1)
    text = `${touse[idx]} ${text}`
    texts.push(text)
  }
  return setup.Text.replaceUnitMacros(texts.join(' '), { a: unit })
}
