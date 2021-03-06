$(document).ready(function () {

    function AppViewModel() {

        //N out of sample N percent calculation//
        this.totalN = ko.observable();
        this.reportedN = ko.observable();
        this.reportedPercResult = ko.computed(
            function () {
                return (this.reportedN()) / (this.totalN()) * 100
            }, this);

        this.assumedPercResult = ko.computed(
            function () {
                return ((this.totalN() - (this.reportedN())) / (this.totalN())) * 100
            }, this);


        //Percent out of 100 calculation//
        this.givenPerc = ko.observable();
        this.percResult = ko.computed(function () {
            return 100 - (this.givenPerc())
        }, this);


        //SEM to SD calculation
        this.SEM = ko.observable();
        this.semN = ko.observable();
        this.sdResult = ko.computed(
            function () {
                return Math.round((Math.sqrt(this.semN())) * (this.SEM()) * 100) / 100
            }, this);

        //CI to SD Calculations
        this.upperBound = ko.observable();
        this.lowerBound = ko.observable();
        this.ciN = ko.observable();
        this.selectedCiValue = ko.observable();

        this.ciSdResult = ko.computed(
               function () {
                   return Math.round(((this.upperBound() - this.lowerBound()) * Math.sqrt(this.ciN()) / (2 * this.selectedCiValue()))* 100) / 100
               }, this);


    }
    ko.applyBindings(new AppViewModel(), $(".container")[0]);
});


//Row Deletion for Dynamic Table //

function deleteRow(row) {

    var rowCount = $('#InputTable tr').length;
    if (rowCount > 2) {

        document.getElementById('InputTable').deleteRow(rowCount - 1);
    }

 }

// Row Insertion for Dynamic Table//
function insRow() {
  var x = document.getElementById('InputTable');
  // copy the targeted row
  var new_row = x.rows[1].cloneNode(true);
  // get the total number of rows
  var len = x.rows.length;
  // set the innerHTML of the first row
  new_row.cells[0].innerHTML = len;

  var AppendTarget = (document.getElementById('AppendTarget'));

  // grab the input from the first cell and update its ID and value
  var inp1 = new_row.cells[1].getElementsByTagName('input')[0];
  inp1.id += len;
  inp1.value = '';

  // append the new row to the table
  AppendTarget.appendChild(new_row);
} /*Origin of source material for row addition and deletion function "http://stackoverflow.com/questions/6473111/add-delete-table-rows-dynamically-using-javascript" */


function calculateMSD() {

//------------------------------- Mean Calculations--------------------------------------//
  var sum = 0;
  var rowCount = $('#InputTable tr').length;
  //iterate through each textboxes and add the values
  $(".PatientV").each(function() {

    //add only if the value is number
    if (!isNaN(this.value) && this.value.length != 0) {
      sum += parseFloat(this.value);
    }

  });
  var totalMean = sum / (rowCount - 1);

  $("#totalMean").val(totalMean.toFixed(2));

//--------------------------------- SD Calculations---------------------------------//

  var SqrDiffSum = 0;

  $(".PatientV").each(function () {

      //add only if the value is number
      if (!isNaN(this.value) && this.value.length != 0) {
          SqrDiffSum += Math.pow((parseFloat(this.value) - totalMean), 2);
      }

  });

  var totalSD = Math.sqrt(SqrDiffSum / (rowCount - 1));
  $("#totalSD").val(totalSD.toFixed(2));

}
