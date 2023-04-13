export const articles = [
  {
    style: `box2`,
    title: `Microcontroller parallel processing`,
    subtitle: `Will two 8-bit microcontrollers running in parallel perform similarly to a single 16-bit microcontroller?`,
    url: `https://robotics.stackexchange.com/a/12526`,
    excerpt: `
    <p>16-bit processor can make computations faster if it comes to bigger data types, like int/long/real (to contrast only bytes), many times more than 2x faster. But jumps, loops and so are not such faster, as well as 8-bit calculation. So it deeply depends on how you process the data (how much computation and what kind you do).</p>
    <p>Speed of the protocol would be one of very limiting facts here (400 kbit/s ~ 50 kbyte/sec for fast I2C on 16 MHz Arduino means, that while receiving one byte=8bits, your processor is able to do like 16.000.000/50.000 = 320 instructions, for asking sensor for value you address the sensor and send register number, so at least 3 bytes are transferred, also there are some kinds of handshaking - so we have more like 960 instructions per byte) and the transfers usually cannot go in parallel, as they are using the same wires.</p>
    <p>Two processors would be able serve more data, as each of them can have its own data line and so two sensors can be questioned in paralel. 900 instructions may be enough to do some simple data manipulation over collected values.</p>`,
    readMore: `Continue reading this SO answer...`,
    imgSrc: null,
    imgAlt: null,
  },
  {
    style: `box1`,
    title: `Transformers in robotics`,
    subtitle: `Transformer, machine learning model, applied to robotics`,
    url: `https://the-decoder.com/googles-robotics-transformer-1-to-usher-in-the-era-of-large-robot-models/`,
    excerpt: `
    <p>Google now introduces the Robotics Transformer 1 (RT-1), an AI model for robot control. The model is accompanied by a large real-world dataset for robot training.</p>
    <p>The model uses text instructions and images as input, which are transformed into tokens by a FiLM EfficientNet model and compressed with an additional method (TokenLearner). The inputs are then forwarded to the Transformer, which outputs the commands to the robot. According to Google, this makes the model fast enough to control robots in real-time.</p>`,
    readMore: `Continue on The Decoder...`,
    imgSrc: null,
    imgAlt: null,
  },
  {
    style: `box6`,
    title: `Transputer`,
    subtitle: `is the future of computing`,
    url: `https://en.wikipedia.org/wiki/Transputer`,
    excerpt: `<p>Now you know what present I want for Christmas</p>`,
    readMore: ``,
    imgSrc: null,
    imgAlt: null,
  },
];