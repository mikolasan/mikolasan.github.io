---
title: Servo Hat
subtitle: 16 PWM channels controllable over I2C
date: 2023-11-04
published: 2023-11-04
lastModified: 2023-11-04
---

[SparkFun Pi Servo pHAT](https://www.sparkfun.com/products/15316): [code](https://github.com/sparkfun/Pi_Servo_Hat/tree/v20), [docs](https://piservohat-py.readthedocs.io/en/latest/index.html)

- [sparkfun-pi-servo-hat source](https://github.com/sparkfun/PiServoHat_Py/blob/main/pi_servo_hat.py), 
- its dependency [sparkfun-qwiic-pca9685](https://github.com/sparkfun/Qwiic_PCA9685_Py/blob/main/qwiic_pca9685.py), 
- and I2C driver [sparkfun-qwiic-i2c](https://github.com/sparkfun/Qwiic_I2C_Py/blob/master/qwiic_i2c/linux_i2c.py) based on **smbus2**

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

Sidequest: I2C library in C

- [A page](https://elinux.org/Interfacing_with_I2C_Devices) from eLinux wiki, no `smbus`
- [libi2c](https://github.com/amaork/libi2c/blob/master/src/i2c.c). Note: it uses meson build system.
- [i2c-exp-driver](https://github.com/OnionIoT/i2c-exp-driver/blob/master/src/lib/onion-i2c.c) from Onion company

forks:

- https://github.com/coupdair/libi2c