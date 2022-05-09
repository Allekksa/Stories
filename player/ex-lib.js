/**
 * Инициализирует плеер Stories по заданным параметрам
 * 
 * @param {{
 * target: string
 * slides: Array<{url: string, alt?:string}>
 * delayPerSlide?:number
 * }} params - параметры инициализации:
 * 
 * 1.target - место инициализации плеера, CSS селектор
 * 2.slides - список слайдов плеера
 * 3.delayPerSlide - как долго показывать один слайд
 * 
 * @return {Element||null} 
 */


function initPlayer (params) {
  const target = document.querySelector(params.target);

  if(params === null && params.slides === undefined) {
    return null
  }

  let timelineItems = '';
  let playerItems = '';
  let isFirst = true;
  let timer;

  for(const slide of params.slides) {
    timelineItems += generateTimeLineItem (isFirst);

    playerItems += generatePlayerItem(slide, isFirst);
    
    isFirst = false;
  }

  target.innerHTML = generatePlayerLayout();

  target.querySelector('.player-prev').addEventListener('click', switchPrevSlide);
  
  target.querySelector('.player-next').addEventListener('click', switchNextSlide);
  

  function generatePlayerLayout() {
    return `
    <div class="stories-container">
      <div class="timeline flex">
        ${timelineItems}
      </div>
      <div class="player-content-wrapper">
        <div class="player-content-switcher player-prev"></div>
        <div class="player-content-switcher  player-next"></div>
        <div class="player-content">
          ${playerItems}
        </div>
      </div>
    </div>`;
  }

  function generateTimeLineItem (isFirst) {
    return `
    <div class="timeline-item ${isFirst ? 'timeline-active' : ''}">
      <div class="timeline-status"></div>
    </div>`;
  }

  function generatePlayerItem (slide, isFirst) {

  const style = [];

    if(slide.filter) {
      style.push(`filter: ${slide.filter.join(' ')}`)
    }

    return `
    <div class="player-item ${isFirst ? 'img-active' : ''}">
      <img src="${slide.url}" alt="${slide.alt || ''}" class="player-img" style="${style.join(';')}">
      ${generateOverlays(slide)}
    </div>`;

  }

function generateOverlays(slide) {
  if (slide.overlays === undefined) {
    return '';
  }

  let res = '';

  for( const el of slide.overlays) {
    const classes = el.classes !== undefined ? el.classes.join(' ') : '';

    const styles = (el.styles !== undefined ? Object.entries(el.styles) : [])
    .map((el) => el.join(':'))
    .join(';');

    res += `<div class="player-item-overlay ${classes}" style="${styles}">${renderOverlay(el)}</div>`;
  }

  return res;

  function renderOverlay(overlay) {
    if (overlay.type === 'text') {
      return overlay.value;
    }


    if(overlay.type === 'question') {
      return `
      <div class="question">${overlay.question}
        <div class="flex question-answers">
          <button value="1" class="btn">${overlay.variants[0] || 'Да'}</button>
          <button value="2" class="btn">${overlay.variants[1] || 'Нет'}</button>
        </div>
      </div>`;
    }

    return '';
  }
}


  function moveClass(activeClassName, method) {
  const active = target.querySelector('.' + activeClassName);
  const next = active[method]
    if(next) {
      next.classList.add(activeClassName); 
      active.classList.remove(activeClassName);
      return active
      }
      
  }


  function switchNextSlide() {
    const el =  moveClass('timeline-active', 'nextElementSibling');

    if (el) {
      el.querySelector('.timeline-status').style.width = '';
    }
  
    moveClass('img-active','nextElementSibling');
  }

  function switchPrevSlide() {
    const el =  moveClass('timeline-active','previousElementSibling');
    
    if (el) {
      el.querySelector('.timeline-status').style.width = '';
    }
    
    moveClass('img-active','previousElementSibling');
  }


  function runInterval(time, step) {
    clearInterval(timer);
    timer = setInterval(() => {
    
      const active = target.querySelector('.timeline-active').querySelector('.timeline-status');
    
      const w = parseFloat(active.style.width) || 0;
    
      if(w === 100){
        switchNextSlide()
        return;
      }
  
      active.style.width = String(w + step) + '%';
    }, (time || 1) * 1000 * (step || 1) / 100);
 
    

  }


  runInterval(params.delayPerSlide || 1, 1)
}







