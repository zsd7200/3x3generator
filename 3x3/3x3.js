// initialize elements
let blocks = [];
let currBlock;

// fill array of blocks up
for (i = 0; i < 9; i++)
	blocks[i] = document.getElementById("block" + i);

// add event listeners for save button and setting current block
addBlockListeners();
$('#save').on("click", saveFunc);

// use jQuery to prevent default behavior (opening the file) and add the onDrop function
$('.gridBlock').on("dragenter dragstart dragend dragleave dragover drag drop", function (e) {e.preventDefault(); e.stopPropagation();});
$('.gridBlock').on("drop", onDrop);
$('.gridBlock').on("click", onClick);

// function to ade out/remove image once it's placed
$('.gridBlock').contextmenu(function (e) {
	e.preventDefault();
	let img = $('#img' + currBlock);
	img.fadeOut(200, function(e) { img.remove(); });
});

// drop image into place, from a file or direct online link
function onDrop(e)
{
	let data = e.originalEvent.dataTransfer.items;
	
	// handle drag and drop from local files
	if (data.length == 1)
	{
		if (data[0].type == "image/png" || data[0].type == "image/jpeg" || data[0].type == "image/bmp")
			readImage(data[0].getAsFile());
	}
	
	// handle drag and drop from another webpage
	else if (data.length == 3 && data[0].type == "text/plain" && data[1].type == "text/uri-list" && data[2].type == "text/html")
	{
		// create image element
		let img = document.createElement("img");
		img.classList.add("obj");
		img.height = 200;
		img.width = 200;
		img.id = "img" + currBlock;
		
		// set image source to image url
		data[0].getAsString(function(e) { img.src = e; });
		
		// fade in
		$('#block' + currBlock).append(img);
		$('#img' + currBlock).hide().fadeIn(200);
	}
		
	// clear transfer data after displaying image
	e.originalEvent.dataTransfer.clearData();
}

// handle file upload event
function onClick(e)
{
	let input = $('#file-input').unbind().click()[0]; // unbind prevents change from being fired multiple times
	$('#file-input').change(function() { readImage(input.files[0]); });
}

// helper function to read in an image
function readImage(p)
{
	// check to make sure something was passed in
	if (p)
	{
		// create filereader
		let reader = new FileReader();
	
		// create image element
		let img = document.createElement("img");
		img.classList.add("obj");
		img.file = p;
		img.height = 200;
		img.width = 200;
		img.id = "img" + currBlock;
		
		// use FileReader to read image from file
		reader.onload = (function(aImg) { 
			return function(e) { 
				aImg.src = e.target.result; 
			}; 
		})(img);
			
		reader.readAsDataURL(img.file);
			
		// fade in
		$('#block' + currBlock).append(img);
		$('#img' + currBlock).hide().fadeIn(200);	
	}
}

// save the grid as a PNG
function saveFunc(e)
{
	// use html2canvas to convert the grid div to an image
	html2canvas($('#grid')[0], { scale: 1 }).then(function(canvas) {
		canvas.imageSmoothingEnabled = false;
		let imgData = canvas.toDataURL();
		
		// create an "a" element containing grid.png and have it click itself
		let link = document.createElement('a');
		link.download = "grid.png";
		link.href = imgData;
		document.body.appendChild(link);
		link.click();
	});
}

// a for loop does not work for setting these listeners, so a helper function is required
function addBlockListeners()
{
	// set current block for dragenter
	blocks[0].addEventListener("dragenter", function(event) { currBlock = 0; });
	blocks[1].addEventListener("dragenter", function(event) { currBlock = 1; });
	blocks[2].addEventListener("dragenter", function(event) { currBlock = 2; });
	blocks[3].addEventListener("dragenter", function(event) { currBlock = 3; });
	blocks[4].addEventListener("dragenter", function(event) { currBlock = 4; });
	blocks[5].addEventListener("dragenter", function(event) { currBlock = 5; });
	blocks[6].addEventListener("dragenter", function(event) { currBlock = 6; });
	blocks[7].addEventListener("dragenter", function(event) { currBlock = 7; });
	blocks[8].addEventListener("dragenter", function(event) { currBlock = 8; });
	
	// set current block for contextmenu
	blocks[0].addEventListener("contextmenu", function(event) { currBlock = 0; });
	blocks[1].addEventListener("contextmenu", function(event) { currBlock = 1; });
	blocks[2].addEventListener("contextmenu", function(event) { currBlock = 2; });
	blocks[3].addEventListener("contextmenu", function(event) { currBlock = 3; });
	blocks[4].addEventListener("contextmenu", function(event) { currBlock = 4; });
	blocks[5].addEventListener("contextmenu", function(event) { currBlock = 5; });
	blocks[6].addEventListener("contextmenu", function(event) { currBlock = 6; });
	blocks[7].addEventListener("contextmenu", function(event) { currBlock = 7; });
	blocks[8].addEventListener("contextmenu", function(event) { currBlock = 8; });
	
	// set current block for click
	blocks[0].addEventListener("click", function(event) { currBlock = 0; });
	blocks[1].addEventListener("click", function(event) { currBlock = 1; });
	blocks[2].addEventListener("click", function(event) { currBlock = 2; });
	blocks[3].addEventListener("click", function(event) { currBlock = 3; });
	blocks[4].addEventListener("click", function(event) { currBlock = 4; });
	blocks[5].addEventListener("click", function(event) { currBlock = 5; });
	blocks[6].addEventListener("click", function(event) { currBlock = 6; });
	blocks[7].addEventListener("click", function(event) { currBlock = 7; });
	blocks[8].addEventListener("click", function(event) { currBlock = 8; });
}