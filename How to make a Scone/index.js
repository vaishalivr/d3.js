const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const radius = Math.min(width, height)/2;

const g = svg.append('g')
		.attr('transform', `translate(${ width/2 }, ${ height/2 })`)

// To add test at center of pie chart 
// you need to offset x position of text to the left 
// by half off the inner radius
g.append('text')
	.text('How to Make')
	.attr('transform', `translate(-60, 0)`)
	.attr('class', 'center-text');
g.append('text')
	.text('A Small Batch of Scones')
	.attr('transform', `translate(-115, 21)`)
	.attr('class', 'center-text');
	

const data =  {'Buttermilk': 120, 
				'Self-raising flour': 62.5, 
				'Cold Butter' : 20,
				'Caster Sugar': 2.08, 
				'Salt': 0.36};

const colour = d3.scaleOrdinal()
	.domain([data])
	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);


const tooltip =  d3.select('body')
	.append('div')
	.attr('class', 'tooltip')
	.style('opacity', 0)
	.style('position', 'absolute')
	.style('background', 'white')
	.style('border-radius', '5px')
	.style('padding', '3px');

const pie = d3.pie()
	.sort(null)
	.value(d => d.value)
	.padAngle(0.005)
	.startAngle(1.1*Math.PI)
	.endAngle(3.1*Math.PI);

const data_ready = pie(d3.entries(data));

const arc = d3.arc()
			.innerRadius(150)
			.outerRadius(200);

g
	.selectAll('allSlices')
	.data(data_ready)
	.enter()
	.append('path')
	/*.attr('d', d3.arc()
			.innerRadius(150)
			.outerRadius(200)
		)*/
	.attr('stroke', 'white')
	.attr('stroke-width', '1px')
	.style('fill', d => colour(d.data.key))
	.transition()
	.delay((d,i) => { return i*500})
	.duration(500)
	.attrTween('d', d => {
		const i = d3.interpolate(d.startAngle, d.endAngle);
		return (t => {d.endAngle = i(t);
				return arc(d);});
	});

g.selectAll('path')
	.on('mouseover', function(d) {
		tooltip
			.style('opacity', 1)
			.text(d.data.key + ' ' + d.data.value + 'g');
		d3.select(this)
			.style('stroke', 'black')
			.style('stroke-width', 2)
	})
	.on('mousemove', d => {
		tooltip
			.style('left', (d3.event.pageX + 10) + 'px')
			.style('top', (d3.event.pageY + 10) + 'px')
	})
	.on('mouseout', function(d) {
		tooltip
			.style('opacity', 0)
		d3.select(this)
			.style('stroke', 'none')
	});


