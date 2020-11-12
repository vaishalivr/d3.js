const svg = d3.select('svg')

const width = +svg.attr('width')
const height = +svg.attr('height')

const render = data => {
	const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
	const vars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]
	const margin = {top:60, right:20, bottom:50, left:60};
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xScale = d3.scaleBand()
		.domain(groups)
		.range([0, innerWidth])
		.padding(0.02);
	
	const xAxis = d3.axisBottom(xScale);

	const yScale = d3.scaleBand()
		.domain(vars)
		.range([0, innerHeight])
		.padding(0.02);

	const yAxis = d3.axisLeft(yScale);

	const palette = d3.scaleLinear()
		.domain([1,100])
		.range(['white', '#69b3a2']);

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`); 

 	g.append('g').call(xAxis)
 		.attr('transform', `translate(0, ${innerHeight })`)
 			.selectAll('.domain, .tick line')
 				.remove();
 
 	g.append('g').call(yAxis)
 		.selectAll('.domain, .tick line')
 			.remove();

	g.selectAll('rect'). data(data)
		.enter().append('rect')
		.attr('width', xScale.bandwidth())
		.attr('height', yScale.bandwidth())
		.attr('x', d => xScale(d.group))
		.attr('y', d => yScale(d.variable))
		.style('fill', d => palette(d.value));

	g.append('text')
		.attr('y', -30)
		.text('Heatmap with Hypothetical Dataset')

}
const link = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv";
d3.csv(link).then(data => {
	data.forEach(d => {
		d.value = +d.value;
	})
	render(data);
});
