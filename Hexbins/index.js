const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
const margin = {top:20, right:20, bottom:20, left:20};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const render = data => {
	const xScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.x)])
		.range([0, innerWidth]);

	const yScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.y)])
		.range([innerHeight, 0]);

	const xAxis = d3.axisBottom(xScale);
	const yAxis = d3.axisLeft(yScale);

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

	g.append('g').call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`);

	g.append('g').call(yAxis);

	const inputforHexbin = []
	data.forEach(d => inputforHexbin.push([xScale(d.x), yScale(d.y)]));

	const hexbin = d3.hexbin()
		.radius(12)
		.extent([[0,0], [innerWidth, innerHeight]]);

	svg.append('clipPath') //area over which hexagons are plotted
		.attr('id', 'clip')
		.append('rect')
			.attr('width', innerWidth)
			.attr('height', innerHeight);

	svg.append('g')
		.attr('clipPath', 'url(#clip)')
		.selectAll('path')
		.data(hexbin(inputforHexbin))
		.enter().append('path')
			.attr('d', hexbin.hexagon())
			.attr('transform', d => 'translate(' + d.x +' , '+ d.y +')')
			.attr('stroke', 'black')
			.attr('stroke-width', '.1')
			.attr('fill', 'steelblue');
};

const link = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_for_density2d.csv';
d3.csv(link).then(data => {
	data.forEach(d => {
		d.x = + d.x;
		d.y = + d.y;
	});
	render(data);
})
