const width = 960;
const height = 430;

const margin = {top:50, right:0, bottom:100, left:30};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12a"];
const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const gridsize = Math.floor(innerWidth/24);
const buckets = 9;
const legendElementWidth = gridsize*2;
const colours = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"];

const svg = d3.select('#chart').append('svg')
	.attr('width', width)
	.attr('height', height)
	.append('g')
	.attr('transform', `translate(${margin.left}, ${margin.top})`);

const dayLabels = svg.selectAll('.dayLabel')
	.data(days)
	.enter().append('text')
		.text(d => d)
		.attr('x', 0)
		.attr('y', (d,i) => i*gridsize)
		.style('text-anchor', 'end')
		.attr('transform', 'translate(-6,'+gridsize/1.5+')')

const timeLabels = svg.selectAll('.timeLabel')
	.data(times)
	.enter().append('text')
		.text(d => d)
		.attr('x', (d,i) => i*gridsize)
		.style('text-anchor', 'end')
		.attr('transform', 'translate('+gridsize/2+', -6)')

const heatmapChart = d3.tsv('data.tsv').then(data => {
	data.forEach(d => {
		d.day = +d.day;
		d.hour = +d.hour;
		d.value = +d.value;
	});
	const colourScale = d3.scaleQuantile()
		.domain([0,buckets-1, d3.max(data, d => d.value)])
		.range(colours);

	const cards = svg.selectAll('.hour')
		.data(data)
		.enter().append('rect')
			.attr('x', d => {return (d.hour-1)*gridsize;})
			.attr('y', d => {return (d.day-1)*gridsize;})
			.attr('width', gridsize)
			.attr('height', gridsize)
			.attr('rx', 4)
			.attr('ry', 4)
			.attr('class', 'bordered')
			.style('fill', '#ffffd9')
			.transition().duration(3000)
				.style('fill', d => colourScale(d.value));

	const legend = svg.selectAll('.legend')
		.data([0].concat(colourScale.quantiles()), d => {return d})
		.enter().append('g')

		legend.append('rect')
			.attr('x', (d,i) => legendElementWidth*i)
			.attr('y', 330)
			.attr('width', legendElementWidth)
			.attr('height', gridsize/2)
			.style('fill', (d,i) => colours[i]);

	legend.append('text')
			.text(d => {return ('≥' + Math.round(d))})
			.attr('class', 'mono')
			.attr('x', (d,i) => legendElementWidth*i)
			.attr('y', 330+gridsize);


	console.log(legend.append());



});


