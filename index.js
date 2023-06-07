document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const colorPaletteContainer = document.querySelector('.color-palette-container');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const colorInput = document.querySelector('#color');
    const modeInput = document.querySelector('#mode');

    const color = colorInput.value;
    const mode = modeInput.value;

    const apiUrl = `https://www.thecolorapi.com/scheme?hex=${encodeURIComponent(color)}&mode=${encodeURIComponent(mode)}&count=5&format=json`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error retrieving color scheme');
        }
        return response.json();
      })
      .then(data => {
        const colors = data.colors;
        
        colorPaletteContainer.innerHTML = ''; // Clear previous columns

        colors.forEach(color => {
          const column = document.createElement('div');
          column.classList.add('color-palette-column');
          column.style.backgroundColor = color.hex.value;

          const hexCode = document.createElement('p');
          hexCode.textContent = color.hex.value;

          column.appendChild(hexCode);
          colorPaletteContainer.appendChild(column);
        });
      })
      .catch(error => {
        console.log('Error fetching color scheme:', error);
      });
  });
});
