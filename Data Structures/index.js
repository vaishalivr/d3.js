const svg = d3.select('svg');

/*const render = data => {
	console.log(data);
};


d3.csv('unemploymentgraph.csv').then(data => {
	data.forEach(d => {
		d.Year = +d.Year;
		d.Jan = +d.Jan;
		d.Feb = +d.Feb;
		d.Mar = +d.Mar;
		d.Apr = +d.Apr;
		d.May = +d.May;
		d.Jun = +d.Jun;
		d.Jul = +d.Jul;
		d.Aug = +d.Aug;
		d.Sep = +d.Sep;
		d.Oct = +d.Oct;
		d.Nov = +d.Nov;
		d.Dec = +d.Dec;
	})
	render(data);
});*/


const tasks = [];

const myHeaders = new Headers();

myHeaders.append('Year','2010');
myHeaders.append('Year', '2011');
myHeaders.append('Year', '2012');

console.log(myHeaders.get('Year'));

tasks['Jan'] = {'2010': 9.8, '2011': 9.1, '2012': 8.3};
tasks['Feb'] = {'2010': 9.8, '2011': 9.0, '2012': 8.3};
tasks['Mar'] = {'2010': 9.9, '2011': 9.0, '2012': 8.2};

console.log(tasks);