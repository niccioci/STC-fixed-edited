# coding: utf-8
from django.urls import path, include
from . import views
from django.conf import settings

from .views import (
    welcome_page,
    information_page,
    consent_page,
    questionnaire1_view,
    instructions_page,
    chatbot_page,
    get_condition_active,
    update_portfolios,
    update_balances,
    update_month,
    update_results,
    get_next_changes,
    participants_view,
    # update_dismiss_notification_count,
    store_bot_message,
    results_page,
    questionnaire_view,
    getNewsfeedButtonClick,
    getBotButtonClick,
    cred_level,
    )

urlpatterns = [
    path('', welcome_page, name='welcome'),
    path('information/', information_page, name='information'),
    path('consent/', consent_page, name='consent'),
    path('questionnaire1/', questionnaire1_view, name='questionnaire1_view'),
    path('instructions/', instructions_page, name='instructions'),
    path('investment/', chatbot_page, name='chatbot'),
    path('imagetagging/', include('imagetagging.urls'), name='imagetagging'),
    path('getconditionactive/', get_condition_active, name='getconditionactive'),
    path('updateportfolios/', update_portfolios, name='updateportfolios'),
    path('updatebalances/', update_balances, name='updatebalances'),
    path('updatemonth/', update_month, name='updatemonth'),
    path('updateresults/', update_results, name='updateresults'),
    path('getnextchanges/', get_next_changes, name='getnextchanges'),
    path('participants/', participants_view, name='participants-view'),
    # path('updatedismissnotificationcount/', update_dismiss_notification_count, name='updatedismissnotificationcount'),
    path('storebotmessage/', store_bot_message, name='storebotmessage'),
    path('results/', results_page, name='resultspage'),
    path('questionnaire/', questionnaire_view, name='questionnaire_view'),
    #path('get/', views.getButtonClick),
    #path('post/', views.postButtonClick),
    path('newsfeedbuttonclick/', getNewsfeedButtonClick, name='newsfeed_button_click'),
    path('botbuttonclick/', getBotButtonClick, name='bot_button_click'),
    path('credlevel/', cred_level, name='cred_level'),

]
