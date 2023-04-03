export const articles = [
  {
    style: `box1`,
    title: `Making a robot`,
    subtitle: `Guide on how to design your own robot`,
    url: `/make/robot`,
    excerpt: `
    <p>It all started with a tweet. 
    Someone asked for a robot that can track your time on the computer.
    A cute robot-companion that cares about you.
    Or maybe a strict robot-coach that meticulously plans your time.</p>
    <p></p>`,
    readMore: ``,
    imgSrc: `/images/home/power-motor-board-pcb-design.png`,
    imgAlt: null,
  },
  {
    style: `box2`,
    title: `Developmental psychology`,
    subtitle: `Studies, edge cases`,
    url: `/science/developmental-psychology-studies`,
    excerpt: `<p>Lets try to frame the problem in a scientific form. 
    There are motors connected to random pins. 
    There are sensors also connected to random pins, and they receive information about the environment. 
    How to figure out which motor you need to actuate in order to move the whole system in one specific direction? 
    I consider SNN and RNN, but looking for alternative training methods. 
    That’s how I ended up with Piaget’s stages.</p>
    
    <p>Jorge tends to think that the question is inherently flawed. 
    He believes that movements are not achieved by applying torque on a set of motors. 
    Instead it is more like a controlled fall, when the tension of muscles is dynamically updated 
    based on the online feedback from the environment. 
    And there is no central computer calculating movement based on input, 
    instead the cause of movement is proprioception, the force of gravity, and thoughts combined. 
    </p>`,
    readMore: `And how did we come to embodied cognition? Again.`,
    imgSrc: `/images/home/feel-like-i-ramen.jpg`,
    imgAlt: null,
  },
  {
    style: `box3`,
    title: `PyTorch`,
    subtitle: `Explain like I am 5`,
    url: `/science/explain-like-i-am-5-how-to-use-pytorch`,
    excerpt: `<p>One morning I see in my timeline one tweet. 
    It exlaims about transformer model abilities</p>
    <p><i>NN learns <b>how to learn</b> linear regression, decision trees, 2-layer ReLU nets 😲
    furthermore: outperforms XGBoost, does Lasso in one-pass, seems not to rely on nearest-neighbor.</i></p>
    <p>I looked carefully through the article. 
    The example looks simple, and I want to play with linear approximation and find its limitation. 
    Good thing they published model and training scripts.</p>
    <p>At work we recently deployed POS (point of sale) software written in Python. 
    Web server, DB connector, abstract classes, function decorators. 
    It is great. 
    Python is great. 
    But when I read implementation of a ML algorithm from this paper I’m starting to hate Python.</p>`,
    readMore: `Understand Models in PyTorch`,
    imgSrc: `/images/home/stock-price-model.png`,
    imgAlt: null,
  },
  {
    style: `box4`,
    title: `Prusa Mini Original`,
    subtitle: `Assembly`,
    url: `/make/prusa-mini-original`,
    excerpt: `<p>What’s funny that one night I had a dream
      where I followed a step by step tutorial similar to what I used in the last 3 evenings. 
      But in the dream that tutorial was explaining how to hide a treasure
      and put future treasure hunters on a false track</p>
    `,
    readMore: `I successfully finished the assembly of my first 3d printer`,
    imgSrc: `/images/home/prusa-original-mini-assembly-1.jpg`,
    imgAlt: null,
  },
  {
    style: `box5`,
    title: `Jupyter Notebook`,
    subtitle: `Everything you need to know about it`,
    url: `/science/everything-you-need-to-know-about-jupyter-notebook`,
    excerpt: `<p>It would be strange to learn Machine Learning and never use Jupyter notebooks.</p>`,
    readMore: `Data scientists LOVE Jupyter notebooks.`,
    imgSrc: null,
    imgAlt: null,
  },
  {
    style: `box6`,
    title: `Geek tools`,
    subtitle: ``,
    url: `/blog/geek-tools`,
    excerpt: `<p>Now you know what present I want for Christmas</p>`,
    readMore: ``,
    imgSrc: null,
    imgAlt: null,
  },
];