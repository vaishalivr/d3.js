const svg = d3.select('svg');

const width = svg.attr('width');
const height = svg.attr('height');

const render = data => {
	const margin = {top:20, right:20, bottom:20, left:200};
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const xScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.Number)])
		.range([0, innerWidth]);

	const xAxis = d3.axisBottom(xScale);

	const yScale = d3.scaleBand()
		.domain(data.map(d => d.Reason))
		.range([0, innerHeight])
		.padding(0.2);

	const yAxis = d3.axisLeft(yScale);

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

	g.append('g').call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`);

	g.append('g').call(yAxis);

	g.selectAll('rect'). data(data)
		.enter().append('rect')
			.attr('y', d => yScale(d.Reason))
			.attr('width', d => xScale(d.Number))
			.attr('height', yScale.bandwidth());
};
	
d3.csv('data.csv').then(data => {
	data.forEach(d => {
		d.Number = +d.Number;
	});
	render(data);
});