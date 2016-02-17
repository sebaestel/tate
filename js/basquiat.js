'use strict';
angular.module('basquiat-ng',[])
    .directive('donuts', function () {
        return {
            strict: 'E',
            transclude: true,
            scope: {
                chartData: '='
            },
            link: function (scope, element, attributes) {
                scope.$watch('chartData', function(object) {
                    if (object) {
                        renderChart(object);
                    } else{

                    }
                });
                function renderChart(object){
                	$(target = '#' + element.attr('id')).html('');
                    var target = '#' + element.attr('id'),
                            legend,
                            data = object,
                            width = 110,
                            height = 110,
                            radius = 40,
                            inner = 30,
                            colorScheme = jQuery.parseJSON(attributes.chartTheme),
                            total = 0,
                            dataIndex;
                        for (dataIndex in data) {
                            total = total + data[dataIndex].value;
                        }
                        var colors = chroma.scale([colorScheme[0].start, colorScheme[0].end]).colors(data.length),
                            canvas = d3.select(target)
                                .append('svg:svg')
                                .data([data])
                                .attr('width', width)
                                .attr('height', height)
                                .append('svg:g')
                                .attr('transform', 'translate(' + radius * 1.1 + ',' + radius * 1.1 + ')'),
                            textTop = canvas.append('text')
                                .attr('dy', '.35em')
                                .style('text-anchor', 'middle')
                                .attr('y', -10),
                            textBottom = canvas.append('text')
                                .attr('dy', '.35em')
                                .style('text-anchor', 'middle')
                                .attr('class', 'textBottom')
                                .attr('y', 10),
                            arc = d3.svg.arc()
                                .innerRadius(inner)
                                .outerRadius(radius);

                        drawArcs();
                        selectArc(data[0].id);

                        function drawArcs() {
                            var pie = d3.layout.pie()
                                    .value(function (d) {
                                        return d.value;
                                    }),
                                arcs = canvas.selectAll('g.slice')
                                    .data(pie)
                                    .enter()
                                    .append('svg:g')
                                    .attr('id', function(d) {
                                        return 'slice-' + d.data.id;
                                    })
                                    .on('mouseover', function(d) {
                                        selectArc(d.data.id);
                                    })
                                    .on('mouseout', function(d) {
                                        unselectArc(d.data.id);
                                    });

                            arcs.append('svg:path')
                                .attr('fill', function(d, i) {
                                    return colors[i];
                                })
                                .attr('stroke', '#fff')
                                .attr('stroke-width', '2')
                                .attr('d', arc);
                        }

                        function getPercent(value) {
                            var percent = (100 / total) * value;
                            var percent = percent.toFixed(0);
                            return percent;
                        }

                        function selectArc(d) {
                            d3.selectAll($('#slice-' + d))
                                .select('path')
                                .transition()
                                .duration(200)
                            d3.selectAll($('#text-' + d))
                                .select('circle').transition()
                                .attr('r', 7);
                        }

                        function unselectArc(d) {
                            d3.selectAll($('#slice-' + d))
                                .select('path')
                                .transition()
                                .duration(100)
                                .attr('d', arc);
                            textTop.text('');
                            textBottom.text('');
                            d3.selectAll($('#text-' + d))
                                .select('circle').transition()
                                .attr('r', 5);
                        }
                }

            }
        };
    });