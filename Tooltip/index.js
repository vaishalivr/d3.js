const data = ['a', 'b', 'c'];

const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

	d3.select('body')
		.append('div')
		.attr('id', 'tooltip')
		.style('opacity', 0)
		.style('position', 'absolute')
		.style('backgroud-colour', 'white')
		.style('border', 'solid');

svg.selectAll('circle').data(data)
	.enter().append('circle')
		.attr('cx', (d,i) => i*50+50)
		.attr('cy', 10)
		.attr('r', 10)
		.on('mouseover', d => {
			d3.select("#tooltip")
				.transition().duration(2000)
					.style('opacity', 1)
					.text(d)
		})
		.on('mouseout', d => {
			d3.select("#tooltip")
				.style('opacity', 0)
		})
		.on('mousemove', function() {
			d3.select("#tooltip")
				.style('left', (d3.event.pageX+10) + 'px')
				.style('top', (d3.event.pageY+10) + 'px')
		});
		


