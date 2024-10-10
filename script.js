document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('originalSize').innerText = file.size;
    }
});

document.getElementById('compressButton').addEventListener('click', function() {
    // Add compression logic here
    alert('Compress function not implemented yet.');
});

document.getElementById('decompressButton').addEventListener('click', function() {
    // Add decompression logic here
    alert('Decompress function not implemented yet.');
});
