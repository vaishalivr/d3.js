const render6 = data => {

	var dataasdictionary = {}

	for (rowIndex in data) {
		var dataRow = data[rowIndex]
		if (rowIndex != "columns") {
			dataasdictionary[dataRow.year] = dataRow
		}
	}

	const svg = d3.select('#svg6')
	const width = +svg.attr('width')
	const height = +svg.attr('height')

	const margin = {top:60, right:30, bottom:30, left:60}
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom - 40

	var start_year = 2018;
	const padding = 0.4

	const groups = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]
	const subgroups = ['satellites', 'starlinks']

	const xScale = d3.scaleBand()
		.domain(groups)
		.range([0, innerWidth])
		.padding(padding)

	const yScale = d3.scaleLinear()
		.domain([0, 6000]).nice()
		.range([innerHeight, 0])

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	const stackedData = d3.stack()
    	.keys(subgroups)
    	(data)

    const color = d3.scaleOrdinal()
    	.domain(subgroups)
    	.range(['#ccc','#ccc'])

	g.append('g')
		.selectAll('g')
		.data(stackedData)
		.enter().append('g')
		.attr("id", function(d,i) {return "bargroup" + i;} )
		.attr('fill', d => color(d.key))
		.selectAll('rect')
		.data(d => d)
		.enter().append('rect')
		.attr('id', d => "rect" + d.data.year.toString() + d[1].toString().replace('.', '_'))
		.attr('x', d => xScale(d.data.year))
		.attr('y', d => yScale(d[1]))
		.attr('height', d => yScale(d[0]) - yScale(d[1]))
		.attr('width', xScale.bandwidth())

	const xAxis = d3.axisBottom(xScale)
		.tickSizeOuter(0)
		
	const yAxis = d3.axisLeft(yScale)

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

	const text1 = g.append('g').selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.attr('id', d => 'text16' + d.year)
		.text(d => d.satellites)
		.attr('text-anchor', 'middle')
		.attr('x', d => xScale(d.year) + xScale.bandwidth()/2)
		.attr('y', d => yScale(d.satellites) + 12)
		.style('font-size', '12px')
		.style('fill', '#ccc')

	const text2 = g.append('g').selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.attr('id', d => 'text26' + d.year)
		.text(d => d.starlinks)
		.attr('text-anchor', 'middle')
		.attr('x', d => xScale(d.year) + xScale.bandwidth()/2)
		.attr('y', d => yScale(d.total) + 12)
		.style('font-size', '12px')
		.style('fill', '#ccc')
	
	const indicator = svg.append('g')
		.attr('id', 'indicator6')
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

			d3.select('#indicator6').select('line')
				.attr('x1', xScale(yearonslider) + xScale.bandwidth()/2)
				.attr('x2', xScale(yearonslider) + xScale.bandwidth()/2)

			d3.select('#indicator6').select('text')
				.attr('x', xScale(yearonslider) - dataasdictionary[yearonslider].total.length/2 + 8)
				.text(dataasdictionary[yearonslider].total)
				.attr('dy',9)
				.style('font-size', '12px')

			for (index in data) {
				var yearindata = data[index].year
				console.log(index)

				if (yearindata <= yearonslider) {
					d3.select('#rect'+yearindata.toString() + stackedData[0][index][1].toString().replace('.', '_'))
						.style('fill', '#a100ff')

					d3.select('#rect'+yearindata.toString() + stackedData[1][index][1].toString().replace('.', '_'))
						.style('fill', 'white')
						.style('stroke', '#a100ff')
						.style('stroke-width', '1.5px')

					d3.select('#text16' + yearindata)
						.style('fill', 'black')

					d3.select('#text26' + yearindata)
						.style('fill', 'black')

				} else {
					d3.select('#rect'+yearindata.toString() + stackedData[0][index][1].toString().replace('.', '_'))
						.style('fill', '#ccc')

					d3.select('#rect'+yearindata.toString() + stackedData[1][index][1].toString().replace('.', '_'))
						.style('fill', '#ccc')
						.style('stroke', '#ccc')
						.style('stroke-width', '1.5px')

					d3.select('#text16' + yearindata)
						.style('fill', '#ccc')

					d3.select('#text26' + yearindata)
						.style('fill', '#ccc')
				}
			}

		})

	const addSlider = d3.select('#slider-step6')
		.append('svg')
		.attr('width', 300)
		.attr('height', 100)
		.append('g')
		.attr('transform', 'translate(30,30)')

	addSlider.call(slider);

	g.append('text')
		.text('Number of satellites launched by US Govt and SpaceX')
		.attr('text-anchor', 'middle')
		.attr('x', innerWidth/2)
		.attr('y', 310)
		.attr('font-size', 15)
}


d3.csv('data6.csv').then(data => {
	render6(data)
})