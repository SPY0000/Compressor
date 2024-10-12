// Handle file upload form submission
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var fileInput = document.getElementById('fileInput');
    var files = fileInput.files;

    if (files.length === 0) {
        alert("Please upload at least one file.");
        return;
    }

    // Display the file details
    var fileInfo = document.getElementById('fileInfo');
    fileInfo.innerHTML = "<h3>Uploaded Files:</h3>";

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fileName = file.name;
        var fileSize = (file.size / 1024 / 1024).toFixed(2); // Convert bytes to MB
        var fileType = file.type || "Unknown file type";

        fileInfo.innerHTML += `<p><strong>Name:</strong> ${fileName}<br><strong>Type:</strong> ${fileType}<br><strong>Size:</strong> ${fileSize} MB</p>`;

        // Determine the file type and process accordingly
        if (file.type.includes('image')) {
            handleImageFile(file);
        } else if (file.type.includes('video')) {
            handleVideoFile(file);
        } else if (file.type.includes('audio')) {
            handleAudioFile(file);
        } else if (file.type.includes('text') || file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            handleTextFile(file);
        } else {
            alert(`Unsupported file type: ${fileType}`);
        }
    }

    alert('Files processed successfully!');

    // You can further process the files here if needed
});

// Functions to handle different file types
function handleImageFile(file) {
    // Implement image handling logic (compression, preview, etc.)
    console.log(`Processing image file: ${file.name}`);
    // Add your image compression code here
}

function handleVideoFile(file) {
    // Implement video handling logic (compression, preview, etc.)
    console.log(`Processing video file: ${file.name}`);
    // Add your video compression code here
}

function handleAudioFile(file) {
    // Implement audio handling logic (compression, preview, etc.)
    console.log(`Processing audio file: ${file.name}`);
    // Add your audio compression code here
}

function handleTextFile(file) {
    // Implement text handling logic (compression, preview, etc.)
    console.log(`Processing text file: ${file.name}`);
    // Add your text compression code here
}

// Handle file upload form submission
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var fileInput = document.getElementById('fileInput');
    var files = fileInput.files;

    if (files.length === 0) {
        alert("Please upload at least one file.");
        return;
    }

    // Display the file details
    var fileInfo = document.getElementById('fileInfo');
    fileInfo.innerHTML = "<h3>Uploaded Files:</h3>";

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fileName = file.name;
        var fileSize = (file.size / 1024 / 1024).toFixed(2); // Convert bytes to MB
        var fileType = file.type || "Unknown file type";

        fileInfo.innerHTML += `<p><strong>Name:</strong> ${fileName}<br><strong>Type:</strong> ${fileType}<br><strong>Size:</strong> ${fileSize} MB</p>`;

        // Determine the file type and process accordingly
        if (file.type.includes('image')) {
            handleImageFile(file);
        } else if (file.type.includes('video')) {
            handleVideoFile(file);
        } else if (file.type.includes('audio')) {
            handleAudioFile(file);
        } else if (file.type.includes('text') || file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            handleTextFile(file);
        } else {
            alert(`Unsupported file type: ${fileType}`);
        }
    }

    alert('Files processed successfully!');

    // You can further process the files here if needed
});

// Functions to handle different file types
function handleImageFile(file) {
    // Implement image handling logic (compression, preview, etc.)
    console.log(`Processing image file: ${file.name}`);
    // Add your image compression code here
}

function handleVideoFile(file) {
    // Implement video handling logic (compression, preview, etc.)
    console.log(`Processing video file: ${file.name}`);
    // Add your video compression code here
}

function handleAudioFile(file) {
    // Implement audio handling logic (compression, preview, etc.)
    console.log(`Processing audio file: ${file.name}`);
    // Add your audio compression code here
}

function handleTextFile(file) {
    // Implement text handling logic (compression, preview, etc.)
    console.log(`Processing text file: ${file.name}`);
    // Add your text compression code here
}

// Function to compress a text file using a simple run-length encoding algorithm
function compressText(text) {
    let compressed = '';
    let count = 1;

    for (let i = 0; i < text.length; i++) {
        // Check if the current character is the same as the next one
        if (text[i] === text[i + 1]) {
            count++;
        } else {
            // If not, append the character and its count to the compressed string
            compressed += text[i] + (count > 1 ? count : '');
            count = 1; // Reset the count
        }
    }

    return compressed;
}

// Function to handle file upload and compression
document.getElementById("compressButton").addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0]; // Get the uploaded file

    if (file) {
        const reader = new FileReader();

        reader.onload = async (event) => {
            const text = event.target.result; // Get the file content
            const compressedText = compressText(text); // Compress the text

            // Create a Blob for the compressed text
            const blob = new Blob([compressedText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            // Create a download link for the compressed file
            const downloadLink = document.createElement("a");
            downloadLink.href = url;
            downloadLink.download = `compressed_${file.name}`;
            downloadLink.innerText = "Download Compressed File";
            document.getElementById("downloadLink").innerHTML = ''; // Clear previous links
            document.getElementById("downloadLink").appendChild(downloadLink);
        };

        reader.readAsText(file); // Read the uploaded text file as text
    } else {
        alert("Please select a text file to compress.");
    }
});

