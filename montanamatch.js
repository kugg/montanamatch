function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function dist(s, t) {
  if (!s.length || !t.length) return 0;
    return dist(s.slice(2), t.slice(2)) +
      Math.abs(parseInt(s.slice(0, 2), 16) - parseInt(t.slice(0, 2), 16));
}

function closest(arr, str) {
  var min = 0xffffff;
  var best, current, i;
  for (i = 0; i < arr.length; i++) {
    current = dist(arr[i], str)
    if (current < min) {
      min = current
      best = arr[i];
    }
  }
  return best;
}

let dataFile = require('./blk.json');
var colors = [];

for (i=0; i < dataFile.length; i++)
  colors[i] = dataFile[i][0].substr(1);

testData = ["#000000", "#FFFFFF", "#68372B", "#70A4B2",
            "#6F3D86", "#588D43", "#352879", "#B8C76F",
            "#6F4F25", "#433900", "#9A6759", "#444444",
            "#6C6C6C", "#9AD284", "#6C5EB5", "#959595"];
for (i=0; i < testData.length; i++)
  console.log(closest(colors, testData[i].substr(1)));
