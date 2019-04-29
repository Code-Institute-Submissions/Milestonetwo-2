
//...........bubblechart................................................
        var colors = ['#7cbbdb', '#1f88c4', '#00b0b0', '#7a8da2', '7d927a'];
        //   .domain (["level1","level2","level3","level4","level4",])
        //   .range

        var diameter = "300",
            format = d3.format(".2n"),
            color = d3.scaleOrdinal().range(colors);


        var bubble = d3.pack()
            .size([diameter, diameter])
            .padding(2);

        var svg = d3.select("div#chart")
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 300 300")
            .classed("svg-content", true);



        function resize() {
            width = document.getElementById('#chart').clientWidth;
        d3.select('#chart svg')
            .attr('width', width)
            .attr('height', height);
    }


        d3.json("bubbledives.json", function (error, data) {
            if (error) throw error;



        var root = d3.hierarchy(classes(data))
                .sum(function (d) { return d.value; })
                .sort(function (a, b) { return b.value - a.value; });




    //centrera cirklarna
    bubble(root);
    var node = svg.selectAll(".node")
        .data(root.children)
        .enter().append("g")
        .attr("class", "node")
                .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

    //hovertext
    node.append("title")
                .text(function (d) { return " Code " + d.data.className + " | DD " + format(d.value); });

    node.append("circle")
                .attr("r", function (d) { return d.r; })
                .style("fill", function (d) {
                    return color(d.data.packageName);
    });
//text inside the circle
node.append("text")
    .attr("dy", ".3em")
    .attr("fill", "white")
    .style("text-anchor", "middle")
    .style("font-size", 10)
    .style("font-family", 'Montserrat')
    .style("font-weight", "normal")
                .text(function (d) { return d.data.className.substring(0, d.r / 3); });

});

// Returns a flattened hierarchy containing all leaf nodes under the root.
        function classes(root) {
            var classes = [];

        //coming again and again and again...
            function recurse(name, node) {
                if (node.children) node.children.forEach(function (child) {recurse(node.name, child); });
                else classes.push({packageName: name, className: node.name, value: node.size });
    }

    recurse(null, root);
            return {children: classes };
    }

d3.select(self.frameElement).style("height", diameter + "px");


//...........Leaflet Map................................................
 
        var mapTileLayers = L.tileLayer("http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
            attribution: "Powered by <a href='https://developers.arcgis.com/terms/attribution/' target='_blank' rel='noopener'>Esri</a>"
    });


        //var mapOverlay = L.tileLayer("http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}");
        //mapOverlay.bringToFront().addTo(map).setZIndex(2);


        var wind = L.tileLayer('http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.Stockholm?appid=822ef3960584788ffe08ed73df20904c', {
            maxZoom: 5,
            attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
        opacity: 0.2
    });


        var temp = L.tileLayer('http://{s}.tile.openweathermap.org/map/temp/{z}/{x}/{y}.Stockholm?appid=822ef3960584788ffe08ed73df20904c', {
            maxZoom: 5,
            attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
        opacity: 0.3
    });


        var precipitation = L.tileLayer('http://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.Stockholm?appid=822ef3960584788ffe08ed73df20904c', {
            maxZoom: 5,
            attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
        opacity: 0.7
    });


        var clouds = L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.Stockholm?appid=822ef3960584788ffe08ed73df20904c', {
            maxZoom: 5,
            attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
        opacity: 0.7
    });



        var map = L.map("map1", {
            layers: [mapTileLayers, wind],
        center: [58.5, 14],
        zoom: 5
    });

        var baseLayers = {
            "wind": wind,
        "temp": temp,
        "precipitation": precipitation,
        "clouds": clouds
    };

    var baseControl = L.control.layers(baseLayers).addTo(map);

    L.control.scale().addTo(map);




        var legend = L.control({position: 'topright' });

        function getColor(d) {
            return d > 30 ? '#A7443F' :
            d > 20 ? 'rgba(252, 128, 20, 1)' :
                d > 10 ? 'rgba(255, 194, 40,1)' :
                    d > 1 ? 'rgba(255, 240, 40, 1)' :
                        'rgba(194, 255, 40, 1)';//green
    }


        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 10, 20, 30],
                labels = ['<strong> TEMP (c) </strong>'],
        from, to;

            for (var i = 0; i < grades.length; i++) {
            from = grades[i];
        to = grades[i + 1];

        labels.push(
                    '<i style="background:' + getColor(from + 1) + '"></i> ' +
        from + (to ? '&ndash;' + to : '+'));
}
            div.innerHTML = labels.join('<br>');
        return div;

    };

    legend.addTo(map);


        var legendwind = L.control({position: 'bottomright' });
    
        function getColorwind(d) {
            return d > 100 ? 'rgba(13,17,38,1)' :
                d > 50 ? 'rgba(70,0,175,1)' :
                    d > 20 ? 'rgba(116,76,172, 0.9)' :
                        d > 10 ? 'rgba(179,100,188, 0.9)' :
                            d > 1 ? 'rgba(238,206,206, 0.9)' :
                                'rgba(255,255,255, 0.9)';
        }


        legendwind.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [1, 10, 20, 50],
                labels = ['<strong> WIND (m/s) </strong>'],
            from, to;

            for (var i = 0; i < grades.length; i++) {
                from = grades[i];
            to = grades[i + 1];

            labels.push(
                    '<i style="background:' + getColorwind(from + 1) + '"></i> ' +
            from + (to ? '&ndash;' + to : '+'));
    }
            div.innerHTML = labels.join('<br>');
            return div;

        };

        legendwind.addTo(map);


//...........searchfunction................................................


        $(document).ready(function () {
            $.ajaxSetup({ cache: false });
        $('#search').keyup(function () {
            $('#result').html('');
        $('#state').val('');
        var searchField = $('#search').val();
        var expression = new RegExp(searchField, "i");
                $.getJSON('jsondiving3.json', function (jsondiving3) {
            $.each(jsondiving3, function (key, value) {
                if (value.name.search(expression) != -1 || value.size.search(expression) != -1) {
                    $('#result').append('<li class="list-group-item link-class">' + value.name + ' | <span class="text-muted">' + value.height + 'm </span> | <span class="text-muted">DD' + value.size + '</spa</li>');
                }
            });
        });
    });

            $('#result').on('click', 'li', function () {
                var click_text = $(this).text().split('|');
        $('#search').val($.trim(click_text[0]));
        $("#result").html('');
    });
});



//...........Pool Map (on the left)................................................

// The svg
var width = 300;
var height = 500;
var svg2 = d3
    .select("#mapid2")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


// Map and projection
var projection = d3.geoMercator()
    .center([18, 66])                // GPS of location to zoom on
    .scale(900)                    // This is like the zoom
    .translate([150, 100]);

// data for circles:
var markers = [
    { long: 13.193751, lat: 55.700382, name: "Lund", group: "A", size: 10 }, //A=10 meters
    { long: 16.507220, lat: 59.377419, name: "Eskilstuna", group: "B", size: 5 }, //B=5 meters
    { long: 12.054180, lat: 57.794617, name: "Angered Gothenburg", group: "B", size: 5 },
    { long: 14.228592, lat: 57.786204, name: "Jonkoping", group: "A", size: 10 },
    { long: 17.940392, lat: 62.628398, name: "Harnosand", group: "B", size: 5 },
    { long: 14.525064, lat: 59.322308, name: "Karlskoga", group: "B", size: 5 },
    { long: 15.588679, lat: 56.172058, name: "Karlskrona", group: "B", size: 5 },
    { long: 13.511985, lat: 59.39759, name: "Karlstad", group: "B", size: 5 },
    { long: 15.631488, lat: 58.405759, name: "Linkoping", group: "B", size: 5 },
    { long: 12.991470, lat: 55.606526, name: "Malmo", group: "B", size: 5 },
    { long: 17.081623, lat: 58.673954, name: "Oxelosund", group: "C", size: 3 }, //3 meter
    { long: 18.079153, lat: 59.313125, name: "Stockholm", group: "A", size: 10 },
    { long: 17.637603, lat: 59.863359, name: "Uppsala", group: "A", size: 10 },
    { long: 18.300371, lat: 57.635879, name: "Visby", group: "B", size: 5 },
    { long: 16.535657, lat: 59.605114, name: "Vasteras", group: "B", size: 5 },
    { long: 14.816219, lat: 56.872556, name: "Vaxjo", group: "B", size: 5 },
    { long: 15.194563, lat: 59.262399, name: "Orebro", group: "A", size: 10 },
    { long: 17.635905, lat: 59.190682, name: "Sodertalje", group: "B", size: 5 },

];


// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function (data) {

    // Filter data
    data.features = data.features.filter(function (d) { return d.properties.name == "Sweden" })

    // Create a color scale
    var color = d3.scaleOrdinal()
        .domain(["A", "B", "C"])
        .range(["#00b0b0", "#1F88C4", "#7A8DA2"]);

    // Scale for bubble size
    var size = d3.scaleLinear()
        .domain([1, 100])  // What's in the data
        .range([4, 50])  // Size in pixel


    // Draw the map
    svg2.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("fill", "#DCEFED")
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .style("stroke", "white")
        .style("opacity", 1)
    //.............................................................................      

    // create a tooltip
    var Tooltip = d3.select("#mapidtooltip")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 1)
        .style("background-color", "white")
        .style("color", "#00B0B0")
        .style("padding", "5px")


    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
        Tooltip.style("opacity", 1)
    }

    var mousemove = function (d) {
        Tooltip
            .html(d.name + "<br>" + "Height" + "<br>" + d.size + " meters")
            .style("left", (d3.mouse(this)[0] + 10) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
    }

    var mouseleave = function (d) {
        Tooltip.style("opacity", 0)
    }

    //.............................................................................   

    // Add circles:
    svg2
        .selectAll("myCircles")
        .data(markers)
        .enter()
        .append("circle")
        .attr("class", function (d) { return d.group })
        .attr("cx", function (d) { return projection([d.long, d.lat])[0] })
        .attr("cy", function (d) { return projection([d.long, d.lat])[1] })
        .attr("r", function (d) { return size(d.size) })
        .style("fill", function (d) { return color(d.group) })
        .attr("stroke", function (d) { return color(d.group) })
        .attr("stroke-width", 0.1)
        .attr("fill-opacity", .5)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)





    // This function is gonna change the opacity and size of selected and unselected circles
    function update() {

        // For each check box:
        d3.selectAll(".checkbox").each(function (d) {
            cb = d3.select(this);
            grp = cb.property("value")

            // If the box is check, I show the group
            if (cb.property("checked")) {
                svg2.selectAll("." + grp).transition().duration(1000).style("opacity", 1).attr("r", function (d) { return size(d.size) })

                // Otherwise I hide it
            } else {
                svg2.selectAll("." + grp).transition().duration(1000).style("opacity", 0).attr("r", 0)
            }
        })
    }

    // When a button change, run the update function
    d3.selectAll(".checkbox").on("change", update);

    // initialize it at the beginning
    update()
});

//...........Button Level 1................................................
var firstLevel = [

    { "name": "102C", "height": 1, "size": 3.0 },
    { "name": "201A", "height": 1, "size": 2.1 },
    { "name": "100A", "height": 3, "size": 2.5 },
    { "name": "100B", "height": 1, "size": 1.1 },
    { "name": "100A", "height": 5, "size": 1.2 },
    { "name": "020C", "height": 1, "size": 2.1 },
    { "name": "020B", "height": 1, "size": 2.3 },
    { "name": "020A", "height": 1, "size": 2.1 },
    { "name": "020A", "height": 3, "size": 2.2 },
    { "name": "101A", "height": 1, "size": 2.7 },
    { "name": "101B", "height": 1, "size": 2.4 },
    { "name": "101B", "height": 3, "size": 1.7 },
    { "name": "101C", "height": 1, "size": 1.2 },
    { "name": "101C", "height": 3, "size": 2.7 },
    { "name": "100B", "height": 3, "size": 2.2 },
    { "name": "010B", "height": 1, "size": 2.7 },
    { "name": "010B", "height": 3, "size": 2.3 },
    { "name": "010C", "height": 1, "size": 2.7 },
    { "name": "010C", "height": 3, "size": 2.1 },
    { "name": "100C", "height": 1, "size": 2.5 }
];

function newDive1() {
    var randomNumber = Math.floor(Math.random() * (firstLevel.length));


    document.getElementById("level1code").innerHTML = firstLevel[randomNumber].name;
    document.getElementById("level1height").innerHTML = firstLevel[randomNumber].height;
    document.getElementById("level1DD").innerHTML = firstLevel[randomNumber].size;
} 

//...........Button Level 2................................................
var secLevel = [

    { "name": "010A", "height": 1, "size": 5.0 },
    { "name": "010C", "height": 3, "size": 2.1 },
    { "name": "010B", "height": 5, "size": 2.1 },
    { "name": "010A", "height": 3, "size": 2.2 },
    { "name": "101B", "height": 3, "size": 2.1 },
    { "name": "101C", "height": 3, "size": 2.3 },
    { "name": "101A", "height": 3, "size": 2.1 },
    { "name": "102B", "height": 1, "size": 2.4 },
    { "name": "102C", "height": 3, "size": 2.1 },
    { "name": "100C", "height": 5, "size": 1.1 },
    { "name": "020A", "height": 3, "size": 2.5 },
    { "name": "020C", "height": 3, "size": 2.6 },
    { "name": "201B", "height": 3, "size": 2.5 },
    { "name": "201C", "height": 3, "size": 5.0 },
    { "name": "100C", "height": 3, "size": 2.7 },
    { "name": "301", "height": 1, "size": 2.5 }
];

function newDive2() {
    var randomNumbertwo = Math.floor(Math.random() * (secLevel.length));


    document.getElementById("level2code").innerHTML = secLevel[randomNumbertwo].name;
    document.getElementById("level2height").innerHTML = secLevel[randomNumbertwo].height;
    document.getElementById("level2DD").innerHTML = secLevel[randomNumbertwo].size;
}
//...........Button Level 3................................................

var thirdLevel = [

    { "name": "201C", "height": 1, "size": 5.0 },
    { "name": "201C", "height": 3, "size": 2.1 },
    { "name": "010B", "height": 7.5, "size": 2.1 },
    { "name": "100B", "height": 5, "size": 2.5 },
    { "name": "010C", "height": 5, "size": 5.0 },
    { "name": "103C", "height": 1, "size": 2.7 },
    { "name": "103C", "height": 3, "size": 1.7 },
    { "name": "100A", "height": 10, "size": 2.1 },
    { "name": "301C", "height": 3, "size": 2.7 },
    { "name": "302C", "height": 1, "size": 2.2 },
    { "name": "302C", "height": 3, "size": 4.7 },
    { "name": "200A", "height": 5, "size": 2.7 },
    { "name": "200A", "height": 3, "size": 4.7 },
    { "name": "101A", "height": 1, "size": 3.7 },
    { "name": "100A", "height": 7.5, "size": 2.7 },
    { "name": "401A", "height": 1, "size": 2.5 }
];

function newDive3() {
    var randomNumber = Math.floor(Math.random() * (thirdLevel.length));


    document.getElementById("level3code").innerHTML = thirdLevel[randomNumber].name;
    document.getElementById("level3height").innerHTML = thirdLevel[randomNumber].height;
    document.getElementById("level3DD").innerHTML = thirdLevel[randomNumber].size;
}