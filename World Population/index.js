const svg = d3.select('svg');
const width = svg.attr('width');
const height = svg.attr('height');
const link = 'https://vizhub.com/curran/datasets/world-population-by-year-2015.csv';


const render =  data => {
	const title = 'World Population';
	const margin = {top:40, right:20, bottom:50, left:90};
	const innerHeight = height - margin.top -  margin.bottom;
	const innerWidth = width - margin.left - margin.right;
	const xValue = d => d.year;
	const yValue = d => d.population;
	const xAxisLabel = 'Year';
	const yAxisLabel = 'Population';

	const xScale = d3.scaleTime()
		.domain(d3.extent(data, d => d.year))
		.range([0,innerWidth]);
	
	const yScale = d3.scaleLinear()
		.domain([0, d3.max(data, yValue)])
		.range([innerHeight, 0])
		.nice();

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

	const xAxis = d3.axisBottom(xScale)
		.tickSize(-innerHeight);

	const yAxisTickFormat = number =>
		d3.format('.1s')(number)
			.replace('G', 'B')

	const yAxis = d3.axisLeft(yScale)
		.tickFormat(yAxisTickFormat)
		.tickSize(-innerWidth);

	const xAxisG = g.append('g').call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`);

	const yAxisG = g.append('g').call(yAxis);

	xAxisG.append('text')
		.text(xAxisLabel)
		.attr('fill', '#635F5D')
		.attr('x', innerWidth/2)
		.attr('y', 40)
		.attr('class', 'axis-label');

	yAxisG.append('text')
		.text(yAxisLabel)
		.attr('fill', '#635F5D')
		.attr('x', -innerHeight/2)
		.attr('y', -50)
		.attr('transform', 'rotate(-90)')
		.attr('class', 'axis-label');

	const areaGenerator = d3.area()
		.x0(d => xScale(xValue(d)))
		.y0(innerHeight)
		.y1(d => yScale(yValue(d)));

	g.append('path')
		.attr('class', 'line-path')
		.attr('d', areaGenerator(data));

	svg.append('text')
		.text(title)
		.attr('class', 'title')
		.attr('y', 30)
		.attr('x', width / 2);
};

d3.csv(link).then(data => {
	data.forEach(d => {
		d.year = new Date(d.year);
		d.population = +d.population;
	});
	render(data);
})