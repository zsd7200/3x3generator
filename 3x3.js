// initialize block array
let blocks = [];
let currBlock;

// fill array of blocks up
for (i = 0; i < 9; i++)
	blocks[i] = document.getElementById("block" + i);

$('#save').on("click", saveFunc);

// use jQuery to prevent default behavior (opening the file) and add the onDrop function
$('.gridBlock').on("dragenter dragstart dragend dragleave dragover drag drop", function (e) {e.preventDefault(); e.stopPropagation();});
$('.gridBlock').on("drop", onDrop);

blocks[0].addEventListener("dragenter", function(event) { currBlock = 0; });
blocks[1].addEventListener("dragenter", function(event) { currBlock = 1; });
blocks[2].addEventListener("dragenter", function(event) { currBlock = 2; });
blocks[3].addEventListener("dragenter", function(event) { currBlock = 3; });
blocks[4].addEventListener("dragenter", function(event) { currBlock = 4; });
blocks[5].addEventListener("dragenter", function(event) { currBlock = 5; });
blocks[6].addEventListener("dragenter", function(event) { currBlock = 6; });
blocks[7].addEventListener("dragenter", function(event) { currBlock = 7; });
blocks[8].addEventListener("dragenter", function(event) { currBlock = 8; });

// drop image into place
function onDrop(e)
{
	let data = e.originalEvent.dataTransfer.files;
	let reader = new FileReader();
	
	if (data.length == 1)
	{
		// not using ImageType here because the program should only allow still images
		if (data[0].type == "image/png" || data[0].type == "image/jpeg" || data[0].type == "image/bmp")
		{
			console.log(currBlock);
			
			let img = document.createElement("img");
			img.classList.add("obj");
			img.file = data[0];
			img.height = 200;
			img.width = 200;
			$('#block' + currBlock).append(img);
			
			reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
			reader.readAsDataURL(data[0]);
		}
		
		else
			console.log(data[0].type);
	}
	
	else
		console.log("too many!");

	e.originalEvent.dataTransfer.clearData();
	console.log("File dropped");
}

// save the grid as a PNG
function saveFunc(e)
{
	// use html2canvas to convert the grid div to an image
	html2canvas($('#grid')[0], { scale: 1 }).then(function(canvas) {
		let imgData = canvas.toDataURL();
		
		// create an "a" element containing grid.png and have it click itself
		let link = document.createElement('a');
		link.download = "grid.png";
		link.href = imgData;
		document.body.appendChild(link);
		link.click();
	});
}