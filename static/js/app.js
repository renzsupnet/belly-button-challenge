// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
    console.log(metadata);

    // Filter the metadata for the object with the desired sample number
    let results = metadata.filter(data => data.id == sample);
    console.log(results);

    // Get the first result in the array since the results are an array of arrays
    let result = results[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("")

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    })
  })
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    console.log(data);

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let results = samples.filter(data => data.id == sample);
    console.log(results);
    let result = results[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Build a Bubble Chart
    let trace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    }

    let layout = {
      title: 'Bacteria Cultures Per Sample',
      showLegend: false,
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria' },
    }

    // Render the Bubble Chart
    Plotly.newPlot('bubble', [trace], layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    otu_ids = otu_ids.map(id => `OTU ${id}`);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let traceBar = {
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    }

    let layoutBar = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria' }
    }

    // Render the Bar Chart
    Plotly.newPlot('bar', [traceBar], layoutBar);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    buildCharts(data.names[0]);
    buildMetadata(data.names[0]);

    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
