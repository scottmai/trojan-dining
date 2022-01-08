# trojan-dining

- If you haven't already, install Visual Studio Code 
    - https://code.visualstudio.com/download
    - You can use whatever editor you like but I highly recommend VS Code

- \[Windows only]: Install git 
https://git-scm.com/download/win

---
# Backend

## Setup

- Install <a href="https://www.python.org/downloads/">python 3.10</a>

- Note: on Windows, run python with `python` , on Mac, run python with `python3`

- Install virtualenv 
    - [Mac/linux] `pip3 install virtualenv`
    - [Windows] `pip install virtualenv`

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

- Install dependencies:
`npm install`

## Usage

- Start the frontend:
`npm start`
