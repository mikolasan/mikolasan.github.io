---
title: Electonics building blocks
date: 2023-11-04
published: 2023-11-04
lastModified: 2023-11-04
---

## Capacitive Soil Moisture Sensor


- One SOT-23 component marked as **662K** is 3.3V 200mA Positive Fixed LDO Voltage Regulator (XC6206P332MR) which gives the board an operating voltage range of 3.3
~ 5.5V
- And 555 timer. Be careful with greedy sellers that might put the wrong version of the timer that can only work with 5V. So verify this info with the datasheet. I have [NE555](https://www.ti.com/lit/ds/symlink/ne555.pdf) from Texas Instruments which only works from the voltage in the range between 4V and 16V. Instead it should be TLC555C or TLC555I or an outlier NE555 with a second line **20M**

It's a simple analog sensor, for compatibility with a Raspberry Pi (see, [no analog inputs](https://pinout.xyz/)) it will need an extra ADC converter. The Arduino analog input voltage is 1V max, and the output voltage of the capacitive sensor is about 3V (if powered by 3.3V), which means you have to use a voltage divider at the output of the sensor.

1. Open the serial port
2. Record the sensor value when the probe is exposed to the air. This is the minimum value of dry soil "Moist: 0%"
3. Take a cup of water and insert the probe into it (the probe, not the whole board)
4. Record the sensor value when the probe is exposed to the water. This is the maximum value of moist soil "Moist: 100%"

```c
void setup() {
  Serial.begin(9600);
}

void loop() {
  int val = analogRead(0); //connect sensor to Analog 0
  Serial.print(val);
  delay(100);
}
```

![Schematics of capacitive soil moisteru sensor](./capacitive-soil-moisture-sensor-v1.0.png)


Reference

- [Constant reading of 1023](https://forum.arduino.cc/t/capacitive-soil-moisture-sensor-v1-2/628094/8)
- [Schematics](https://raw.githubusercontent.com/Arduinolibrary/DFRobot_Capacitive_Soil_Moisture_Sensor/master/SEN0193%20%20Capacitive%20Soil%20Moisture%20SensorV1.0.PDF)
- [DFRobot wiki](https://wiki.dfrobot.com/Capacitive_Soil_Moisture_Sensor_SKU_SEN0193)
- [Adafruit alternative](https://www.adafruit.com/product/4026)
- [Check R1 resistor](https://www.youtube.com/watch?v=QGCrtXf8YSs) if readings are slow
- [Many sensors are defective](https://www.youtube.com/watch?v=IGP38bz-K48)


## T-Deck

Blackbery / Nokia clone

https://www.lilygo.cc/products/t-deck


## T-Display

Juicy display, favourite toy of [@Sulfuroid](https://twitter.com/sulfuroid)


https://www.lilygo.cc/products/t-display-s3-amoled


## All

- DAGU robot MINI DC gearbox DG01D 48:1
- Liyhium Poli Battery 3.7V 1300mAh
- [Qwiic motor driver](https://www.sparkfun.com/products/15451) (1.5 A peak drive per channel, 1.2 A steady state, Operates from 3 to 11 Volts with 12V absolute max, 3.3V default VCC and logic, Controllable by I2C or TTL UART signals) based on DRV8835. Similar chip [I reveiwed already](/make/robot/motor-board)
- Pi [Servo Hat](https://www.sparkfun.com/products/15316). 16 PWM channels, controllable over I2C
- [Accelerometer and gyroscope](https://www.sparkfun.com/products/18020). I2C, 3.3V operating voltage
- Passive Infrared (PIR) sensors are great for detecting motion in a small area around the sensor. 
- [MicroMod MikroBUS Carrier Board](https://www.sparkfun.com/products/18710) equipped with a MCP73831 Single-Cell Lithium-Ion/Lithium-Polymer Charge IC. It receives power from the USB connection and can source up to 450mA to charge an attached battery. PLus 3.3V 1A Voltage Regulator

## Ultrasonic distance sensor HC-SR04

- Operating Voltage: 5V DC
- Operating Current: 15mA
- Measure Angle: 15°
- Ranging Distance: 2cm - 4m
- Accuracy +-3mm

Despite many chips on the back side of this board, it does not use any protocols like I2C or SPI. But neither it requires analog-to-digital conerter.
It rather close to its physical properties, how a measurement signal sent about every 60 ms and received after some time. 1 uS = 58 cm


```c
/*
  SparkFun Inventor’s Kit
  Circuit 3B-Distance Sensor

  Control the color of an RGB LED using an ultrasonic distance sensor.

  This sketch was written by SparkFun Electronics, with lots of help from the Arduino community.
  This code is completely free for any use.

  View circuit diagram and instructions at: https://learn.sparkfun.com/tutorials/sparkfun-inventors-kit-experiment-guide---v40
  Download drawings and code at: https://github.com/sparkfun/SIK-Guide-Code
*/

const int trigPin = 11;           //connects to the trigger pin on the distance sensor
const int echoPin = 12;           //connects to the echo pin on the distance sensor

const int redPin = 3;             //pin to control the red LED inside the RGB LED

const int greenPin = 5;           //pin to control the green LED inside the RGB LED
const int bluePin = 6;            //pin to control the blue LED inside the RGB LED

float distance = 0;               //stores the distance measured by the distance sensor

void setup()
{
  Serial.begin (9600);        //set up a serial connection with the computer

  pinMode(trigPin, OUTPUT);   //the trigger pin will output pulses of electricity
  pinMode(echoPin, INPUT);    //the echo pin will measure the duration of pulses coming back from the distance sensor

  //set the RGB LED pins to output
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  distance = getDistance();   //variable to store the distance measured by the sensor

  Serial.print(distance);     //print the distance that was measured
  Serial.println(" in");      //print units after the distance

  if (distance <= 10) {                       //if the object is close

    //make the RGB LED red
    analogWrite(redPin, 255);
    analogWrite(greenPin, 0);
    analogWrite(bluePin, 0);

  } else if (10 < distance && distance < 20) { //if the object is a medium distance

    //make the RGB LED yellow
    analogWrite(redPin, 255);
    analogWrite(greenPin, 50);
    analogWrite(bluePin, 0);

  } else {                                    //if the object is far away

    //make the RGB LED green
    analogWrite(redPin, 0);
    analogWrite(greenPin, 255);
    analogWrite(bluePin, 0);
  }

  delay(50);      //delay 50ms between each reading
}

//------------------FUNCTIONS-------------------------------

//RETURNS THE DISTANCE MEASURED BY THE HC-SR04 DISTANCE SENSOR
float getDistance()
{
  float echoTime;                   //variable to store the time it takes for a ping to bounce off an object
  float calculatedDistance;         //variable to store the distance calculated from the echo time

  //send out an ultrasonic pulse that's 10ms long
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  echoTime = pulseIn(echoPin, HIGH);      //use the pulsein command to see how long it takes for the
                                          //pulse to bounce back to the sensor

  calculatedDistance = echoTime / 148.0;  //calculate the distance of the object that reflected the pulse (half the bounce time multiplied by the speed of sound)

  return calculatedDistance;              //send back the distance that was calculated
}
```


## SparkFun Pi Servo pHAT

Code [here](https://github.com/sparkfun/Pi_Servo_Hat/tree/v20)

[sparkfun-pi-servo-hat source](https://github.com/sparkfun/PiServoHat_Py/blob/main/pi_servo_hat.py), its dependency [sparkfun-qwiic-pca9685](https://github.com/sparkfun/Qwiic_PCA9685_Py/blob/main/qwiic_pca9685.py), and I2C driver [sparkfun-qwiic-i2c](https://github.com/sparkfun/Qwiic_I2C_Py/blob/master/qwiic_i2c/linux_i2c.py) based on **smbus2**

```py
import pi_servo_hat
import time

# Initialize Constructor
test = pi_servo_hat.PiServoHat()

# Restart Servo Hat (in case Hat is frozen/locked)
test.restart()

# Test Run
#########################################
# Moves servo position to 0 degrees (1ms), Channel 0
test.move_servo_position(0, 0)

# Pause 1 sec
time.sleep(1)

# Moves servo position to 90 degrees (2ms), Channel 0
test.move_servo_position(0, 90)

# Pause 1 sec
time.sleep(1)

# Sweep
#########################################
while True:
    for i in range(0, 90):
        print(i)
        test.move_servo_position(0, i)
        time.sleep(.001)
    for i in range(90, 0, -1):
        print(i)
        test.move_servo_position(0, i)
        time.sleep(.001)
```