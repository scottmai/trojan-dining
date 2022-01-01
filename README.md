# trojan-dining

## Backend setup

Install python 3.10 <link>

Enter the backend directory:
`cd backend`

Create virtual environment:
`python -m venv env`

Activate virtual environment
on Mac/linux:
`source env/bin/activate`

Install dependencies:
`pip install -r requirements.txt`

Run whenever database models are changed (when in doubt run this):
`python manage.py makemigrations`
`python manage.py migrate`

Run the server:
`python manage.py runserver`


## Frontend Setup

Install Node.js https://nodejs.org/en/download/

Enter frontend directory:
`cd frontend`

Install dependencies:
`npm install`

Start the frontend:
`npm start`

