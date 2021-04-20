const svg = d3.select('svg')
const width = +svg.attr('width')
const height = +svg.attr('height')

const render = data => {
	const margin = {top:60, right:30, bottom:30, left:60}
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	var start_year = 2018;
	const padding = 0.4

	const xScale = d3.scaleBand()
		.domain(data.map(d => d.year))
		.range([0, innerWidth])
		.padding(padding)

	const yScale = d3.scaleLinear()
		.domain([0, d3.max(data, d=>d.houses)]).nice()
		.range([innerHeight, 0])

	const xAxis = d3.axisBottom(xScale)
		
	const yAxis = d3.axisLeft(yScale)
		.tickFormat(d => d + '%')

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	g.append('g').call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`)

	g.append('g').call(yAxis)

	g.selectAll('.bar')
		.data(data)
		.enter()
		.append('rect')
		.attr('x', d => xScale(d.year))
		.attr('y', d => yScale(d.houses))
		.attr('width', xScale.bandwidth())
		.attr('height', d => innerHeight - yScale(d.houses))
		.attr('class', 'bar')
		.attr('id', d => ('rect'+ d.year))
		.attr('fill', '#ccc')

	/*const houses = [96.5, 95.9, 96.1, 96.2, 96.95, 97.88, 98.82]*/

	g.append('g').
		selectAll('.bar')
		.data(data)
		.enter()
		.append('text')
		.attr('class', 'bartext')
		.text(d => d.houses)
		.attr('x', d => xScale(d.year) + xScale.bandwidth()/2)
		.attr('y', d => yScale(d.houses) - 9)
		.attr('fill', 'black')
		.attr('text-anchor', 'middle')
	
	const indicator = svg.append('g')
		.attr('id', 'indicator')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	indicator.append('line')
		.attr('x1', xScale(start_year) + xScale.bandwidth()/2)
		.attr('x2', xScale(start_year) + xScale.bandwidth()/2)
		.attr('y1', -24)
		.attr('y2', innerHeight)
		.style('stroke-dasharray', ('5,5'))
		.style('stroke', '#480474')

	indicator
		.append('text')
		.attr('y', -36)
		.attr('x', xScale(start_year) - 'SO LIKELY'.length/2)
		.text('SO LIKELY')
		.attr('font-size', '15px')

	const slider = d3.sliderBottom()
		.min(d3.min(data, d => d.year))
		.max(d3.max(data, d => d.year))
		.width(200)
		.tickFormat(d3.format('d'))
		.ticks(6)
		.step(1)
		.default(2018)
		.fill('#a100ff')
		.on('onchange', d => {

			var yearonslider = d3.format('d')(d)

			d3.select('#indicator').select('line')
				.attr('x1', xScale(yearonslider) + xScale.bandwidth()/2)
				.attr('x2', xScale(yearonslider) + xScale.bandwidth()/2)

			d3.select('#indicator').select('text')
				.attr('x', xScale(yearonslider) - 'SO LIKELY'.length/2)
				.text('SO LIKELY')

			for (index in data) {
				var yearindata = data[index].year

				if (yearindata <= yearonslider) {
					d3.select('#rect'+yearindata)
						.style('fill', '#a100ff')
				} else {
					d3.select('#rect'+yearindata)
						.style('fill', '#ccc')
				}
			}

		})

	const addSlider = d3.select('#slider-step')
		.append('svg')
		.attr('width', 300)
		.attr('height', 100)
		.append('g')
		.attr('transform', 'translate(30,30)')

	addSlider.call(slider);



}

d3.csv('data.csv').then(data => {
	render(data)
})



