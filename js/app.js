"use strict";
;
(function() {
  AV = {
    angle: 0,
    svg: null,
    interval: null,
    w: 240,
    h: 340,
    init: function() {
      this.drawBody();
      AV.wave(180);
    },
    defaultWave: function() {
      window.setTimeout(function() {
        return AV.wave(5, true);
      }, 1);
      window.setTimeout(function() {
        return AV.wave(180, true);
      }, 1000);
    },
    drawBody: function() {
      this.svg = d3.select("#main").append("svg").attr({
        width: AV.w,
        height: AV.h
      });
      this.svg.append("rect").attr({
        x: AV.w / 3,
        y: AV.h / 2,
        fill: "#008da3",
        width: 80,
        height: 100
      });
      this.svg.append("rect").attr({
        x: (AV.w / 2) - 20,
        y: (AV.h / 2) - 50,
        width: 40,
        height: 50,
        fill: "#008da3"
      });
      AV.svg.append("text").attr({
        x: AV.w / 2,
        y: AV.h / 1.7,
        fill: "white",
        "text-anchor": "middle",
        "font-family": "helvetica, arial"
      }).text("Sprotz");
      [0, 1].forEach(function(i) {
        AV.svg.append("rect").attr({
          x: (AV.w / 3) + (i * 50),
          y: (AV.h / 2) + 85,
          fill: "#008da3",
          width: 30,
          height: 50
        });
        AV.svg.append("line").attr({
          x1: (AV.w / 3) + (i * 80),
          y1: (AV.h / 2),
          x2: (AV.w / 3) + (i * 80),
          y2: (AV.w / 3),
          class: "bones",
          isRight: i
        });
        AV.svg.append("circle").attr({
          cx: (AV.w / 2) - 10 + (i * 20),
          cy: (AV.h / 2) - 30,
          fill: "#000000",
          r: 5
        });
      });
    },
    wave: function(requestAngle, isDefault) {
      d3.selectAll(".bones").transition().attrTween("transform", function(d, i) {
        var tmpAngle = AV.angle;
        var oldAngle = tmpAngle;
        var newAngle = requestAngle;
        var padding = 0;
        AV.angle = requestAngle;
        if (d3.select(this).attr("isRight") === "1") {
          padding = 80;
        } else {
          newAngle = 360 - requestAngle;
          oldAngle = 360 - tmpAngle;
        }
        return d3.interpolateString("rotate(" + oldAngle + " " + ((AV.w / 3) + padding) + " " + (AV.h / 2) + ")", "rotate(" + newAngle + " " + ((AV.w / 3) + padding) + " " + (AV.h / 2) + ")");
      }).duration(function() {
        return isDefault ? 800 : 50;
      });
    }
  };
})(AV);
