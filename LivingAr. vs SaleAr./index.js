const svg = d3.select('svg');


const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
	const margin = {top:60, right:20, bottom:20, left:60};
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const xScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.GrLivArea)])
		.range([0, innerWidth]);

	const yScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.SalePrice)])
		.range([innerHeight,0]);

	const xAxis = d3.axisBottom(xScale);
	const yAxis = d3.axisLeft(yScale);

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	const xAxisG = g.append('g')
		.call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`)
		.select('.domain')
			.remove();

	g.append('g')
		.call(yAxis)
		.select('.domain')
			.remove();

	svg.selectAll('dot').data(data)
		.enter().append('circle')
			.attr('cx', d => xScale(d.GrLivArea))
			.attr('cy', d => yScale(d.SalePrice))
			.attr('r', 1.5)
			.style('fill', '#4682b4');

	g.append('text')
		.attr('y', -10)
		.attr('class', 'title')
		.text('Comparision of Ground Floor Living Area vs. Prices');
};

const link = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
d3.csv(link).then(data => {
	data.forEach(d => {
		d.GrLivArea = +d.GrLivArea
		d.SalePrice = +d.SalePrice
	});
	render(data);
});