const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
const margin = {top:20, right:30, bottom:20, left:30};

const render = data => {
	
	const data_transformed = {}

	for (let i=0; i < data.length; i++) {
		var row = data[i];
		var dayName = row.Day;
		delete row.Day;
		var res = []
		for ([key,value] of Object.entries(row)) {
			res.push({'group': key, 'name': value})
		}
		data_transformed[dayName] = res;
	}

	const g1 = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top+40})`)
		.attr('width', 300)
		.attr('height', 210);

	const monday = (data_transformed[Object.keys(data_transformed)[0]]);
	console.log(monday);
	
	const colour = d3.scaleOrdinal()
		.domain(['sleep', 'study', 'exercise', 'cook', 'family', 
				'netflix', 'noidea'])
		.range(['#f6aa5f', '#eb6f63', '#c246c6', '#6461ce',
				'#4db2e0', '#61d3c6', '#b6e248']);

	const tooltip = d3.select('body')
		.append('div')
		.style('opacity', 0)
		.attr('position', 'absolute');

	const node1 = g1
		.selectAll('circle')
		.data(monday)
		.enter()
		.append('circle')
		.attr('r', (d,i) => {return(monday[i]['name'])*3.5})
		.attr('cx', 150)
		.attr('cy', 105)
		.style('fill', d => (colour(d.group)))
		.on('mouseover', function (d) {
			tooltip
				.style('opacity', 1)
				.text('Text')
		})
		.on('mousemove', d => {
			tooltip
				.style('left', (d3.event.pageX + 10) + 'px')
				.style('top', (d3.event.pageY + 10) + 'px')
		})
		.on('mouseout', function(d) {
			tooltip
				.style('opacity', 0)
		})

	g1.append("text")
		.text("Monday")
		.attr('transform', `translate(150, 210)`)
		.attr('class', 'days');

	const simulation1 = d3.forceSimulation()
		.force('center', d3.forceCenter().x(150).y(75))
		.force('charge', d3.forceManyBody().strength(0.5))
		.force('collide', d3.forceCollide().strength(.01).radius(27).iterations(1));

	simulation1
		.nodes(monday)
		.on('tick', d => {
			node1
			.attr('cx', d => d.x)
			.attr('cy', d => d.y)
		})

	const tuesday = (data_transformed[Object.keys(data_transformed)[1]]);

	const g2 = svg.append('g')
		.attr('width', 300)
		.attr('height', 210)
		.attr('transform', `translate(330, 60)`);

	const node2 = g2
		.selectAll('circle')
		.data(tuesday)
		.enter()
		.append('circle')
		.attr('r', (d,i) => {return(tuesday[i]['name'])*3.5})
		.attr('cx', 150)
		.attr('cy', 105)
		.style('fill', d => (colour(d.group)))
		.on('mouseover', function (d) {
			tooltip
				.style('opacity', 1)
				.text('Text')
		})
		.on('mousemove', d => {
			tooltip
				.style('left', (d3.event.pageX + 10) + 'px')
				.style('top', (d3.event.pageY + 10) + 'px')
		})
		.on('mouseout', function(d) {
			tooltip
				.style('opacity', 0)
		})

	g2.append('text')
		.text('Tuesday')
		.attr('transform', `translate(150, 210)`)
		.attr('class', 'days');

	const simulation2 = d3.forceSimulation()
		.force('center', d3.forceCenter().x(150).y(75))
		.force('charge', d3.forceManyBody().strength(0.5))
		.force('collide', d3.forceCollide().strength(.01).radius(27).iterations(1));

	simulation2
		.nodes(tuesday)
		.on('tick', d => {
			node2
			.attr('cx', d => d.x)
			.attr('cy', d => d.y)
		})

	const wednesday = (data_transformed[Object.keys(data_transformed)[2]]);

	const g3 = svg.append('g')
		.attr('width', 300)
		.attr('height', 210)
		.attr('transform', `translate(630,60)`);

	const node3 = g3
		.selectAll('circle')
		.data(wednesday)
		.enter()
		.append('circle')
		.attr('r', (d,i) => {return(wednesday[i]['name'])*3.5})
		.attr('cx', 150)
		.attr('cy', 105)
		.style('fill', d => (colour(d.group)))
		.on('mouseover', function (d) {
			tooltip
				.style('opacity', 1)
				.text('Text')
		})
		.on('mousemove', d => {
			tooltip
				.style('left', (d3.event.pageX + 10) + 'px')
				.style('top', (d3.event.pageY + 10) + 'px')
		})
		.on('mouseout', function(d) {
			tooltip
				.style('opacity', 0)
		})

	g3.append('text')
		.text('Wednesday')
		.attr('transform', `translate(150, 210)`)
		.attr('class', 'days');

	const simulation3 = d3.forceSimulation()
		.force('center', d3.forceCenter().x(150).y(75))
		.force('charge', d3.forceManyBody().strength(0.5))
		.force('collide', d3.forceCollide().strength(.01).radius(30).iterations(1));

	simulation3
		.nodes(wednesday)
		.on('tick', d => {
			node3
			.attr('cx', d => d.x)
			.attr('cy', d => d.y)
		})

	svg.append('line')
		.attr('class', 'seperator')
		.attr('x1', 45)
		.attr('y1', 240)
		.attr('x2', 915)
		.attr('y2', 240)

	const thursday = (data_transformed[Object.keys(data_transformed)[3]]);

	const g4 = svg.append('g')
		.attr('width', 300)
		.attr('height', 210)
		.attr('transform', `translate(30,270)`);

	const node4 = g4
		.selectAll('circle')
		.data(thursday)
		.enter()
		.append('circle')
		.attr('r', (d,i) => {return(thursday[i]['name'])*3.5})
		.attr('cx', 150)
		.attr('cy', 105)
		.style('fill', d => (colour(d.group)))
		.on('mouseover', function (d) {
			tooltip
				.style('opacity', 1)
				.text('Text')
		})
		.on('mousemove', d => {
			tooltip
				.style('left', (d3.event.pageX + 10) + 'px')
				.style('top', (d3.event.pageY + 10) + 'px')
		})
		.on('mouseout', function(d) {
			tooltip
				.style('opacity', 0)
		})

	g4.append('text')
		.text('Thursday')
		.attr('transform', `translate(150, 210)`)
		.attr('class', 'days');

	const simulation4 = d3.forceSimulation()
		.force('center', d3.forceCenter().x(150).y(75))
		.force('charge', d3.forceManyBody().strength(0.5))
		.force('collide', d3.forceCollide().strength(.01).radius(30).iterations(1));

	simulation4
		.nodes(thursday)
		.on('tick', d => {
			node4
			.attr('cx', d => d.x)
			.attr('cy', d => d.y)
		})

	const friday = (data_transformed[Object.keys(data_transformed)[4]]);

	const g5 = svg.append('g')
		.attr('width', 300)
		.attr('height', 210)
		.attr('transform', `translate(330,270)`);

	const node5 = g5
		.selectAll('circle')
		.data(friday)
		.enter()
		.append('circle')
		.attr('r', (d,i) => {return(friday[i]['name'])*3.5})
		.attr('cx', 150)
		.attr('cy', 105)
		.style('fill', d => (colour(d.group)))
		.on('mouseover', function (d) {
			tooltip
				.style('opacity', 1)
				.text('Text')
		})
		.on('mousemove', d => {
			tooltip
				.style('left', (d3.event.pageX + 10) + 'px')
				.style('top', (d3.event.pageY + 10) + 'px')
		})
		.on('mouseout', function(d) {
			tooltip
				.style('opacity', 0)
		})

	g5.append('text')
		.text('Friday')
		.attr('transform', `translate(150, 210)`)
		.attr('class', 'days');	

	const simulation5 = d3.forceSimulation()
		.force('center', d3.forceCenter().x(150).y(75))
		.force('charge', d3.forceManyBody().strength(0.5))
		.force('collide', d3.forceCollide().strength(.01).radius(30).iterations(1));

	simulation5
		.nodes(friday)
		.on('tick', d => {
			node5
			.attr('cx', d => d.x)
			.attr('cy', d => d.y)
		})

	const saturday = (data_transformed[Object.keys(data_transformed)[5]]);

	const g6 = svg.append('g')
		.attr('width', 300)
		.attr('height', 210)
		.attr('transform', `translate(630,270)`);

	const node6 = g6
		.selectAll('circle')
		.data(saturday)
		.enter()
		.append('circle')
		.attr('r', (d,i) => {return(saturday[i]['name'])*3.5})
		.attr('cx', 150)
		.attr('cy', 105)
		.style('fill', d => (colour(d.group)))
		.on('mouseover', function (d) {
			tooltip
				.style('opacity', 1)
				.text('Text')
		})
		.on('mousemove', d => {
			tooltip
				.style('left', (d3.event.pageX + 10) + 'px')
				.style('top', (d3.event.pageY + 10) + 'px')
		})
		.on('mouseout', function(d) {
			tooltip
				.style('opacity', 0)
		})

	g6.append('text')
		.text('Saturday')
		.attr('transform', `translate(150, 210)`)
		.attr('class', 'days');	

	const simulation6 = d3.forceSimulation()
		.force('center', d3.forceCenter().x(150).y(75))
		.force('charge', d3.forceManyBody().strength(0.5))
		.force('collide', d3.forceCollide().strength(.01).radius(33).iterations(1));

	simulation6
		.nodes(saturday)
		.on('tick', d => {
			node6
			.attr('cx', d => d.x)
			.attr('cy', d => d.y)
		})

	svg.append('line')
		.attr('class', 'seperator')
		.attr('x1', 45)
		.attr('y1', 450)
		.attr('x2', 915)
		.attr('y2', 450)	
}


d3.csv('mydata.csv').then(data => {
	render(data);
})

