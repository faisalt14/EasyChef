#!/bin/bash

# move to the backend's directory
cd client/p2

# create virtual environment
python3 -m venv myenv
source myenv/bin/activate

# install required packages
pip install -r requirements.txt

# run django migrations
python3 manage.py migrate

# move to the frontend's directory
cd ../../server/p3

# install frontend dependencies
npm install