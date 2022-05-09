export default class ClassSwitcher {

  /**
   * Корневой элемент
   * @type {Element}
   */
  root;

  /**
   * Идентификатор таймера
   * @type {number|undefined}
   */
  timer;

  /**
   * 
   * @param {Element} root - корневой элемент
   */
  constructor(root) {
    this.root = root;

    if (!(this.root instanceof Element)){
      throw new TypeError('The root element is not defined')
    }
  }

   moveClass(activeClassName, method) {
    const active = this.root.querySelector('.' + activeClassName);
    const next = active[method]
      if(next) {
        next.classList.add(activeClassName); 
        active.classList.remove(activeClassName);
        return active
        }
        
    }

  switchNextSlide() {
     this.moveClass('img-active','nextElementSibling');
     
     const el =  this.moveClass('timeline-active', 'nextElementSibling');

    if (el) {
      el.querySelector('.timeline-status').style.width = '';
    }
  
  
  }

  switchPrevSlide() {
    const el =  this.moveClass('timeline-active','previousElementSibling');
    
    if (el) {
      el.querySelector('.timeline-status').style.width = '';
    }
    
    this.moveClass('img-active','previousElementSibling');
  }

 
runInterval(time, step) {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
    
      const active = this.root.querySelector('.timeline-active').querySelector('.timeline-status');
    
      const w = parseFloat(active.style.width) || 0;
    
      if(w === 100){
        this.switchNextSlide()
        return;
      }
  
      active.style.width = String(w + step) + '%';
    }, (time || 1) * 1000 * (step || 1) / 100);

  }

}