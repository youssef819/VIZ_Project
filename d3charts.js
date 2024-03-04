let pitchWidth = 105;
let pitchHeight = 68;
let pitchMultiplier = 8;
let pitchColor = "#4CAF50"; // Green color for the pitch
let lineWidth = 3;
let lineColor = "white";
let width = pitchWidth * pitchMultiplier;
let height = pitchHeight * pitchMultiplier;
function draw_pitch(data,container){
  if(data!="False"){
var player_names_and_positions = data.map(player_data => [player_data[12], player_data[13]]);

  var data=data.map(POSITION => POSITION[13])


  var d=d3.group(data, v => v.length, d => d)
  var counts = Array.from(d, ([position, count]) => ({ position, count }));
  const margin = ({top: 450, right: 50, bottom: 20, left: 150})




  var container = d3.select(container)
  var svg = container.select("svg");

  if (svg.empty()) {
    // If the SVG doesn't exist, create a new one
    svg = container.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
      const pitch = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  } else {
    // If the SVG exists, remove its previous content
    svg.selectAll("*").remove();



  }
    
  const pitch = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

  
  const countsArray = Object.keys(counts).map(function(category) {
        return { category: category, count: counts[category] };
    });


const positionsToRetrieve = ["Forward", "Midfielder", "Defender"];

const pos = {};

for (const item of counts) {
  for (const position of positionsToRetrieve) {
    if (item.count.has(position)) {
      pos[position] = item.count.get(position);
    }
  }
} 
if (pos["Defender"] === undefined) {
  pos["Defender"] = [];
}
     if (pos["Midfielder"] === undefined) {
  pos["Midfielder"] = [];
}
     if (pos["Forward"] === undefined) {
  pos["Forward"] = [];
}
  var total=data.length
  var forwardpercentage = d3.format('.1%')(pos["Forward"].length/total)
  var defensepercentage = d3.format('.1%')(pos["Defender"].length/total)
  var midfielderpercentage = d3.format('.1%')(pos["Midfielder"].length/total)

  var Defense = pos["Defender"].length
  var Forward=pos["Forward"].length
  var Midfielder = pos["Midfielder"].length
  var area1 = pitch.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width / 3)
    .attr('height', height)
    .style('opacity', 0.5) // Adjust opacity
    .style('pointer-events', 'all') // Enable pointer events for the area
    .style('fill',pitchColor)
    .on('mouseover', () => handleMouseOver('Area 1 data',defensepercentage, Defense+" Buts \n","Défense"))

    .on('mouseout', () => handleMouseOut());
  var area2 = pitch.append('rect')
    .attr('x', width / 3)
    .attr('y', 0)
    .attr('width', width / 3)
    .attr('height', height)
    .style('opacity', 0.5)
    .style('pointer-events', 'all')
    .style('fill',pitchColor)
    .on('mouseover', () => handleMouseOver('Area 2 data',midfielderpercentage, Midfielder+" Buts","Milieu"))
    .on('mouseout', () => handleMouseOut());

  var area3 = pitch.append('rect')
    .attr('x', (2 * width) / 3)
    .attr('y', 0)
    .attr('width', width / 3)
    .attr('height', height)
    .style('opacity', 0.5)
    .style('pointer-events', 'all')
    .style('fill',pitchColor)
    .on('mouseover', () => handleMouseOver('Area 3 data',forwardpercentage,Forward+" Buts","Attaque"))
    .on('mouseout', () => handleMouseOut() );


  // Function to draw pitch lines
  function drawPitchLines() {
    const pitchLineData = getPitchLines();
    pitch.selectAll('.pitchLines')
      .data(pitchLineData)
      .enter().append('line')
      .attr('x1', d => d['x1'] * pitchMultiplier)
      .attr('x2', d => d['x2'] * pitchMultiplier)
      .attr('y1', d => d['y1'] * pitchMultiplier)
      .attr('y2', d => d['y2'] * pitchMultiplier)
      .style('stroke-width', lineWidth)
      .style('stroke', 'white') // Set the lines color to white
      .style('pointer-events', 'none') // Allow mouse events to pass through
      

  }
  const detailsText1 = pitch.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .style('fill', 'red')
    .style('font-size', '50')
    .style('font-weight', 'bold')
    .style('pointer-events', 'none');
  
    const detailsText2 = pitch.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .style('fill', 'red')
    .style('font-size', '30px')
    .style('font-weight', 'bold')
    .style('pointer-events', 'auto');

    const detailsText3 = pitch.append('text')
    .attr('text-anchor', 'bottom')
    .attr('dy', '0.35em')
    .style('fill', 'red')
    .style('font-size', '30px')
    .style('font-weight', 'bold')
    .style('pointer-events', 'auto');

  // Function to draw goalposts

  // Function to draw the center circle
  function drawCenterCircle() {
    const centerCircleRadius = 50;
    pitch.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', centerCircleRadius)
      .style('stroke-width', lineWidth)
      .style('stroke', 'white')
      .style('fill', 'none');
  }

  // Call the functions to draw pitch elements

  function drawGoalposts() {
    const goalpostWidth = 10;
    const goalpostHeight = 100;
    const goalpostColor = 'white';
  }

  // Call the function to draw goalposts
  drawPitchLines();
  drawCenterCircle();
  drawGoalposts();


  
  function handleMouseOver(data, goals,percentage,position) {
    console.log(percentage)

    // Display details text inside each area
    detailsText1.text(goals)
    detailsText2.text(percentage)
    detailsText3.text(position)
    detailsText2.text(percentage);


    // Adjust text position based on the area dimensions
    const areaWidth = width / 3;
    const areaHeight = height;
    const [mouseX, mouseY] = d3.pointer(event);


    // Check which area the mouse is over and adjust text position accordingly
    if (mouseX < areaWidth) {
      detailsText1.attr('x', areaWidth / 2).attr('y', areaHeight / 2 - 50);
      detailsText2.attr('x', areaWidth / 2).attr('y', areaHeight / 2 + 50);
      detailsText3.attr('x', areaWidth / 3).attr('y', areaHeight / 2 +150);
      var forwardPlayers = player_names_and_positions.filter(player => player[1] === 'Defender');
      var forwardPlayerNames = forwardPlayers.map(player => player[0]);
      const tooltipContent = forwardPlayerNames.map(player => `- ${player}.`).join('\n') + '\n';        
      tooltip.text(tooltipContent)
      .style('display', 'block')
      .style('left', `${event.pageX}px`)
      .style('top', `${event.pageY}px`)
      .style('white-space', 'pre-line');


    } else if (mouseX < 2 * areaWidth) {
      detailsText1.attr('x', width / 3 + areaWidth / 2).attr('y', areaHeight / 2 - 50);
      detailsText2.attr('x', width / 3 + areaWidth / 2).attr('y', areaHeight / 2 + 50);
      detailsText3.attr('x', width/3 + areaWidth / 3).attr('y', areaHeight / 2 +150);
      var forwardPlayers = player_names_and_positions.filter(player => player[1] === 'Midfielder');
      
      var forwardPlayerNames = forwardPlayers.map(player => player[0]);
      const tooltipContent = forwardPlayerNames.map(player => `- ${player}.`).join('\n') + '\n';        

      tooltip.text(tooltipContent)
      .style('display', 'block')
      .style('left', `${event.pageX}px`)
      .style('top', `${event.pageY}px`)
      .style('white-space', 'pre-line');


    } else {
      detailsText1.attr('x', (2 * width) / 3 + areaWidth / 2).attr('y', areaHeight / 2 - 50);
      detailsText2.attr('x', (2 * width) / 3 + areaWidth / 2).attr('y', areaHeight / 2 + 50);
      detailsText3.attr('x', (2 * width) / 3 + areaWidth / 3).attr('y', areaHeight / 2 + 150);

      var forwardPlayers = player_names_and_positions.filter(player => player[1] === 'Forward');
      var forwardPlayerNames = forwardPlayers.map(player => player[0]);
      const tooltipContent = forwardPlayerNames.map(player => `- ${player}.`).join('\n') + '\n';        

      tooltip.text(tooltipContent)
      .style('display', 'block')
      .style('left', `${event.pageX}px`)
      .style('top', `${event.pageY}px`)
      .style('white-space', 'pre-line');

    }


    // You can also adjust the appearance of the area in focus here
    d3.select(event.target).style('opacity', 1);
  }

  function handleMouseOut() {
    // Reset the appearance when the mouse leaves the area
    d3.selectAll('rect').style('opacity', 0.3);
    detailsText1.text('');
    detailsText2.text('');
    detailsText3.text('');
    tooltip.style('display', 'none');
  }
  var tooltip=svg.selectAll("g")
   .append('svg:title')
    .append('div')
    .attr('class', 'tooltip')
    .style('display', 'none')
    .style('position', 'absolute')
    .style('background-color', 'white')
    .style('padding', '5px')
    .style('border', '1px solid black');

  return svg.node();}
  else{
    return "Team did not participate in this season"
  }
}


function getPitchLines() {
    const lines = [];
    // left penalty box
    lines.push({x1: 0, x2: 16.5, y1: pitchHeight/2 - 11 - 9.15, y2: pitchHeight/2 - 11 - 9.15});
    lines.push({x1: 16.5, x2: 16.5, y1: 13.85, y2: pitchHeight/2 + 11 + 9.15});
    lines.push({x1: 0, x2: 16.5, y1: pitchHeight/2 + 11 + 9.15, y2: pitchHeight/2 + 11 + 9.15});
    // left six-yard box
    lines.push({x1: 0, x2: 5.5, y1: pitchHeight/2 - 9.15, y2: pitchHeight/2 - 9.15});
    lines.push({x1: 5.5, x2: 5.5, y1: pitchHeight/2 - 9.15, y2: pitchHeight/2 + 9.15});
    lines.push({x1: 0, x2: 5.5, y1: pitchHeight/2 + 9.15, y2: pitchHeight/2 + 9.15});
    // right penalty box
    lines.push({x1: pitchWidth - 16.5, x2: pitchWidth, y1: pitchHeight/2 - 11 - 9.15, y2: pitchHeight/2 - 11 - 9.15});
    lines.push({x1: pitchWidth - 16.5, x2: pitchWidth - 16.5, y1: pitchHeight/2 - 11 - 9.15, y2: pitchHeight/2 + 11 + 9.15});
    lines.push({x1: pitchWidth - 16.5, x2: pitchWidth, y1: pitchHeight/2 + 11 + 9.15, y2: pitchHeight/2 + 11 + 9.15});
    // right six-yard box
    lines.push({x1: pitchWidth - 5.5, x2: pitchWidth, y1: pitchHeight/2 - 9.15, y2: pitchHeight/2 - 9.15});
    lines.push({x1: pitchWidth - 5.5, x2: pitchWidth - 5.5, y1: pitchHeight/2 - 9.15, y2: pitchHeight/2 + 9.15});
    lines.push({x1: pitchWidth - 5.5, x2: pitchWidth, y1: pitchHeight/2 + 9.15, y2: pitchHeight/2 + 9.15});
    // outside borders
    lines.push({x1: 0, x2: pitchWidth, y1: 0, y2: 0});
    lines.push({x1: 0, x2: pitchWidth, y1: pitchHeight, y2: pitchHeight});
    lines.push({x1: 0, x2: 0, y1: 0, y2: pitchHeight});
    lines.push({x1: pitchWidth, x2: pitchWidth, y1: 0, y2: pitchHeight});
    // middle line
    lines.push({x1: pitchWidth/2, x2: pitchWidth/2, y1: 0, y2: pitchHeight});
    // left goal
    lines.push({x1: -1.5, x2: -1.5, y1: pitchHeight/2 - 7.32/2, y2: pitchHeight/2 + 7.32/2});
    lines.push({x1: -1.5, x2: 0, y1: pitchHeight/2 - 7.32/2, y2: pitchHeight/2 - 7.32/2});
    lines.push({x1: -1.5, x2: 0, y1: pitchHeight/2 + 7.32/2, y2: pitchHeight/2 + 7.32/2});
    // right goal
    lines.push({x1: pitchWidth + 1.5, x2: pitchWidth + 1.5, y1: pitchHeight/2 - 7.32/2, y2: pitchHeight/2 + 7.32/2});
    lines.push({x1: pitchWidth, x2: pitchWidth + 1.5, y1: pitchHeight/2 - 7.32/2, y2: pitchHeight/2 - 7.32/2});
    lines.push({x1: pitchWidth, x2: pitchWidth + 1.5, y1: pitchHeight/2 + 7.32/2, y2: pitchHeight/2 + 7.32/2});
    return lines;
  }

  function get_all_team_matchs_data(goals,players,data,team,season) {
    if(data!="False"){
    console.log(data)
    var selected_season=data.filter(row => (row[1] === season ))
    var selected_team=selected_season.filter(row => (row[3] == team || row[4] == team))
    if(selected_team.length===0){
      return "False"
    }
    else{
    var goal_scored = selected_team.map(row => 
      (row[3] === team) ? row[6] : row[7]
    );
    var selected_teams = selected_team.map((row, index) => {
      return { ...row, "goal_scored": goal_scored[index] };
    });
    var updatedData = [];

    selected_teams.forEach(matchData => {
      goals.forEach(player => {

        if (player[1] === matchData[0]) {
          // Create a new object for each match and add it to the updatedData array
          var updatedMatchData = Object.assign({}, matchData); // Clone the original matchData
          updatedMatchData[10] = player[2];
          updatedMatchData[11] = player[5];
          updatedData.push(updatedMatchData);
        }
      });
    });

      updatedData.forEach(matchData => {
      players.forEach(player => {
        if (player[0] === matchData[10]) {

          data.map((row,i) => {
          matchData[12] = player[2];
          matchData[13] = player[7];
          matchData[14] = player[5];
  
            })
        }
      });
    }); 
    }
    updatedData=updatedData.filter(row => (row[14] == team));

    return updatedData.slice(1)}
    else{
      return "Team did not participate in this season"
    }
  }
  


  
function piechart(matches, Season, Team,container,tooltip){

 



// Filtrer les matchs impliquant Manchester City pour une saison donnée
const manCityMatches = matches.filter(match => (match['3'] === Team || match['4'] === Team) && match['1'] === Season);
function getTeamsByOutcome(outcome) {
    // Créez un tableau vide pour stocker les noms d'équipe correspondants
    const teams = [];

    // Parcourez les matchs et ajoutez les équipes correspondantes en fonction du résultat
    manCityMatches.forEach(match => {
        if (outcome === 'Wins') {
            if (match['3'] === Team && match['6'] > match['7']) {
                teams.push(match['4']);
            } else if (match['4'] === Team && match['7'] > match['6']) {
                teams.push(match['3']);
            }
        } else if (outcome === 'Loses') {
            if (match['3'] === Team && match['6'] < match['7']) {
                teams.push(match['4']);
            } else if (match['4'] === Team && match['7'] < match['6']) {
                teams.push(match['3']);
            }
        } else if (outcome === 'Draws') {
            if (match['6'] === match['7']) {
                if (match['3'] === Team) {
                    teams.push(match['4']);
                } else if (match['4'] === Team) {
                    teams.push(match['3']);
                }
            }
        }
    });


    // Retourne le tableau contenant les noms d'équipe correspondants
    return teams;
}

  
// Compter le nombre de matchs nuls, gagnés et perdus
let draws = 0;
let wins = 0;
let losses = 0;
let non =0;

manCityMatches.forEach(match => {
    if (match['3'] === Team && match['6'] === match['7']) {
        draws++;
    } else if (match['4'] === Team && match['6'] === match['7']) {
        draws++;   
    } else if (match['3'] === Team && match['6'] > match['7']) {
        wins++;
    } else if (match['4'] === Team && match['7'] > match['6']) {
        wins++;
    } else {
        losses++;
    }
});

// Données pour le pie chart
const pieChartData = [
    { label: 'Draws', value: draws },
    { label: 'Wins', value: wins },
    { label: 'Loses', value: losses }
];

// Dimensions et paramètres du pie chart
const width = 300;
const height = 300;
const radius = Math.min(width, height) / 2;
const color = d3.scaleOrdinal(d3.schemeCategory10);
const margin = ({top: 150, right: 50, bottom: 0, left: 150})

var container = d3.select(container)
var svg = container.select("svg");

if (svg.empty()) {
  // If the SVG doesn't exist, create a new one
  svg = container.append("svg")
    .attr("width", width )//+ margin.left + margin.right
    .attr("height", height )//+ margin.top + margin.bottom
    .on('mouseleave', () => tooltip.style('display', 'none')); // Cacher la bulle d'information lorsque le curseur quitte le PieChart


} else {
  // If the SVG exists, remove its previous content
  svg.selectAll("*").remove();

}
const g = svg.append('g')

.attr('transform', `translate(${margin.left},${margin.top})`);  








//var container = d3.select(container)

//const svg = container.append("svg")
//.attr('top', margin.top)
//.attr('bottom', margin.bottom)
 //   .attr('width', width)
  //  .attr('height', height)
   // .on('mouseleave', () => tooltip.style('display', 'none')); // Cacher la bulle d'information lorsque le curseur quitte le PieChart
//const g = svg.append('g')
 //   .attr('transform', `translate(${margin.left},${margin.top})`);
    
    
  // Création de l'arc pour chaque tranche de pie chart
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

// Création de la fonction pie
const pie = d3.pie()
    .value(d => d.value);

// Tracer le pie chart
const arcs = g.selectAll('arc')
    .data(pie(pieChartData))
    .enter()
    .append('g')
    .on('mouseover', function(event, d) {
        // Réduire l'opacité de toutes les tranches sauf celle survolée
        arcs.style('opacity', 0.3);
        d3.select(this).style('opacity', 1);

        // Afficher la bulle d'information
        const teams = getTeamsByOutcome(d.data.label);
        
        const tooltipContent = teams.map(team => `- ${team}.`).join('\n') + '\n';        

        tooltip.text(tooltipContent)
               .style('display', 'block')
               .style('left', `${event.pageX}px`)
               .style('top', `${event.pageY}px`)
               .style('white-space', 'pre-line');
    })
    .on('mouseout', function() {
        // Restaurer l'opacité normale de toutes les tranches
        arcs.style('opacity', 1);
        
        // Masquer la bulle d'information lorsque le curseur quitte la tranche
        tooltip.style('display', 'none');
    });

    const newColorScale = d3.scaleOrdinal()
    .range(["#264b96", "#1ab862", "#bf212f"]);    
arcs.append('path')
    .attr('d', arc)
    .attr('fill', d => newColorScale(d.data.label));

// Créer des masques pour chaque tranche du pie chart
const defs = svg.append('defs');
//const maskGroup = defs.selectAll('mask')
    //.data(pie(pieChartData))
    //.enter()
    //.append('mask')
    //.attr('id', (_, i) => `mask-${i}`);

//maskGroup.append('path')
    //.attr('d', arc)
    //.attr('fill', 'black');

// Ajouter des images aux tranches du pie chart

// Ajouter les labels
arcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px')
    .text(d => `${d.data.label}:\n${d.data.value}`);
    
// Création de la bulle d'information (tooltip)
var tooltip = svg.append('svg:title')
   .append('div')
   .attr('class', 'tooltip')
   .style('display', 'none')
   .style('position', 'absolute')
   .style('background-color', 'black')
   .style('padding', '10px')
   .style('border', '3px solid black')
   .style('color', 'blue');

// Ajouter d'autres styles selon vos besoins
tooltip.style('color', 'blue')
       .style('font-size', '12px');

return svg.node();
}




function Plot_barchart(dataset,container) {
var width = 500;
var height = 400;
    // Initialiser les données de sortie avec les types de buts
      var output_data = {
        "right-footed": { "scored": 0 },
        "left-footed": { "scored": 0 },
        "penalty": { "scored": 0 },
        "own goal": { "scored": 0 },
        "header": { "scored": 0 },
        "free kick": { "scored": 0 },
        "bicycle kick": { "scored": 0 },
        "other": { "scored": 0 }
      };
      console.log(dataset)
      // Parcourir la dataset pour compter les buts marqués dans chaque type de but
      dataset.forEach(match => {
        var goal_type = match[11]; // Type de but
    
        // Vérifier le type de but et incrémenter le nombre de buts marqués dans ce type
        console.log(goal_type)

        switch (goal_type) {

          case "right-footed shot":
            output_data["right-footed"]["scored"]++;
            break;
          case "left-footed shot":
            output_data["left-footed"]["scored"]++;
            break;
          case "penalty":
            output_data["penalty"]["scored"]++;
            break;
          case "own goal":
            output_data["own goal"]["scored"]++;
            break;
          case "header":
            output_data["header"]["scored"]++;
            break;
          case "free kick":
            output_data["free kick"]["scored"]++;
            break;
          case "bicycle kick":
            output_data["bicycle kick"]["scored"]++;
            break;
          default:
            output_data["other"]["scored"]++;
        }
      });
      console.log(output_data)
    const unique_symbols = ["scored"];
    const goals_grouped = d3.rollup(
      Object.entries(output_data), // Convertir l'objet en tableau
      entries => unique_symbols.map(key => entries.reduce((acc, [_, value]) => acc + value[key], 0)),
      ([type]) => type);
    



      const margin = ({top: 50, right: 0 , bottom: 0, left: 23})
  
      var container = d3.select(container)
      var svg = container.select("svg");
      
      if (svg.empty()) {
        // If the SVG doesn't exist, create a new one
        svg = container.append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      
      
      } else {
        // If the SVG exists, remove its previous content
        svg.selectAll("*").remove();
      
      }

    
    const y = d3.scaleLinear()
      .domain([0, d3.max(goals_grouped, ([_, [scored]]) => Math.max(scored))])
      .range([height - margin.bottom, margin.top]);
    
    const x1 = d3.scaleBand()
      .domain([...goals_grouped.keys()])
      .padding(.2)
      .range([margin.left, width - margin.right]);
    
    const x2 = d3.scaleBand()
      .domain(["scored"])
      .padding(0)
      .range([0, x1.bandwidth()]);
    
    const g = svg.selectAll("g").data(goals_grouped)
      .enter()
      .append("g")
      .attr("transform", d => "translate(" + x1(d[0]) + ", 0)");
    
    const c = d3.scaleOrdinal(d3.schemeCategory10).domain(["scored"]);
    
    const rect=  g.selectAll("rect")
    

      .data(d => d[1])
      .enter()
      .append("rect")
      .attr("x", (d, i) => x2(unique_symbols[i]))
      .style("fill", "#014421")
      .attr("y", d => y(d))
      .attr("width", x2.bandwidth())
      .attr("height", d => height - y(d) - margin.bottom)
      .attr("fill", (d, i) => c(unique_symbols[i]))
      .each(function (d) {
        // Set initial opacity as a property of each rectangle's data
        d.initialOpacity = 1;
      })
      .on("mouseover", function(event, d) {
        const label = `${d} ${'scored'}`;
        tooltip.style("display", "block")
          .html(label)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
          console.log("hello")

          console.log(event.target)
          rect.style("opacity",0.2)
          d3.select(this).style("opacity", 1); // Retour à l'opacité par défaut

      })
      .on("mouseleave", function() {
        //tooltip.style("display", "none");
        d3.select(this).style("opacity", 0.2); // Retour à l'opacité par défaut
        rect.style("opacity",1)

      });
    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x1));
    
    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
    
    svg.append("g")
      .call(xAxis)
      .selectAll("text") // Sélectionnez tous les éléments texte de l'axe des abscisses

      .style("fill", "white") // Appliquez la couleur noire intense
      .style("font-weight", "bold");  // Make text bold

    
    svg.append("g")
      .call(yAxis)
      .selectAll("text") // Sélectionnez tous les éléments texte de l'axe des abscisses

      .style("fill", "white") // Appliquez la couleur noire intense
      .style("font-weight", "bold");  // Make text bold
    // Création de la bulle d'information (tooltip)
    const tooltip = svg.append('svg:title')
          .append('div')
          .attr('class', 'tooltip')
          .style('display', 'none')
          .style('position', 'absolute')
          .style('background-color', 'white')
          .style('padding', '5px')
          .style('border', '1px solid black');
    
    return svg.node();
    
    }