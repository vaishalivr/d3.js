const svg = d3.select('svg');

const width =  +svg.attr('width');
const height = +svg.attr('height');


// This will create a fruit object which looks like {"type": "apple"}
const makeFruit = type => ({type});

const colourScale = d3.scaleOrdinal()
	.domain(['apple', 'lemon'])
	.range(['red', 'yellow']);

const radiusScale = d3.scaleOrdinal()
	.domain(['apple', 'lemon'])
	.range([50,30]);

// This creates a list of fruit objects
const fruits = d3.range(5)
	.map(() => makeFruit('apple'));

const render = (svg, fruits) => {
	console.log(fruits);

	const circles = svg.selectAll('circle').data(fruits);
	console.log(circles);

	circles
		.enter().append('circle')
			.attr('cx', (d,i) => i * 120 + 60)
			.attr('cy', height/2)
		.merge(circles)
			.attr('r', d => radiusScale(d.type))
			.attr('fill', d => colourScale(d.type));
	circles
		.exit().remove();
};

render(svg, fruits);

setTimeout(() => {
	fruits.pop();
	render(svg, fruits);
}, 1000);

setTimeout(() => {
	fruits[2].type = 'lemon';
	render(svg, fruits);
}, 2000);


