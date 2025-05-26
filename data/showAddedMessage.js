
export function showAddedMessage(productId, timeoutsId) {
    const addInput = document.querySelector(`.js-added-script-${productId}`);
  
    if (timeoutsId[productId]) {
      clearInterval(timeoutsId[productId]);
    }
  
    addInput.style.opacity = 1;
  
    timeoutsId[productId] = setTimeout(() => {
      addInput.style.opacity = 0;
      delete timeoutsId[productId];
    }, 2000);
  }