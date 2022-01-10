# trojan-dining

- If you haven't already, install Visual Studio Code 
    - https://code.visualstudio.com/download
    - You can use whatever editor you like but I highly recommend VS Code

- On Windows, <b>only use Powershell for your terminal</b> (and the built-in VS Code terminal)

- \[Windows only]: Install git 
https://git-scm.com/download/win

- Setup git authentication 
    - Try this: https://docs.github.com/en/enterprise-server@3.0/authentication
    - or this: https://bytes.usc.edu/cs104/labs/lab1/
    - Will update with better details soon

---
# Backend

## Setup

- Install <a href="https://www.python.org/downloads/">python 3.10</a>

- Note: on Windows, run python with `python` , on Mac, run python with `python3`

- Install virtualenv 
    - [Mac/linux] `pip3 install virtualenv`
    - [Windows] `pip install virtualenv`

- Clone this repo: `git clone https://github.com/scottmai/trojan-dining.git`

- Enter the backend directory: `cd backend`

- Create virtual environment: `python -m venv env`

- Activate virtual environment:
    - \[Mac/linux]: `source env/bin/activate`
    - \[Windows]: `./env/bin/activate.bat`

- Install dependencies:
`pip(3) install -r requirements.txt`

## Usage

- Always make sure to activate the virtual environment:

    - \[Mac/linux]: `source env/bin/activate`
    - \[Windows]: `./env/bin/activate.bat`

<br/>

- Run whenever database models are changed (when in doubt run this):
    - `python manage.py makemigrations`
    - `python manage.py migrate`

- Run the server:
    - `python manage.py runserver`

- When you're done, deactivate the virtual environment `deactivate`

---
# Frontend

## Setup

- Install Node.js https://nodejs.org/en/download/

- Enter frontend directory:
`cd frontend`

- Install yarn: `npm install yarn -g`

- Install dependencies:
`yarn install`

## Usage

- Start the frontend:
`yarn start`

# Other stuff

I highly recommend trying out a bunch of VS Code extensions - here is a list I stole from saytama:

If you're using VSCode these are the extensions I recommend:
- Django by Baptiste Darthenay - cuz we using Django
- Git History by Don Jayamanne - lets you see git commit history in vscode
- GitLens by GitKraken - so you know who wrote which big brain code
- MagicPython by MagicStack - see below
- Pylance, Python, VS IntelliCode by Microsoft - tbh idk which is better i just have them all lol
- Code Spell Checker by Street Side Software - helps prevent whoopsies of spelling wrong variable names
- vscode-icons by VSCode Icons Team or Material Icon Theme by Philipp Kief (prettier icons for your code editor)