const svg = d3.select('svg')
    // .attr('viewBox', '0 0 1200 600')

const width = +svg.attr('width')
const height = +svg.attr('height')

const render = data => {

    const margin = {top:120, left:120, bottom:30, right:15};
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const years = d3.range(1930, 2030, 10)

    const xScale = d3.scaleLinear()
        .domain([d3.min(years), d3.max(years)])
        .range([0, innerWidth])

    const xAxis = d3.axisBottom(xScale)
        .tickSize(innerHeight)
        .tickFormat(d3.format('d'))
       
    const names = [];

    for (let i=0; i<data.length; i++) {
        names.unshift(data[i][Object.keys(data[i])[0]])
    }

    const yScale = d3.scaleBand()
        .domain(names)
        .range([0, innerHeight])

    const yAxis = d3.axisLeft(yScale)
        .tickSize(0);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const xAxisGroup = g.append('g')
        .call(xAxis)

    xAxisGroup
        .selectAll('.tick text')
        .attr('transform', `translate(0, ${-innerHeight-24})`)

    xAxisGroup
        .selectAll('.tick line')
        .attr('stroke', '#d3d3d3')
        .attr('stroke-width', 2)
        
    xAxisGroup
        .call(g => g.select('.domain').remove())

    xAxisGroup
        .select('.tick text')
        .remove()

    xAxisGroup 
        .selectAll('.tick text')
        .attr('font-size', '13px')
        .attr('fill', '#808080')

    const yAxisGroup = g.append('g').call(yAxis)

    yAxisGroup
        .call(g => g.select('.domain').remove())

    yAxisGroup 
        .selectAll('.tick text')
        .attr('font-size', '12px')
        .attr('fill', '#808080')

    const tooltip = d3.select('body')
        .append('div')
        .style('position', 'absolute')
        .style('opacity', 0)
        .style('font-family', 'sans-serif')
    

    const linedata = [];
    for (let i=1; i<data.length; i++) {
        var a = data[i]
        linedata.push(a)
    }

    g.selectAll('lines').data(linedata)
        .enter().append('line')
        .attr('x1', d => xScale(d3.min([d.emmy_year, d.grammy_year, d.oscar_year, d.tony_year])))
        .attr('y1', d => yScale(d.name) + 20)
        .attr('x2', d => xScale(d3.max([d.emmy_year, d.grammy_year, d.oscar_year, d.tony_year])))
        .attr('y2', d => yScale(d.name) + 20)
        .style('stroke', 'black')
        .style('stroke-width', 1.5)

    g.append('line')
        .attr('x1', xScale(d3.min([2005, 2019, 2004])))
        .attr('y1', yScale('Hugh Jackman')+20)
        .attr('x2', xScale(d3.max([2004, 2019, 2005])))
        .attr('y2', yScale('Hugh Jackman')+20)
        .style('stroke', 'black')
        .style('stroke-width', 1.5)
        
    g.selectAll('emmy').data(data)
        .enter().append('circle')
        .attr('cx', d => xScale(d.emmy_year))
        .attr('cy', d => yScale(d.name)+20)
        .attr('r', 6)
        .style('fill', '#4d81ea')
        .on('mouseover', function(d) {
            tooltip 
                .style('opacity', 1)    
                .text(d.emmy_title)
        })
        .on('mousemove', function(d) {
            tooltip
                .style('left', (d3.event.pageX+10) + 'px')
                .style('top', (d3.event.pageY+10) + 'px')
        })
        .on('mouseout', function(d) {
            tooltip
                .style('opacity', 0)
        })

    g.selectAll('grammy').data(data)
        .enter().append('circle')
        .attr('cx', d => xScale(d.grammy_year))
        .attr('cy', d => yScale(d.name)+20)
        .attr('r', 6)
        .style('fill', '#e16dee')
        .on('mouseover', function(d) {
            tooltip 
                .style('opacity', 1)    
                .text(d.grammy_title)
        })
        .on('mousemove', function(d) {
            tooltip
                .style('left', (d3.event.pageX+10) + 'px')
                .style('top', (d3.event.pageY+10) + 'px')
        })
        .on('mouseout', function(d) {
            tooltip
                .style('opacity', 0)
        })

    g.selectAll('oscar').data(data)
        .enter().append('circle')
        .attr('cx', d => xScale(d.oscar_year))
        .attr('cy', d => yScale(d.name)+20)
        .attr('r', 6)
        .style('fill', '#cbc144')
        .on('mouseover', function(d) {
            tooltip 
                .style('opacity', 1)    
                .text(d.oscar_title)
        })
        .on('mousemove', function(d) {
            tooltip
                .style('left', (d3.event.pageX+10) + 'px')
                .style('top', (d3.event.pageY+10) + 'px')
        })
        .on('mouseout', function(d) {
            tooltip
                .style('opacity', 0)
        })

    g.selectAll('tony').data(data)
        .enter().append('circle')
        .attr('cx', d => xScale(d.tony_year))
        .attr('cy', d => yScale(d.name)+20)
        .attr('r', 6)
        .attr('fill', '#8adcc8')
        .on('mouseover', function(d) {
            tooltip
                .style('opacity', 1)    
                .text(d.tony_title)
        })
        .on('mousemove', function(d) {
            tooltip
                .style('left', (d3.event.pageX+10)+'px')
                .style('top', (d3.event.pageY+10)+'px')
        })
        .on('mouseout', function(d) {
            tooltip
                .style('opacity', 0)
        })
        
    g.selectAll('outlines').data(data)
        .enter().append('circle')
        .attr('cx', d => xScale(d3.max([d.emmy_year, d.grammy_year, d.oscar_year, d.tony_year])))
        .attr('cy', d => yScale(d.name)+20)
        .attr('r', 6)
        .style('stroke', 'black')
        .style('stroke-width', 2)
        .style('fill', 'none')
    
    svg.append('text')
        .text('TOWARDS THE EGOT')
        .attr('x', width/2)
        .attr('y', margin.top/3.5)
        .attr('class', 'head')
 
    svg.append('text')
        .text('Only 15 people have earned an Emmy, Grammy, Oscar and Tony')
        .attr('x', width/2)
        .attr('y', margin.top/2)
        .attr('class', 'head')
        .style('font-style', 'italic')

    svg.append('line')
        .attr('x1', 595)
        .attr('y1', 66)
        .attr('x2', 645)
        .attr('y2', 66)
        .attr('stroke', '#4d81ea')
        .attr('stroke-width', 2.1)

    svg.append('line')
        .attr('x1', 650)
        .attr('y1', 66)
        .attr('x2', 710)
        .attr('y2', 66)
        .attr('stroke', '#e16dee')
        .attr('stroke-width', 2.1)

    svg.append('line')
        .attr('x1', 720)
        .attr('y1', 66)
        .attr('x2', 761)
        .attr('y2', 66)
        .attr('stroke', '#cbc144')
        .attr('stroke-width', 2.1)

    svg.append('line')
        .attr('x1', 800)
        .attr('y1', 66)
        .attr('x2', 832)
        .attr('y2', 66)
        .attr('stroke', '#8adcc8')
        .attr('stroke-width', 2.1)

    svg.append('text')
        .text('Oh come on Hugh, just win an Oscar')
        .attr('x', 940)
        .attr('y', 670)
        .attr('font-style', 'italic')
}

d3.csv ('EGOT-winners.csv').then(data => {
    render(data);
})

