const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const g = svg.append('g')
	.attr('transform', `translate(${ width/2 }, ${ height/2 })`);

const margin = 40;

const radius = Math.min(+svg.attr('width'), +svg.attr('height')) / 2 - margin;

const data = {a:9, b:20, c:30, d:8, e:12};

const colour = d3.scaleOrdinal()
	.domain([data])
	.range(['black', 'blue', 'green', 'orange', 'white']);

const pie = d3.pie()
	.sort(null)
	.value(d => d.value);

const data_ready = pie(d3.entries(data));

g
	.selectAll('allSlices')
	.data(data_ready)
	.enter()
	.append('path')
	.attr('d', d3.arc()
			.innerRadius(100)
			.outerRadius(radius)
		)
	.attr('fill', d => colour(d.data.key))
	.attr('stroke', 'black')
	.attr('stroke-width', '2px')
	.style('opacity', 0.8);


