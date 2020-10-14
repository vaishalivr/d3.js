const svg = d3.select('svg');

const mainCircleRadius = 100;

const circle = svg
	.append('circle')
		.attr('r', mainCircleRadius)
		.attr('cx', 150)
		.attr('cy', 150)
		.attr('fill', 'yellow')
		.attr('stroke', 'black')
		.attr('stroke-width', 5);

const horizLine = svg
	.append('rect')
		.attr('width', 4)
		.attr('height', 100)
		.attr('x', 150)
		.attr('y', 100)
		.attr('fill', 'red')
		.transition().duration(5000)
			.attr('x', 300)
		.transition().duration(3000)
			.attr('x', 0)
		.transition().duration(2000)
			.attr('x', 150);

const vertLine = svg
	.append('rect')
		.attr('width', 100)
		.attr('height', 4)
		.attr('x', 100)
		.attr('y', 150)
		.attr('fill', 'red')
		.transition().duration(5000)
			.attr('y', 300)
		.transition().duration(3000)
			.attr('y', 0)
		.transition().duration(2000)
			.attr('y', 150);

const circle1 = svg
	.append('circle')
		.attr('r', mainCircleRadius)
		.attr('cx', 500)
		.attr('cy', 150)
		.attr('fill', 'yellow')
		.attr('stroke', 'black')
		.attr('stroke-width', 5);

const eyeRadius = 15;
const eyeYPosition = 125;

const leftEye = svg
	.append('circle')
		.attr('r', eyeRadius)
		.attr('cx', 450)
		.attr('cy', eyeYPosition)
		.transition().duration(2000)
			.attr('cx', 300)
		.transition().duration(3000)
			.attr('cx', 450);

const rightEye = svg
	.append('circle')
		.attr('r', eyeRadius)
		.attr('cx', 550)
		.attr('cy', eyeYPosition)
		.transition().duration(2000)
			.attr('cx', 700)
		.transition().duration(3000)
			.attr('cx', 550);

const mouthG = svg
	.append('g')
		.attr('transform', 'translate(500,160)')

const mouth = mouthG
	.append('path')
		.attr('d', d3.arc()({
			innerRadius: 60,
  			outerRadius: 70,
  			startAngle: Math.PI/2,
  			endAngle: Math.PI*3/2
		}));

const eyebrowWidth = 40;
const eyebrowHeight = 10;

const EyebrowG = svg
	.append('g')
		.attr('transform', 'translate(0, 30)');

EyebrowG
	.transition().duration(2000)
		.attr('y', 50)
	.transition().duration(3000)
		.attr('y', 90);

const leftEyebrow = EyebrowG
	.append('rect')
		.attr('width', 40)
		.attr('height', 10)
		.attr('x', 530)
		.transition().duration(2000)
			.attr('y', 50)
		.transition().duration(3000)
			.attr('y', 90);

const rightEyebrow = EyebrowG
	.append('rect')
		.attr('width', 40)
		.attr('height', 10)
		.attr('x', 430)
		.transition().duration(2000)
			.attr('y', 50)
		.transition().duration(3000)
			.attr('y',90);















