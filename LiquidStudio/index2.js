const render2 = data => {

	var dataasdictionary = {}

	for (rowIndex in data) {
		var dataRow = data[rowIndex]
		if (rowIndex != "columns") {
			dataasdictionary[dataRow.year] = dataRow
		}
	}
	const svg = d3.select('#svg2')
	const width = +svg.attr('width')
	const height = +svg.attr('height')

	const start_year = 2018;

	const margin = {top:60, right:30, bottom:30, left:60}
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom - 40	

	const groups = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]
	const subgroups = ['smartphone', 'nonsmartphone']

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	const xScale = d3.scaleBand()
		.domain(groups)
		.range([0, innerWidth])
		.padding([0.4])

	const color = d3.scaleOrdinal()
    	.domain(subgroups)
    	.range(['#ccc','#ccc'])

    const stackedData = d3.stack()
    	.keys(subgroups)
    	(data)

    const yScale = d3.scaleLinear()
		.domain([0, 100])
		.range([innerHeight, 0])

	const xAxis = d3.axisBottom(xScale)
		.tickSizeOuter(0)
		
	const yAxis = d3.axisLeft(yScale)
		.tickFormat(d => d + '%')

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

	/*const text0 = g.append('g').selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.attr('id', d => 'text02' + d.year)
		.text(d => d.total)
		.attr('text-anchor', 'middle')
		.attr('x', d => xScale(d.year) + xScale.bandwidth()/2)
		.attr('y', d => yScale(d.total) - 9)
		.style('font-size', '12px')
		.style('fill', 'white')*/

	const text1 = g.append('g').selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.attr('id', d => 'text12' + d.year)
		.text(d => d.smartphone)
		.attr('text-anchor', 'middle')
		.attr('x', d => xScale(d.year) + xScale.bandwidth()/2)
		.attr('y', d => yScale(d.smartphone) + 12)
		.style('font-size', '12px')
		.style('fill', '#ccc')

	const text2 = g.append('g').selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.attr('id', d => 'text22' + d.year)
		.text(d => d.nonsmartphone)
		.attr('text-anchor', 'middle')
		.attr('x', d => xScale(d.year) + xScale.bandwidth()/2)
		.attr('y', d => yScale(d.total) + 12)
		.style('font-size', '12px')
		.style('fill', '#ccc')

	const indicator = svg.append('g')
		.attr('id', 'indicator2')
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
		.text(' ')
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

			d3.select('#indicator2').select('line')
				.attr('x1', xScale(yearonslider) + xScale.bandwidth()/2)
				.attr('x2', xScale(yearonslider) + xScale.bandwidth()/2)

			d3.select('#indicator2').select('text')
				.attr('x', xScale(yearonslider) - dataasdictionary[yearonslider].total.length/2 + 4)
				.text(dataasdictionary[yearonslider].total)
				.attr('dy',9)
				.style('font-size', '12px')

			for (var index=0; index < stackedData[0].length; index++) {
				var yearindata = stackedData[0][index]["data"]["year"];

				if (yearindata <= yearonslider) {
			
					d3.select('#rect' + yearindata.toString() + stackedData[0][index][1].toString().replace('.', '_'))
						.style('fill', '#a100ff')
						.style('stroke', '#a100ff')
						.style('stroke-width', '1.5px')

					d3.select('#rect' + yearindata.toString() + stackedData[1][index][1].toString().replace('.', '_'))
						.style('fill', '#fff')
						.style('stroke', '#a100ff')
						.style('stroke-width', '1.5px')

					/*d3.select('#text02' + yearindata)
						.style('fill', '#000000')*/

					d3.select('#text12' + yearindata)
						.style('fill', 'black')

					d3.select('#text22' + yearindata)
						.style('fill', 'black')

				} else {
					d3.select('#rect' + yearindata.toString() + stackedData[0][index][1].toString().replace('.', '_'))
						.style('fill', '#ccc')
						.style('stroke', '#ccc')
						.style('stroke-width', '1.5px')

					d3.select('#rect' + yearindata.toString() + stackedData[1][index][1].toString().replace('.', '_'))
						.style('fill', '#ccc')
						.style('stroke', '#ccc')
						.style('stroke-width', '1.5px')

					/*d3.select('#text02' + yearindata)
						.style('fill', 'white')*/

					d3.select('#text12' + yearindata)
						.style('fill', '#ccc')

					d3.select('#text22' + yearindata)
						.style('fill', '#ccc')
				}
			}

		})

	const addSlider = d3.select('#slider-step2')
		.append('svg')
		.attr('width', 300)
		.attr('height', 100)
		.append('g')
		.attr('transform', 'translate(30,30)')

	addSlider.call(slider);

	g.append('text')
		.text('Number of people who have a Cellphone')
		.attr('text-anchor', 'middle')
		.attr('x', innerWidth/2)
		.attr('y', 310)
		.attr('font-size', 15)
}

d3.csv('data2.csv').then(data => {
	data.forEach(d => {
		d.normaltv = +d.normaltv
		d.smarttv = +d.smarttv
		d.year = +d.year
	})
	render2(data)
})