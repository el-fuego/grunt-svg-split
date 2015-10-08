/*
 * grunt-local-settings
 * https://github.com/el-fuego/grunt-local-settings
 *
 * Copyright (c) 2013 Yuriy Pulyaev
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('svg-split', 'Split SVG sprite to files', function () {

    var svgReg = /<svg.*?id="(.+?)"(.|[\n\r])*?<\/svg>/gmi,
      classReg = /class="(.+?)"/gi;

    this.files.forEach(function (file) {
      file.src.forEach(function (path) {
        grunt.log.writeln(path);

        var classRes, currentSvg, id, style, styles, svg, svgRes, path;
        svg = grunt.file.read(path);

        // Find each <svg />
        while (svgRes = svgReg.exec(svg)) {
          currentSvg = svgRes[0];
          id = svgRes[1];
          styles = {};

          // Find classes at <svg /> block
          while (classRes = classReg.exec(currentSvg)) {
            styles[classRes[1]] = '';
          }
          currentSvg = svgRes[0];

          // Get styles values
          Object.keys(styles).forEach(function(className) {
            var results1, styleReg, styleRes;
            styleReg = new RegExp("\\." + className + "(.|[\\n\\r])*?\\{((.|[\\n\\r])+?)\\}", 'gmi');
            results1 = [];

            while (styleRes = styleReg.exec(svg)) {
              results1.push(styles[className] += styleRes[2]);
            }
            return results1;
          });

          // Compile stylesheet
          style = '';
          Object.keys(styles).forEach(function(className) {
            return style += "\n." + className + " {" + styles[className] + "}";
          });

          // Compile SVG
          currentSvg = currentSvg.replace(/(<svg(.|[\n\r])+?>)/i, "$1\n<defs>\n  <style>\n" + style + "\n  </style>\n</defs>");
          currentSvg = currentSvg.replace(/(<svg.+?)x=".+?"(.*?>)/gi, '$1$2');
          currentSvg = currentSvg.replace(/(<svg.+?)y=".+?"(.*?>)/gi, '$1$2');
          currentSvg = currentSvg.replace(/(<svg.+?)>/gi, '$1 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">');


          path = file.dist + '/' + (id || Math.random()) + ".svg";
          grunt.file.write(path, currentSvg);

          grunt.log.writeln(path + ' written');
        }

        grunt.log.ok();
      });
    });
  });
};
