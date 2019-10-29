var Common = {
  setSplitPaneStyle: function (panel) {
    panel.setDividerWidth(4);
    panel.setDividerBackground("#e1e3e4");
    panel.setDividerOpacity(1);
  },
  setDivPadding: function (node) {
    console.log(node);
    node._dataDiv.className += " padding";
  },
  exportXml: function() {
    var box = network.getElementBox();
    var text = new twaver.XmlSerializer(box).serialize();
    if (twaver.Util.isIE) {
      var iframe = document.createElement('iframe');
      document.body.insertBefore(iframe);
      iframe.style.display = 'none';
      iframe.contentDocument.write(text);
      iframe.contentDocument.execCommand('SaveAs', true, 'file.xml');
      document.body.removeChild(iframe);
    } else {
      var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      blob && saveAs(blob, "network.xml");
    }
    box.clear();
    new twaver.XmlSerializer(box).deserialize(text);

    text = new twaver.JsonSerializer(box).serialize();
    box.clear();
    new twaver.JsonSerializer(box).deserialize(text);

    if (console) {
      console.log(new twaver.JsonSerializer(box).serialize());
    }
  }
}