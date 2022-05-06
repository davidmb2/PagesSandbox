(function () {
  var file = file || "README.md";
  var file2 = file2 || "FirstDocument.md";
  var reader = new stmd.DocParser();
  var writer = new stmd.HtmlRenderer();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
      display(xhr);
    }
  };

  function display(xhr) {
    var parsed = reader.parse(xhr.responseText);
    var content = writer.renderBlock(parsed);
    document.getElementsByTagName('body')[0].innerHTML = content;

    /* try to extract h1 title and use as title for page
       if no h1, use name of file
    */
    try {
      document.title = document.querySelector('h1').textContent
    } catch (e) {
      document.title = file;
    }
  }

  try {
    document.title = document.querySelector('h1').textContent
  } catch (e) {
    document.title = file2;
  }
  }

  xhr.open('GET', file);
  xhr.open('GET', file2);
  xhr.send();
})();
