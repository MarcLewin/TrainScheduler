
  var config = {
    apiKey: "AIzaSyBqEz10a75exL8yP1MggrsDR1D4stWT_CM",
    authDomain: "trainscheduler-dd3db.firebaseapp.com",
    databaseURL: "https://trainscheduler-dd3db.firebaseio.com",
    projectId: "trainscheduler-dd3db",
    storageBucket: "trainscheduler-dd3db.appspot.com",
    messagingSenderId: "907079408428"
  };
  firebase.initializeApp(config);

  var trainInfo = firebase.database();

$('#submitButton').on('click', function(){
	
	var trainName = $('#trainInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var firstTime = moment($('#timeInput').val().trim(), "HH:mm").format("");
	var frequency = $('#freqInput').val().trim();

	
	var newTrains = {
		name: trainName,
		tdestination: destination,
		tFirst: firstTime,
		trainfreq: frequency,
	}

	trainInfo.ref().push(newTrains);

	alert("Train added!");

	$('#trainInput').val("");
	$('#destinationInput').val("");
	$('#timeInput').val("");
	$('#freqInput').val("");

	return false;
});

trainInfo.ref().on("child_added", function(childSnapshot, prevChildKey){

	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().tdestination;
	var firstTime = childSnapshot.val().tFirst;
	var frequency = childSnapshot.val().trainfreq;

	var firstConverted = moment(firstTime, "HH:mm").subtract(1, "years");	
	var currentTime = moment();
	var differenceTime = moment().diff(moment(firstConverted), "minutes");
	var tRemainder = differenceTime % frequency;
	var MinutesTillTrain = frequency - tRemainder;
	
	var nextTrain = moment().add(MinutesTillTrain, "minutes");
	var convertedNextTrain = moment(nextTrain).format("hh:mm a");
	
	$("#table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + convertedNextTrain + "</td><td>" + MinutesTillTrain + "</td></tr>");

});