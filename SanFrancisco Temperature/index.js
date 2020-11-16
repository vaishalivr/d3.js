const svg = d3.select('svg');

const width = svg.attr('width');
const height = svg.attr('height');

const render = data => {
	const title = 'A Week in San Francisco';
	const margin = {top:60, right:40, bottom:80, left:100};
	const innerWidth =  width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const xAxisLabel = "Time";
	const yAxisLabel = "Temperature";
	const xValue = d => d.timestamp;
	const yValue = d => d.temperature;

	const xScale = d3.scaleTime()
		.domain(d3.extent(data, d => d.timestamp))
		.range([0, innerWidth])
		.nice(); 

	const yScale = d3.scaleLinear()
		.domain(d3.extent(data, d => d.temperature))
		.range([innerHeight, 0])
		.nice();

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)	

	const xAxis = d3.axisBottom(xScale)
		.tickSize(-innerHeight)
		.tickPadding(15)
		.ticks(6);

	const yAxis = d3.axisLeft(yScale)
		.tickSize(-innerWidth)
		.tickPadding(10);

	const xAxisG = g.append('g').call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`);

	const yAxisG = g.append('g').call(yAxis);

	yAxisG.select('.domain').remove();

	xAxisG.append('text')
		.text(xAxisLabel)
		.attr('class', 'axis-label')
		.attr('y', 55)
		.attr('x', innerWidth / 2)
		.attr('fill', 'black');

	yAxisG.append('text')
		.text(yAxisLabel)
		.attr('class', 'axis-label')
		.attr('y', -30)
		.attr('x', -innerHeight / 2)
		.attr('fill', 'black')
		.attr('transform', 'rotate(-90)');

	const lineGenerator = d3.line()
		.x(d => xScale(xValue(d)))
		.y(d => yScale(yValue(d)))
		.curve(d3.curveBasis);

	g.append('path')
		.attr('class', 'line-path')
		.attr('d', lineGenerator(data))
		.attr('stroke', 'black');

	g.append('text')
		.attr('class', 'title')
		.attr('y', -10)
		.text(title);

};

const link = 'https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv'
 d3.csv(link).then(data => {
 	data.forEach(d => {
 		d.temperature = +d.temperature;
 		d.timestamp = new Date(d.timestamp);
 	})
 	render(data); 
 });
