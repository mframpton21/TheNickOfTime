var app = angular.module('nickOfTime');

app.directive('navbar', function(){
	return {
      restrict: 'E',
      templateUrl: 'scripts/templates/navbar.html',
      controller: 'NavbarController'
  }
});

////////////////////////////////////////////////////////////////
app.directive('detailed', function(){
  return {
      restrict: 'E',
      templateUrl: 'scripts/templates/detailedReport.html',
      controller: 'ReportDetailController'
  }
});

////////////////////////////////////////////////////////////////
app.directive('summary', function(){
  return {
      restrict: 'E',
      templateUrl: 'scripts/templates/summaryReport.html',
      controller: 'ReportSummaryController'
  }
});

////////////////////////////////////////////////////////////////
app.directive('reportStats', function(){
  return {
    restrict: 'E',
    templateUrl: "scripts/templates/stats.html",
    scope: {
      data: '='
    },
    controller: function($scope, $element) {

      !function(){
        var Donut3D={};
        
        function pieTop(d, rx, ry, ir ){
          if(d.endAngle - d.startAngle == 0 ) return "M 0 0";
          var sx = rx*Math.cos(d.startAngle),
            sy = ry*Math.sin(d.startAngle),
            ex = rx*Math.cos(d.endAngle),
            ey = ry*Math.sin(d.endAngle);
            
          var ret =[];
          ret.push("M",sx,sy,"A",rx,ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0),"1",ex,ey,"L",ir*ex,ir*ey);
          ret.push("A",ir*rx,ir*ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0), "0",ir*sx,ir*sy,"z");
          return ret.join(" ");
        }

        function pieOuter(d, rx, ry, h ){
          var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
          var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);
          
          var sx = rx*Math.cos(startAngle),
            sy = ry*Math.sin(startAngle),
            ex = rx*Math.cos(endAngle),
            ey = ry*Math.sin(endAngle);
            
            var ret =[];
            ret.push("M",sx,h+sy,"A",rx,ry,"0 0 1",ex,h+ey,"L",ex,ey,"A",rx,ry,"0 0 0",sx,sy,"z");
            return ret.join(" ");
        }

        function pieInner(d, rx, ry, h, ir ){
          var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
          var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);
          
          var sx = ir*rx*Math.cos(startAngle),
            sy = ir*ry*Math.sin(startAngle),
            ex = ir*rx*Math.cos(endAngle),
            ey = ir*ry*Math.sin(endAngle);

            var ret =[];
            ret.push("M",sx, sy,"A",ir*rx,ir*ry,"0 0 1",ex,ey, "L",ex,h+ey,"A",ir*rx, ir*ry,"0 0 0",sx,h+sy,"z");
            return ret.join(" ");
        }

        function getPercent(d){

          return (d.endAngle-d.startAngle > 0.2 ? 
              Math.round(1000*(d.endAngle-d.startAngle)/(Math.PI*2))/10+'%' + '-' + d.data.label : '');
        } 
        
        Donut3D.transition = function(id, data, rx, ry, h, ir){
          function arcTweenInner(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) { return pieInner(i(t), rx+0.5, ry+0.5, h, ir);  };
          }
          function arcTweenTop(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) { return pieTop(i(t), rx, ry, ir);  };
          }
          function arcTweenOuter(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) { return pieOuter(i(t), rx-.5, ry-.5, h);  };
          }
          function textTweenX(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) { return 0.6*rx*Math.cos(0.5*(i(t).startAngle+i(t).endAngle));  };
          }
          function textTweenY(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) { return 0.6*rx*Math.sin(0.5*(i(t).startAngle+i(t).endAngle));  };
          }
          
          var _data = d3.layout.pie().sort(null).value(function(d) {return d.value;})(data);
          
          d3.select("#"+id).selectAll(".innerSlice").data(_data)
            .transition().duration(750).attrTween("d", arcTweenInner); 
            
          d3.select("#"+id).selectAll(".topSlice").data(_data)
            .transition().duration(750).attrTween("d", arcTweenTop); 
            
          d3.select("#"+id).selectAll(".outerSlice").data(_data)
            .transition().duration(750).attrTween("d", arcTweenOuter);  
            
          d3.select("#"+id).selectAll(".percent").data(_data).transition().duration(750)
            .attrTween("x",textTweenX).attrTween("y",textTweenY).text(getPercent);  
        }
        
        Donut3D.draw=function(id, data, x /*center x*/, y/*center y*/, 
            rx/*radius x*/, ry/*radius y*/, h/*height*/, ir/*inner radius*/){
        
          var _data = d3.layout.pie().sort(null).value(function(d) {return d.value;})(data);
          
          var slices = d3.select("#"+id).append("g").attr("transform", "translate(" + x + "," + y + ")")
            .attr("class", "slices");
            
          slices.selectAll(".innerSlice").data(_data).enter().append("path").attr("class", "innerSlice")
            .style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
            .attr("d",function(d){ return pieInner(d, rx+0.5,ry+0.5, h, ir);})
            .each(function(d){this._current=d;});
          
          slices.selectAll(".topSlice").data(_data).enter().append("path").attr("class", "topSlice")
            .style("fill", function(d) { return d.data.color; })
            .style("stroke", function(d) { return d.data.color; })
            .attr("d",function(d){ return pieTop(d, rx, ry, ir);})
            .each(function(d){this._current=d;});
          
          slices.selectAll(".outerSlice").data(_data).enter().append("path").attr("class", "outerSlice")
            .style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
            .attr("d",function(d){ return pieOuter(d, rx-.5,ry-.5, h);})
            .each(function(d){this._current=d;});

          slices.selectAll(".percent").data(_data).enter().append("text").attr("class", "percent")
            .attr("x",function(d){ return 0.6*rx*Math.cos(0.5*(d.startAngle+d.endAngle));})
            .attr("y",function(d){ return 0.6*ry*Math.sin(0.5*(d.startAngle+d.endAngle));})
            .text(getPercent).each(function(d){this._current=d;});        
        }
        
        this.Donut3D = Donut3D;
      }();

      ////////////////////////////////////////////////////////////////
      //Need the watch to make sure the directive is re-applied when the 
      //data scope changes
      $scope.$watch('data', function(newVal){

        var svg = d3.select('.stats')
        .append("svg")
        .attr("width",700)
        .attr("height",300);

        //svg.append("g").attr("id","salesDonut");
        svg.append("g").attr("id","quotesDonut");

        //Donut3D.draw("salesDonut", prepData(newVal), 150, 150, 130, 100, 30, 0.4);
        //Donut3D.draw("quotesDonut", prepData(newVal), 500, 150, 130, 100, 30, 0);
        Donut3D.draw("quotesDonut", prepData(newVal), 150, 150, 130, 100, 30, 0);
      });

      ////////////////////////////////////////////////////////////////
      function prepData(data) {

        var dataArr = [];

        for(var key in data){

          dataArr.push(
            {
              label: data[key].activity,
              color: getRandomColor(),
              value: data[key].millis
            }
          );
        }
        return dataArr;
      }      

      ////////////////////////////////////////////////////////////////
      function getRandomColor() {

        var letters = '0123456789ABCDEF'.split('');
        var color = '#';

        for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    }
  }

});

////////////////////////////////////////////////////////////////
