let imageFile;
let compressedData;

// Event listener to capture the uploaded image
document.getElementById("imageInput").addEventListener("change", function (event) {
    imageFile = event.target.files[0];
});

// Function to compress the image using Run-Length Encoding (RLE)
function compressImage() {
    if (!imageFile) {
        alert("Please upload an image first.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const binaryData = event.target.result;
        const uint8Array = new Uint8Array(binaryData);

        // Apply RLE compression
        compressedData = applyCompression(uint8Array);
        
        // Display original and compressed sizes
        document.getElementById("originalSize").textContent = `Original Size: ${imageFile.size} bytes`;
        document.getElementById("compressedSize").textContent = `Compressed Size: ${compressedData.length} bytes`;

        // Download the compressed file
        const blob = new Blob([compressedData], { type: "application/octet-stream" });
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "compressed_image.bin";
        downloadLink.click();
    };
    reader.readAsArrayBuffer(imageFile);
}

// Compression function (Run-Length Encoding)
function applyCompression(uint8Array) {
    let compressed = [];
    let currentByte = uint8Array[0];
    let count = 1;

    for (let i = 1; i < uint8Array.length; i++) {
        if (uint8Array[i] === currentByte && count < 255) {
            count++;
        } else {
            compressed.push(currentByte, count);
            currentByte = uint8Array[i];
            count = 1;
        }
    }

    compressed.push(currentByte, count); // Handle the last byte
    return new Uint8Array(compressed);
}

// Decompression function (Restores the original image data)
function decompressImage() {
    if (!compressedData) {
        alert("No compressed data available. Please compress an image first.");
        return;
    }

    let decompressed = [];
    
    for (let i = 0; i < compressedData.length; i += 2) {
        const byte = compressedData[i];
        const count = compressedData[i + 1];
        for (let j = 0; j < count; j++) {
            decompressed.push(byte);
        }
    }

    const decompressedArray = new Uint8Array(decompressed);
    console.log('Decompressed Size:', decompressedArray.length, 'bytes');
    
    // You can add logic here to display the decompressed image, save it, etc.
}
// Function to compress the file
function compressFile() {
    const input = document.getElementById("fileInput");
    if (!input.files.length) {
        alert("Please upload a PDF, TXT, or XLSX file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const originalText = event.target.result;
        const compressedData = lzwCompress(originalText);
        const base64Compressed = btoa(compressedData); // Convert to base64 for readability

        // Display original and compressed sizes
        document.getElementById("originalSize").textContent = `Original Size: ${new Blob([originalText]).size} bytes`;
        document.getElementById("compressedSize").textContent = `Compressed Size: ${base64Compressed.length} bytes`; // Base64 size
        
        // Show the base64 string for the compressed data
        const outputArea = document.getElementById("outputArea");
        outputArea.value = base64Compressed; // Output as base64
    };
    reader.readAsBinaryString(input.files[0]); // Read the file as binary string
}

// Function to decompress the compressed base64 string
function decompressFile() {
    const base64Input = document.getElementById("outputArea").value;
    const compressedText = atob(base64Input); // Decode from base64
    const decompressedText = lzwDecompress(compressedText);
    alert("Decompressed Text: " + decompressedText); // Display the decompressed text
}

// LZW Compression Algorithm
function lzwCompress(uncompressed) {
    const dict = {};
    const result = [];
    let data = uncompressed.split("");
    let currChar;
    let phrase = data[0];
    let code = 256; // 0-255 are reserved for single characters

    for (let i = 1; i < data.length; i++) {
        currChar = data[i];
        if (dict[phrase + currChar]) {
            phrase += currChar;
        } else {
            result.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code++;
            phrase = currChar;
        }
    }

    result.push(phrase.length > 0 ? dict[phrase] : phrase.charCodeAt(0));
    return String.fromCharCode(...result);
}

// LZW Decompression Algorithm
function lzwDecompress(compressed) {
    const dict = {};
    let result = [];
    let currCode;
    let phrase = String.fromCharCode(compressed.charCodeAt(0));
    let oldPhrase = phrase;
    result.push(phrase);

    let code = 256; // Next available code

    for (let i = 1; i < compressed.length; i++) {
        currCode = compressed.charCodeAt(i);
        if (currCode < 256) {
            phrase = String.fromCharCode(currCode);
        } else {
            phrase = dict[currCode] ? dict[currCode] : (oldPhrase + oldPhrase.charAt(0));
        }

        result.push(phrase);
        dict[code++] = oldPhrase + phrase.charAt(0);
        oldPhrase = phrase;
    }
    
    return result.join("");
}

