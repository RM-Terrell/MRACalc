function perc1() {
  a = document.form1.a.value;
  b = document.form1.b.value;
  document.form1.total1.value = Math.round((b / a) * 100 * 100) / 100;
}

function perc1a() {
  a = document.form1.a.value;
  b = document.form1.b.value;
  document.form1.total2.value = Math.round(((a - b) / a) * 100 * 100) / 100;
}

function perc2() /*Assumes 100% total and finds remaining percent from given*/ {
  this.c = document.form1.c.value;
  this.d = 100 - this.c;
  document.form1.total3.value = this.d;
}

function se() /*Converts SE to SD values*/ {
  this.e = document.form2.e.value;
  this.n = document.form2.n.value;
  this.d = Math.sqrt(n) * e;
  document.form2.d.value = Math.round(this.d * 100) / 100;
}

function ci() /*Figures out which CI% is beign used and cruncehs appropriatly*/ {
  this.u = parseFloat(document.form3.u.value);
  this.l = parseFloat(document.form3.l.value);
  this.n = parseFloat(document.form3.n.value);
  this.CIv = parseFloat(document.form3.CI.value);

  if (this.CIv == 90) {
    this.CIv = 1.645;
  } else if (this.CIv == 95) {
    this.CIv = 1.96;
  } else if (this.CIv == 98) {
    this.CIv = 2.33;
  } else if (this.CIv == 99) {
    this.CIv = 2.575;
  } else {
    this.CIv = "YOU BROKE IT"; /*Added this in order to throw an error in case user enters non standard value*/
  }

  this.d = ((this.u - this.l) * Math.sqrt(this.n) / (2 * this.CIv));
  document.form3.d.value = Math.round(this.d * 100) / 100;
}

function deleteRow(row) {
  var i = row.parentNode.parentNode.rowIndex;
  document.getElementById('InputTable').deleteRow(i);
}

function insRow() {
  var x = document.getElementById('InputTable');
  // copy the targeted row
  var new_row = x.rows[2].cloneNode(true);
  // get the total number of rows
  var len = x.rows.length - 1;
  // set the innerHTML of the first row
  new_row.cells[0].innerHTML = len;

  // grab the input from the first cell and update its ID and value
  var inp1 = new_row.cells[1].getElementsByTagName('input')[0];
  inp1.id += len;
  inp1.value = '';

  // append the new row to the table
  x.appendChild(new_row);
} /*Origin of source material for row additionand deletion function "http://stackoverflow.com/questions/6473111/add-delete-table-rows-dynamically-using-javascript" */

function IndivR() {

  document.getElementById("MSD").reset();
  document.getElementById("DynamicM").reset();
}

function calculateM() {

  var sum = 0;
  var rowCount = $('#InputTable tr').length;
  //iterate through each textboxes and add the values
  $(".PatientV").each(function() {

    //add only if the value is number
    if (!isNaN(this.value) && this.value.length != 0) {
      sum += parseFloat(this.value);
    }

  });
  var totalMean = sum / (rowCount - 2);

  $("#totalMean").val(totalMean.toFixed(2));

}

function calculateSD() {

  var sum = 0;
  var rowCount = $('#InputTable tr').length;
  //iterate through each textboxes and add the values
  $(".PatientV").each(function() {

    //add only if the value is number
    if (!isNaN(this.value) && this.value.length != 0) {
      sum += parseFloat(this.value);
    }

  });
  var totalMean = sum / (rowCount - 2);
  var SqrDiffSum = 0;

   $(".PatientV").each(function() {

    //add only if the value is number
    if (!isNaN(this.value) && this.value.length != 0) {
      SqrDiffSum += Math.pow((parseFloat(this.value)-totalMean),2);
    }

  });

  var totalSD = Math.sqrt(SqrDiffSum/(rowCount-2));
    $("#totalSD").val(totalSD.toFixed(2));
}