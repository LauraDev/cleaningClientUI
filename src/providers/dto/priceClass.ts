import { Injectable } from '@angular/core';

@Injectable()

export class PriceClass {
    
  pack0 = [
    
    { type: 'Quick Tidy Up',
      service: '1h - basics', 
      price: '$10'},
    
    { type: 'Full Cleaning',
      service: '1h30 - deep cleaning', 
      price: '$15'},
     

    { type: 'Spring Cleaning',
      service: '2h - full cleaning', 
      price: '$18'}
    
  ];

pack1 = [
    
    {type: 'Quick Tidy Up',
    service: '1h30 - basics', 
    price: '$15'},
    
    {type: 'Full Cleaning',
    service: '2h - deep cleaning', 
    price: '$19'},
    
    {type: 'Spring Cleaning',
    service: '2h30 - full cleaning', 
    price: '$22'},
    
];

  pack2 = [
    
    {type: 'Quick Tidy Up',
    service: '2h - basics', 
    price: '$20'},
    
    {type: 'Full Cleaning',
    service: '2h30 - deep cleaning', 
    price: '$25'},
    
    {type: 'Spring Cleaning',
    service: '3h - full cleaning', 
    price: '$30'},
    
  ]

pack3 = [
    
    {type: 'Quick Tidy Up',
    service: '2h30 - basics', 
    price: '$25'},
    
    {type: 'Full Cleaning',
    service: '3h - deep cleaning', 
    price: '$30'},
    
    {type: 'Spring Cleaning',
    service: '3h30 - full cleaning', 
    price: '$35'},
    
]

pack4 = [
    
    {type: 'Quick Tidy Up',
    service: '3h - basics', 
    price: '30'},
    
    {type: 'Full Cleaning',
    service: '3h30 - deep cleaning', 
    price: '$35'},
    
    {type: 'Spring Cleaning',
    service: '4h - full cleaning', 
    price: '$40'},
    
  ]


}