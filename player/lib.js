import ClassSwitcher from './class-switcher.js';

import { Overlay } from './overlays/overlay.js';
import * as overlays from './overlays/index.js';


/**
 * @typedef {{url: string, alt?:string, overlays?: Overlay[]}}
 */
const Slide = null;

/**
 * @type {Slide[]}
 */

 const Slides = null;

export default class Player {
  /**
   * Контейнер для плеера
   * @type {Element}
 */
  target; 

/**
 * Cписок слайдов плеера
 *  @type {Slides}
 */

  slides;

  /**
   * Как долго показывать один слайд
 *  @type {number}
 */
  delayPerSlide = 1;

  /**
   * Экземпляр ClassSwitcher
   * @protected
   */
  cs;
 /**
 * Создает объект плеер
 * @param {{
 *  target: string
 *  delayPerSlide?:number
 *  slides: Slides
 * 
 * }} params - параметры инициализации:
 * 
 *  1.target - место инициализации плеера, CSS селектор
 *  2.delayPerSlide - как долго показывать один слайд
 *  3.slides - список слайдов плеера
 */
  
  constructor(params) {
    this.target = document.querySelector(params?.target);

    if(this.target == null) {
      throw new ReferenceError('A target to mount the player is not specified')
    }
  
    this.slides = params.slides;

    if(!Array.isArray(this.slides)) {
      throw new TypeError('Slides to render is not specified')
    }
    
    this.delayPerSlide = params?.delayPerSlide ?? this.delayPerSlide;

    this.cs = new ClassSwitcher(this.target);

    this.mount();
  }

  /**
   * Монтирует элементы плеера к target
   */
  mount() {

  this.target.appendChild(this.generatePlayerLayout());

    this.target.querySelector('.player-prev').addEventListener('click', this.cs.switchPrevSlide.bind(this.cs));
  
    this.target.querySelector('.player-next').addEventListener('click', this.cs.switchNextSlide.bind(this.cs));

    this.cs.runInterval(this.delayPerSlide, 1);
 
  }

/**
 * Генерирует элементы временной шкалы
 * @returns {DocumentFragment}
 */

  generateTimeLineItems () {
    const wrapper = document.createDocumentFragment();

    for (const i of this.slides.keys()) {
      const el = document.createElement('div');
      
      el.innerHTML =  `
        <div class="timeline-item ${ i === 0 ? 'timeline-active' : ''}">
          <div class="timeline-status"></div>
        </div>`
      
      wrapper.appendChild(el.children[0]);
    }
    return wrapper;    
  }


  /**
 * Генерирует элементы слайдов
 * @returns {DocumentFragment}
 */
  generatePlayerItems() {
    const wrapper = document.createDocumentFragment();


    for (const [i, slide] of this.slides.entries()) {
      const style = [];

      if(slide.filter) {
        style.push(`filter: ${slide.filter.join(' ')}`)
      }
      const el = document.createElement('div');
      el.innerHTML = `
      <div class="player-item ${ i === 0 ? 'img-active' : ''}">
        <img src="${slide.url}" alt="${slide.alt ?? ''}" class="player-img" style="${style.join(';')}">
      </div>`;

    const item = el.children[0];

    item.appendChild(this.generateOverlays(slide));

    wrapper.appendChild(item);
    
    }
    return wrapper; 
  }

  /**
   * Генерирует элементы наложения на слайд
   * @param {Slide} slide - объект слайда
   * @returns {DocumentFragment}
   */

  generateOverlays(slide) {
    const wrapper = document.createDocumentFragment();

    if (slide.overlays == null) {
      return wrapper;
    }

    for( const params of slide.overlays) {
      if(!(params.type in overlays)){
        throw new TypeError(`The specified type of overlay (${params.type}) is not defined`)
      }

      const overlay = new overlays[params.type](params);
      wrapper.appendChild(overlay.render());
        }
    return wrapper
  }

  /**
   * Гененрирует элементы плеера
   * @returns {Element}
   */
  generatePlayerLayout() {
    const timeline = document.createElement('div');

    timeline.setAttribute('class', 'timeline flex');
    timeline.appendChild(this.generateTimeLineItems());

    const playerContent = document.createElement('div');

    playerContent.setAttribute('class', 'player-content');
    playerContent.appendChild(this.generatePlayerItems());

    const contentWrapper = document.createElement('div');

    contentWrapper.setAttribute('class', 'player-content-wrapper');
    contentWrapper.innerHTML = `
    <div class="player-content-switcher player-prev"></div>
    <div class="player-content-switcher player-next"></div>`

    contentWrapper.appendChild(playerContent);
    
    const player = document.createElement('div');

    player.setAttribute('class', 'stories-container');
    player.appendChild(timeline);
    player.appendChild(contentWrapper);
       
    return player;
  }
}