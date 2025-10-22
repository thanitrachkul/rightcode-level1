// Drag and drop logic for Level 1

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.item');
  const targets = document.querySelectorAll('.target-area');
  const overlay = document.getElementById('success-overlay');
  const resetButton = document.getElementById('reset-button');
  const resetButtonTop = document.getElementById('reset-button-top');
  const progressBar = document.getElementById('progress-bar');
  const itemsGrid = document.querySelector('#items-area .items-grid');
  let placedCount = 0;

  // Update progress bar width based on placed items
  function updateProgress() {
    const totalItems = items.length;
    const percent = (placedCount / totalItems) * 100;
    if (progressBar) {
      progressBar.style.width = `${percent}%`;
    }
  }

  items.forEach(item => {
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', item.dataset.type);
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
  });

  targets.forEach(target => {
    target.addEventListener('dragover', e => {
      e.preventDefault();
      target.classList.add('hovered');
    });
    target.addEventListener('dragleave', () => {
      target.classList.remove('hovered');
    });
    target.addEventListener('drop', e => {
      e.preventDefault();
      target.classList.remove('hovered');
      const itemType = e.dataTransfer.getData('text/plain');
      if (itemType === target.dataset.type && !target.hasChildNodes()) {
        const dragged = document.querySelector(`.item[data-type="${itemType}"]`);
        target.appendChild(dragged);
        dragged.style.cursor = 'default';
        dragged.setAttribute('draggable', 'false');
        placedCount++;
        updateProgress();
        checkCompletion();
      } else {
        // Incorrect placement feedback
        target.classList.add('shake');
        setTimeout(() => target.classList.remove('shake'), 500);
      }
    });
  });

  function checkCompletion() {
    if (placedCount === items.length) {
      overlay.style.display = 'flex';
    }
  }

  // Reset the game to the initial state
  function resetGame() {
    items.forEach(item => {
      item.setAttribute('draggable', 'true');
      itemsGrid.appendChild(item);
      item.style.cursor = 'grab';
    });
    placedCount = 0;
    updateProgress();
    overlay.style.display = 'none';
  }

  resetButton.addEventListener('click', resetGame);
  if (resetButtonTop) {
    resetButtonTop.addEventListener('click', resetGame);
  }
});
