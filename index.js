const svg = d3.select('svg');
const width = 500;
const height = 500;

const render = data => {

	svg.selectAll('circle').data(data)
		.enter()
		.append('circle')
		.attr('r', d => d.cost_km_millions/3)
		.attr('cx', d => d.x)
		.attr('cy', d => d.y)
		.attr('class', 'circle');

	svg.selectAll('text').data(data)
		.enter()
		.append('text')
		.text(d => d.city + ' ' + d.line)
		.attr('x', d => d.x)
		.attr('y', d => d.y)
		.attr('class', 'text')
}

var currentx = 140;
var currenty = 100;
var counter = 0;

d3.csv('data.csv').then(data => {
	data.forEach(d => {
		d.cost_km_millions = +d.cost_km_millions;
		d.end_year = +d.end_year;
		d.length = +d.length;
		d.start_year = +d.start_year;
		d.real_cost = +d.real_cost;
		d.tunnel = +d.tunnel;
		d.tunnel_per = +d.tunnel_per.replace('%', '')
		d.x = currentx
		d.y = currenty
		if(counter < 7) {
			counter = counter + 1
			currentx = currentx + 165
		} else {
			counter = 0
			currentx = 140
			currenty = currenty + 150
		}
		d.num_of_years = d.end_year - d.start_year
	})
	render(data);
})

/*var start = 90,
	end = 2.25 + 90,
	numSpirals = 8

var r = d3.min([width, height]) / 2 - 90;

var theta = function(r) {
	return numSpirals * Math.PI * r
}

var radius = d3.scaleLinear()
	.domain([start, end])
	.range([90,r])

console.log(radius)

var points = d3.range(start, end+0.001, (end - start)/1000)
console.log(points)

var spiral = d3.radialLine()
	.angle(theta)
	.radius(radius)

console.log(spiral.radius())

const g = svg.append('g')
	.attr('transform', 'translate('+ width/2 +', '+ height/2 +')')

g.append('path')
	.datum(points)
	.attr('d', spiral)
	.style('stroke', 'steelblue')
	.style('fill', 'none')*/
