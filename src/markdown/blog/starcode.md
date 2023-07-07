---

---


- Install [miniconda](https://docs.conda.io/en/latest/miniconda.html)
- Open Alacritty
- Convert regular CMD into conda C:\Users\neupo\miniconda3\Scripts\activate.bat

```

conda create -n starchat python=3.10
conda activate starchat

git clone https://github.com/bigcode-project/starcoder.git
cd starcoder/chat
pip install -r requirements.txt