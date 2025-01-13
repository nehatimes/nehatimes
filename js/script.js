document.addEventListener("DOMContentLoaded", () => {
    const categoriesContainer = document.getElementById("categories");
    const galleryContainer = document.getElementById("gallery");
  
    // Load data from JSON
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        // Populate categories
        data.categories.forEach((category, index) => {
          const button = document.createElement("button");
          button.textContent = category.name;
          button.addEventListener("click", () => {
            displayGallery(category.images);
          });
          categoriesContainer.appendChild(button);
        });
  
        // Display the first category by default
        if (data.categories.length > 0) {
          displayGallery(data.categories[0].images);
        }
      });
  
    // Display gallery images
    function displayGallery(images) {
      galleryContainer.innerHTML = ""; // Clear current images
      images.forEach((imgSrc) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        galleryContainer.appendChild(img);
      });
    }
  });
  