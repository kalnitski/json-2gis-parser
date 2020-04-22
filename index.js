/**
 * @author Paul Kalnitski
 * @contact kalnitski@polydev.io
 * @copyright 2019-2020 All rights reserved
 */

const parseLineString = (string) => {
  let geoTags = [];
  string = string.replace(/\)/gm, "").replace(/\(/gm, "").replace(/LINESTRING/gm, "");

  string.split(",").forEach((item, i) => {
    let arr = item.split(" ");

    geoTags.push({
      lat: parseFloat(arr[1]),
      lon: parseFloat(arr[0])
    });
  });

  return geoTags;
}
const parseStop = (string) => {

  string = string.replace(/\)/gm, "").replace(/\(/gm, "").replace(/POINT/gm, "");

  let arr = string.split(" ");

  return {
    lat: parseFloat(arr[1]),
    lon: parseFloat(arr[0])
  }
}
const routeToStops = (data) => {
  const func = (arr) => {
    let geoTags = [];

    arr.forEach((item, i) => {
      geoTags.push({
        ...parseStop(item.geometry.centroid),
        name: item.name,
        time: 0,
        busStop: true
      })
    });

    return geoTags;
  }

  let forward = data.result.items[0].directions[0].platforms;
  let backward = data.result.items[0].directions[1].platforms;

  return {
    forward: func(forward),
    backward: func(backward)
  }
}
const routeToShape = (data) => {
  let forward = data.result.items[0].directions[0].geometry.selection;
  let backward = data.result.items[0].directions[1].geometry.selection;

  return {
    forward: parseLineString(forward),
    backward: parseLineString(backward)
  }
}
const routeToObject = (data) => {
  return {
    busStops: routeToStops(data),
    shape: routeToShape(data)
  }
}

exports.routeToObject = routeToObject;
