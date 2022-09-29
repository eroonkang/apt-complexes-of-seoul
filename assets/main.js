jQuery(function() {

d3.tsv("data.tsv", function (d) {
  console.log(d.length);
  var rows = getRandom(1, d.length - 1, 3);
  print(d, rows);
});

function print(data, rows) {
  var cols = 3;
  var words = [];
  var offset = 0;
  var thisOffset = [];
  var speed = 50;

  for (i = 0; i < cols; i++) {
    var row = rows[i];
    // setup html structure
    var html ="";
    html += '  <div class="apt apt-' + i + '" style="width:' + 100/(cols) + 'vw;">';
    html += '    <div class="story">';
    html += '      <div class="header t-s">#' + row + ' ' + data[row]['aptName'] + '</div>';
    html += '      <div class="text story-' + i + ' t-m"></div>';
    html += '    </div>';
    html += '    <div class="footer t-s">';
    html += '      <div>' + data[row]['address_gu'] + ' ' + data[row]['address_dong'] + ' ' + data[row]['address_street'] + ', ' + data[row]['units'] + '세대, ' + data[row]['year_approval'] + '년</div>';
    html += '    </div>';
    html += '    <div class="progress"></div>';
    html += '  </div>';
    $('.wrapper').append(html);

    // append words into .story div
    words[i] = data[row]['result'].split(/\s+/);
    var spans = '<span>' + words[i].join(' </span><span>') + '</span>';

    // determine right offset time
    if (i == 0) {
      thisOffset[i] = 0;
    } else {
      thisOffset[i] = words[i-1].length * speed;
    }
    offset += thisOffset[i];

    $(spans).hide().appendTo($(".story-" + i)).each(function(j) {
      $(this).delay(speed * j + offset).fadeIn(100);
    });
  }
}

function getRandom(min, max, howMany){
  var a = new Array();
  while (a.length < howMany) {
      var n = Math.floor(Math.random() * (max - min) + 0.5) + min;
      if (a.indexOf(n) == -1) {
          a.push(n);
      }
  }
  return a;
}

});