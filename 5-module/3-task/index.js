function initCarousel() {
  let carousel = document.querySelector('.carousel__inner');  
  let carouselArrows = document.querySelectorAll('.carousel__arrow'); 
  let slidesCount = document.querySelectorAll('.carousel__slide').length;
  let maxOffsetX = (slidesCount - 1) * carousel.offsetWidth * -1;

  hiddenArrow(0, maxOffsetX)

  for (const carouselArrow of carouselArrows) {
    carouselArrow.addEventListener('click', (event) => {
      let carouselArrowDiv = event.target.closest('div.carousel__arrow');
      if(!carouselArrowDiv) {
        return;
      }
      
      let offsetX = carouselArrowDiv.className.includes('right') ? -1 : 1;
      let currentOffsetValue = getOffsetX(carousel);
      let newOffsetValue = currentOffsetValue + offsetX * carousel.offsetWidth;
      carousel.style.transform = `translateX(${newOffsetValue}px)`;

      hiddenArrow(newOffsetValue, maxOffsetX);
    });
  }
}

function hiddenArrow(currentOffsetXValue, maxOffsetX){
  if(currentOffsetXValue === 0){
    document.querySelector('.carousel__arrow_left').style.display = 'none';
    return;
  }
  
  if(currentOffsetXValue === maxOffsetX){
    document.querySelector('.carousel__arrow_right').style.display = 'none';
    return;
  }
  
  document.querySelectorAll('.carousel__arrow').forEach(x => x.style.display = ''); 
}

function getOffsetX(carousel){
  return parseInt(carousel.style.transform.slice(11)) || 0;
}