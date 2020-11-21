const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
const link = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv";

const render = data => {
	const groups = d3.map(data, d => d.group).keys();
	const variables = d3.map(data, d => d.variable).keys();
	const margin = {top:20, right:20, bottom:20, left:30};
	const innerWidth = width - margin.left -margin.right;
	const innerHeight = height - margin.top - margin.bottom;


	const xScale = d3.scaleBand()
		.domain(groups)
		.range([0, innerWidth])
		.padding(0.2);

	const yScale = d3.scaleBand()
		.domain(variables)
		.range([0, innerHeight])
		.padding(0.2);

	const xAxis = d3.axisBottom(xScale);
	const yAxis = d3.axisLeft(yScale);

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

/*	g.append('text')
		.text('A d3.js Heatmap')
		.attr('x', 0)
		.attr('y', 3)
		.attr('class', 'header')*/

	g.append('g').call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`)
		.select('.domain').remove();

	g.append('g').call(yAxis)
		.select('.domain').remove();

	const colourScale = d3.scaleSequential()
		.domain([1,100])
		.interpolator(d3.interpolateMagma);

	const tooltip = d3.select('body')
		.append('div')
		.attr('class', 'tooltip')
		.style('opacity', 0)
		.style('position', 'absolute')
		.style('border', 'solid')
		.style('padding', '5px')
		.style('background-color', 'white')
		.style('border-width', '2px');

	g.selectAll('rect').data(data)
		.enter().append('rect')
			.attr('x', d => xScale(d.group))
			.attr('y', d => yScale(d.variable))
			.attr('width', xScale.bandwidth())
			.attr('height', yScale.bandwidth())
			.attr('rx', 4)
			.attr('ry', 4)
			.style('opacity', 0.9)
			.style('fill', d => colourScale(d.value))
			.on('mouseover', function(d) {
				tooltip
					.style('opacity', 1)
					.text('Value : ' + d.value);
				d3.select(this)
					.style('stroke', 'black')
					.style('stroke-width', 4)
					.style('opacity', 1);
			})
			.on('mousemove', d => {
				tooltip
					.style('left', (d3.event.pageX + 10) + 'px')
					.style('top', (d3.event.pageY + 10) + 'px')
			})
			.on('mouseout', function(d) {
				tooltip
					.style('opacity', 0);
				d3.select(this)
					.style('stroke', 'none')
					.style('opacity', 0.9);
			});
};

d3.csv(link).then(data => {
	data.forEach(d => {
		d.value = +d.value;
	})
	render(data);
});