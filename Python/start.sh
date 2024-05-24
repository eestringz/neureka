#!/bin/bash

# first order execute
echo "Executing first order: python neureka_news/scheduler.py"
python neureka_news/scheduler.py &

# second order execute
echo "Executing second order: python manage.py runserver 0.0.0.0:8000"
python manage.py runserver 0.0.0.0:8000
