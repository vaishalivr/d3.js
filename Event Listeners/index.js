const svg = d3.select('svg');
const margin = 20;

/*const data = [5,10,15]; //make array of radii

const circleSet = svg.selectAll('circle').data(data)
	.enter().append('circle')
		.attr('cx', (d,i) => i*100 + margin)
		.attr('cy', 200)
		.attr('r', d => d)
		.attr('fill', 'red')
		
const filteredCircle = circleSet.filter(function (d,i) {return i === 0;});

filteredCircle
	.attr('cx', 40)
	.attr('fill', 'blue')*/

const data = [120, 140, 100, 130, 150, 130, 190, 150, 190, 110,
            110, 140, 120, 100, 170, 120, 120, 160, 120, 180];

svg.selectAll('rect').data(data)
	.enter().append('rect')
		.attr('width', d => d)
		.attr('height', 21)
		.attr('x', 20)
		.attr('y', (d,i) => i*30)
		/*.on('click', function (d) {
			d3.select(this)
				.attr('fill', 'steelblue')
		})*/
		.on('mouseover', function (d) {
			d3.select(this)
				.attr('fill', 'steelblue')
		})
		.on('mouseout', function (d) {
			d3.select(this)
				.transition()
				.duration(2000)
				.attr('fill', 'black')
		})

svg.selectAll('text')
	.data(data)
	.enter().append('text')
		.text(d => d)
		.attr('x', d => d - 6)
		.attr('y', (d,i) => i*30 + 14)
		.attr('fill', 'white')
		.attr('font-family', 'sans-serif')
		.attr('font-size', '10px');




