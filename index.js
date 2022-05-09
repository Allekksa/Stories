import Player from './player/lib.js';

new Player({
  target: '.my-player',
  delayPerSlide: 5,    

  slides: [
    {
      url: './img/caju-gomes-ei1b2XYs9IQ-unsplash.jpg', 
      alt: 'Slide1', 

      filter: ['contrast(150%)', 'blur(5px)'],

      overlays: [
        {
          type: 'Text',
          text: 'Здесь что-то написано',

          classes: ['watercolor'],

          styles: {
            bottom: '30%',
            left: '20%'
          }
        },

        {
          type: 'Question',
          question: 'Вопрос?',

          variants: [
            'Да',
            'Нет'
          ],

          styles: {
            top: '30%',
            left: '20%'
          }
        }
        // {
        //     type: 'text',
        //     value: 'Привет',

        //     styles: {
        //       color: '#ffffff',
        //       'font-size': '20px',
        //       'text-shadow': '1px 1px #000',

        //       bottom: '10%',
        //       right: '30%',

        //       transform: 'rotate(90deg)',
        //       animation: 'scale 5s infinite ease-in-out'
        //     }
          
        //   }
      ]


    },

    {
      url: './img/ehimetalor-akhere-unuabona-m88KjxtsS7k-unsplash.jpg', 
      alt: 'Slide2',

      overlays: [
        {
          type: 'Text',
          text: 'Здесь тоже что-то есть',

          classes: ['watercolor'],

          styles: {
            
            bottom: '30%',
            left: '20%'
          }
        }
      ]


    },
      
    

    {
      url: './img/mathilde-langevin-D4262Knib58-unsplash.jpg', 
      alt: 'Slide3'
    },

    {
      url: './img/rizky-sabriansyah-AXjWtpjEq_Q-unsplash.jpg', 
      alt: 'Slide4'
    },
  ],
 
  
})



