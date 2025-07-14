// @ts-nocheck

/*
  <<bantertext banter>>: hiển thị đoạn đối thoại ngẫu nhiên
*/

Macro.add('missingunitquest', { handler() {
  this.output.append(html`
    ${setup.DOM.Text.danger('Đơn vị cần thiết để hoàn thành nhiệm vụ này không còn tồn tại.')}
    Nhiệm vụ này không thể hoàn thành được nữa. Bạn nên xóa nhiệm vụ này đi.
  `)
} });
