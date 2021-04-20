const render7 = data => {

	const svg = d3.select('#svg7')
	const width = +svg.attr('width')
	const height = +svg.attr('height')

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
		.domain([0, 12000]).nice()
		.range([innerHeight, 0])

	const xAxis = d3.axisBottom(xScale)
		
	const yAxis = d3.axisLeft(yScale)

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	

	g.selectAll('.bar')
		.data(data)
		.enter()
		.append('rect')
		.attr('x', d => xScale(d.year))
		.attr('y', d => yScale(d.starlinks))
		.attr('width', xScale.bandwidth())
		.attr('height', d => innerHeight - yScale(d.starlinks))
		.attr('class', 'bar')
		.attr('id', d => ('rect7'+ d.year))
		.attr('fill', '#ccc')

	g.append('g').call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`)
		.select('path')
		.style('stroke-width', '3px')

	g.append('g').call(yAxis)

/*	g.append('g').
		selectAll('.bar')
		.data(data)
		.enter()
		.append('text')
		.attr('class', 'bartext')
		.text(d => d.starlinks)
		.attr('x', d => xScale(d.year) + xScale.bandwidth()/2)
		.attr('y', d => yScale(d.starlinks) - 9)
		.attr('fill', 'black')
		.attr('text-anchor', 'middle')*/
	
	const indicator = svg.append('g')
		.attr('id', 'indicator7')
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

			d3.select('#indicator7').select('line')
				.attr('x1', xScale(yearonslider) + xScale.bandwidth()/2)
				.attr('x2', xScale(yearonslider) + xScale.bandwidth()/2)

			d3.select('#indicator7').select('text')
				.attr('x', xScale(yearonslider) - 'SO LIKELY'.length/2)
				.text('SO LIKELY')

			for (index in data) {
				var yearindata = data[index].year

				if (yearindata <= yearonslider) {
					d3.select('#rect7'+yearindata)
						.style('fill', '#a100ff')
				} else {
					d3.select('#rect7'+yearindata)
						.style('fill', '#ccc')
				}
			}

		})

	const addSlider = d3.select('#slider-step7')
		.append('svg')
		.attr('width', 300)
		.attr('height', 100)
		.append('g')
		.attr('transform', 'translate(30,30)')

	addSlider.call(slider);

	g.append('text')
		.text('By SpaceX')
		.attr('x', 90)
		.attr('y', 300)
}


d3.csv('data7.csv').then(data => {
	render7(data)
})