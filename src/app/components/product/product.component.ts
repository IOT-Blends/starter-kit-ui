import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productList!: Product[];
  constructor() { }

  ngOnInit(): void {
    this.productList = [
      {
        productId: '1',
        productName: 'starterKit',
        productDescription: 'Starter Kit enables the user to start/stop a water pump. View logs of current usage & the phase in which the motor is running'
      },
      {
        productId: '2',
        productName: 'iotArduino',
        productDescription: 'IoT Arduino Kit enables the user to program & device using Arduino using temperature, accelerometer and Pid sensor'
      },
      {
        productId: '2',
        productName: 'iotNodeMCU',
        productDescription: 'IoT NodeMCU Kit enables the user to program & device using NodeMCU board & Arduino IDE using LM motor driver unit'
      }
    ]
  }

}
