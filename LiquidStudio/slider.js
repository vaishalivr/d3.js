const slider = d3.sliderBottom()
		.min(2018)
		.max(2024)
		.width(200)
		.tickFormat(d3.format('d'))
		.ticks(6)
		.step(1)
		.default(2018)
		.fill('#a100ff')
		.on('onchange', d => {});

const addSlider = d3.select('#global-slider')
		.append('svg')
		.attr('width', 300)
		.attr('height', 100)
		.append('g')
		.attr('transform', 'translate(30,30)');

	addSlider.call(slider);