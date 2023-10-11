console.log("Girl Dinner");

// var viz = new tableau.Viz(placeholderDiv, url, options)
let viz;

// Reference the placeholderDiv
const placeholderDiv = document.getElementById("vizContainer");

// Get a URL
const url =
  "https://public.tableau.com/views/CustomerActivityDashboard/CustomerActivity?:language=en-US&:display_count=n&:origin=viz_share_link";

// Create options for Viz
const options = { device: "desktop", height: "1100px", width: "1200px" };
function initViz() {
  //load viz
  viz = new tableau.Viz(placeholderDiv, url, options);
}

//Listen for the content to be loaded
document.addEventListener("DOMContentLoaded", initViz);

//Buttons
const exportpdfbutton = document.getElementById("exportPDF");

const exportpowerpoint = document.getElementById("exportPowerPoint");

const filterbutton = document.getElementById("FilterButton");

//Function to export PDF
function exportPDFfunction() {
  viz.showExportPDFDialog();
}

//Function to export to PowerPoint
function exportPowerPoint() {
  viz.showExportPowerPointDialog();
}

// add event listener to button
exportpdfbutton.addEventListener("click", exportPDFfunction);

exportpowerpoint.addEventListener("click", exportPowerPoint);

filterbutton.addEventListener("click", getRangeValues);

// Get range value (alt Shift down arrow to copy)
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);

  // need to get the active sheet, but this could be a dashboard or a worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();

  //inspect the sheets to filter
  console.log(sheets);

  //bring back sheet filter
  const sheetToFilter = sheets[9];
  console.log(sheetToFilter);

  //do the filtering
  sheetToFilter
    .applyRangeFilterAsync("CNTD(Customer ID)", {
      min: minValue,
      max: maxValue,
    })
    .then(alert("Filtered!"));
}
