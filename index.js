const parseLineString = (string) => {
  let geoTags = [];
  string = string.replace(/\)/gm, "").replace(/\(/gm, "").replace(/LINESTRING/gm, "");

  string.split(",").forEach((item, i) => {
    let arr = item.split(" ");

    geoTags.push({
      lat: parseFloat(arr[0]),
      lon: parseFloat(arr[1])
    });
  });

  return geoTags;
}
const routeToArray = (data) => {
  let forward = data.result.items[0].directions[0].geometry.selection;
  let backward = data.result.items[0].directions[1].geometry.selection;

  return {
    forward: parseLineString(forward),
    backward: parseLineString(backward)
  }
}

module.exports = routeToArray;
