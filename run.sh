#!/bin/bash

# move to the backend's directory
cd server/p2

# activate the virtual environment
source myenv/bin/activate

# start the Django development server
python3 manage.py runserver

# move to the frontend's directory
cd ../../client/p3

# start the frontend server
npm start
