# Trojan Dining
This is a redesign of the USC Hospitality daily Dining Hall Menu, optimized for the mobile web experience. It will also allow users to subscribe to notifications for their favorite items. 

Built by a TCSS 401x team :)

# Setup Instructions

- Install Visual Studio Code 
    - https://code.visualstudio.com/download
    - You can use whatever editor you like but I highly recommend VS Code

- On Windows, <b>only use Powershell for your terminal</b> (and the built-in VS Code terminal)

- \[Windows only]: Install git 
https://git-scm.com/download/win

- Setup git authentication 
    - Try the HTTP section here: https://statistics.berkeley.edu/computing/faqs/git-auth#SSH%20keys
    - or this: https://docs.github.com/en/enterprise-server@3.0/authentication
    - or this: https://bytes.usc.edu/cs104/labs/lab1/
    - Will update with better details soon

---

# MongoDB Database
We are using a popular database called MongoDB for this project. MongoDB is notable for being a NoSQL database, differing from the traditional SQL table format with "SELECT * FROM ..." queries. NoSQL is preferred here due to the heavily nested menu data type it will be storing, as well as general flexibility for future use cases.

## Installation
### MacOS
1. All instruction are on <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/">here</a> - I recommend using this over the instructions below if anything doesn't work. Here's the shortened version:
2. Install <a href="https://brew.sh/#install">Homebrew</a> 
3. Run `brew tap mongodb/brew`
4. Run `brew install mongodb-community@5.0`
5. To run the database server: `brew services start mongodb-community@5.0`
6. To kill the database server: `brew services start mongodb-community@5.0`

### Windows
1. https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
2. Download MongoDB installer from <a href="https://www.mongodb.com/try/download/community?tck=docs_server">here.</a>
3. Run installer, do not check option for "Install MongoDB as a service", you may wish to install MongoDB compass for a graphical interface but its not necessary.
4.  You may need to restart you computer here ;.;
5. Start the server (`Ctrl-C` to quit) (you must keep this terminal window open for as long as you want the server to run): ` . "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath=".db"` (VS Code terminal windows are your friend!!!)


# Backend

## Setup

- Install <a href="https://www.python.org/downloads/">python 3.10</a>

- Install virtualenv 
    - [Mac/linux] `pip3 install virtualenv`
    - [Windows] `pip install virtualenv`

- Enter the backend directory: `cd backend`

- Create virtual environment: `python -m venv env`

- Activate virtual environment:
    - \[Mac/linux]: `source env/bin/activate`
    - \[Windows]: `./env/Scripts/activate`

- Install dependencies: `pip install -r requirements.txt`

- If you install any new packages, make sure you activate your virtual environment first and then update the `requirements.txt` file with the new dependencies afterwards. This can be performed with the following command: `pip freeze > requirements.txt`

- Setup Pylint with VSCode
    - Open your command palette (F1 or cmd/ctrl + shift + P)
    - Type "Python: Select Linter"
    - Select "Pylint"
    - Now, enable autoformatting by typing/selecting "Preferences: Open Settings (JSON)"
    - Find "[python]"
    - Add/update a field with `"editor.formatOnSave": false`
    - Save the settings.json file


## Usage

- Start the database in a separate terminal:  
  - [Mac] `brew services start mongodb-community@5.0`
  - [Windows] `"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath=".db"`
    - Note: This *must* be performed from the root directory, *not* `backend`
    
- Enter the backend directory: `cd backend`
- Always make sure to activate the virtual environment when working in the backend:

    - \[Mac/linux]: `source env/bin/activate`
    - \[Windows]: `./env/Scripts/activate`

<br/>

- Run whenever database models are changed (when in doubt run this):
    - `python manage.py makemigrations`
    - `python manage.py migrate`

- Run the server:
    - `python manage.py runserver`
    - Note: if you receive a `ModuleNotFoundError: No module named '<module-name>'`, try updating your dependencies with the `pip install -r ...` instructions above 

- When you're done, deactivate the virtual environment `deactivate`

- And kill the database: `brew services start mongodb-community@5.0`

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

- Run the mock API:
`npx json-server db.json -p 8000 --watch`

- Whenever you install a package, use yarn, <b>not npm</b>
    - You will often find instructions to install packages with `npm install <package-name>` or `npm i <package-name>`
    - Instead, use `yarn add <package-name>`
    - And always reinstall dependencies (i.e. after `git pull`ing with `yarn install`
    - The package-lock.json that is generated by `npm install` will be ignored by the repo - we only want yarn.lock

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
