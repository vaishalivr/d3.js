const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
	const margin = {top:50, right:40, bottom:70, left:210};
	const innerHeight = height - margin.bottom - margin.top;
	const innerWidth = width - margin.left - margin.right;

	const xScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.population)])
		.range([0, innerWidth]);

	const xAxisTickFormat = number => 
		d3.format('.3s')(number)
			.replace('G', 'B') 

	const xAxis = d3.axisBottom(xScale)
		.tickFormat(xAxisTickFormat)
		.tickSize(-innerHeight);

	const yScale = d3.scaleBand()
		.domain(data.map(d => d.country))
		.range([0,innerHeight])
		.padding(0.2);

	const yAxis = d3.axisLeft(yScale);

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	const xAxisG = g.append('g')
		.call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`)

	xAxisG.select('.domain').remove();

	xAxisG.append('text')
		.attr('class', 'axis-label')
		.attr('y', 60)
		.attr('x', innerWidth / 2)
		.attr('fill', 'black')
		.text('Population')

	g.append('g')
		.call(yAxis)
		.selectAll('.domain, .tick line')
			.remove();

	g.selectAll('rect').data(data)
		.enter().append('rect')
			.attr('y', d => yScale(d.country))
			.attr('width', d => xScale(d.population))
			.attr('height', yScale.bandwidth())

	g.append('text')
		.attr('y', -10)
		.attr('class', 'title')
		.text('Top 10 Most Populous Countries')
};


d3.csv('data.csv').then(data => {
	data.forEach(d => {
		d.population = +d.population*1000;
	});
	render(data);
});

