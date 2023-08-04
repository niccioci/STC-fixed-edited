#!/bin/sh 

export PYTHONPATH=${PWD}
export DJANGO_SETTINGS_MODULE=investment_bot.settings
(cd rasachat && rasa interactive -vv --debug)
