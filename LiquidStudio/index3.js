const render3 = data => {

	var dataasdictionary = {}

	for (rowIndex in data) {
		var dataRow = data[rowIndex]
		if (rowIndex != "columns") {
			dataasdictionary[dataRow.year] = dataRow
		}
	}

	const svg = d3.select('#svg3')
	const width = +svg.attr('width')
	const height = +svg.attr('height')

	const margin = {top:60, right:30, bottom:30, left:60}
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom - 40

	var start_year = 2018;
	const padding = 0.4;
	const groups = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]

	const xScale = d3.scaleBand()
		.domain(groups)
		.range([0, innerWidth])
		.padding(padding)

	const yScale = d3.scaleLinear()
		.domain([0, d3.max(data, d=>d.internet)]).nice()
		.range([innerHeight, 0])

	const xAxis = d3.axisBottom(xScale)
		.tickSizeOuter(0)
		
	const yAxis = d3.axisLeft(yScale)
		.tickFormat(d => d + '%')

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	g.selectAll('.bar')
		.data(data)
		.enter()
		.append('rect')
		.attr('x', d => xScale(d.year))
		.attr('y', d => yScale(d.internet))
		.attr('width', xScale.bandwidth())
		.attr('height', d => innerHeight - yScale(d.internet))
		.attr('class', 'bar')
		.attr('id', d => ('rect-3-'+ d.year))
		.attr('fill', '#ccc')

	const xAxisData = g.append('g').call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`)

	xAxisData
		.select('path')
		.style('stroke-width', '3px')
	
	xAxisData
		.select(':nth-child(2) line')
		.attr('stroke-width', 0)

	xAxisData
		.select(':nth-child(10) line')
		.attr('stroke-width', 0)

	xAxisData
		.select(':nth-child(2) text')
		.attr('visibility', 'hidden')

	xAxisData
		.select(':nth-child(10) text')
		.attr('visibility', 'hidden')

	const yAxisData = g.append('g').call(yAxis)

	yAxisData
		.select('.domain')
		.remove()

	yAxisData
		.select(':nth-child(2) line')
		.remove()

	yAxisData
		.select(':nth-child(2) text')
		.attr('visibility', 'hidden')

	g.append('g').
		selectAll('.bar')
		.data(data)
		.enter()
		.append('text')
		.attr('class', 'bartext')
		.text(d => d.houses)
		.attr('x', d => xScale(d.year) + xScale.bandwidth()/2)
		.attr('y', d => yScale(d.internet) - 9)
		.attr('fill', 'black')
		.attr('text-anchor', 'middle')
	
	const indicator = svg.append('g')
		.attr('id', 'indicator3')
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
		.text('')
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

			d3.select('#indicator3').select('line')
				.attr('x1', xScale(yearonslider) + xScale.bandwidth()/2)
				.attr('x2', xScale(yearonslider) + xScale.bandwidth()/2)

			d3.select('#indicator3').select('text')
				.attr('x', xScale(yearonslider) - dataasdictionary[yearonslider].internet.length/2 + 4)
				.text(dataasdictionary[yearonslider].internet)
				.attr('dy',9)
				.style('font-size', '12px')
			

			for (index in data) {
				var yearindata = data[index].year

				if (yearindata <= yearonslider) {
					d3.select('#rect-3-'+yearindata)
						.style('fill', '#a100ff')

					d3.select('#text13' + yearindata)
						.style('fill', 'black')

			
				} else {
					d3.select('#rect-3-'+yearindata)
						.style('fill', '#ccc')

					d3.select('#text13' + yearindata)
						.style('fill', '#ccc')

				
				}
			}

		})

	const addSlider = d3.select('#slider-step3')
		.append('svg')
		.attr('width', 300)
		.attr('height', 100)
		.append('g')
		.attr('transform', 'translate(30,30)')

	addSlider.call(slider);

	g.append('text')
		.text('Number of Households with Broadband')
		.attr('text-anchor', 'middle')
		.attr('x', innerWidth/2)
		.attr('y', 310)
		.attr('font-size', 15)
}

d3.csv('data3.csv').then(data => {
	render3(data)
})

