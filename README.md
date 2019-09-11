# jtmcoderscamp.weatherbunny
# WEATHER BUNNY

Weather Bunny is a children-oriented web app for weather display.
It was developed across three weeks for educational purposes and is unlikely to see significant further development.

Version 1.0.0 is the MVP form of the project. Current main features include:
 - localization based on GPS
 - localization based on IP (with proper configuration the IP-resolving module i capable of usin any of IP-resolving APIs)
 - display of weather data from OpenWeatherMapAPI, based on automatically determined location or user input (search by city name)
 - level of reactivity ensuring usability on wide array of devices
 
 Development plans (were the project to be continued in any capacity):
 1.1.0: refactoring to avoid the necessity to directly maintain any files in the output /docs folder (see the project structure, below)
 1.2.0: additional animations and adjustments for display on especially narrow devices
 1.3.0: testing and assurance of compatibility with older browsers
 2.0.0: forecast display, text descriptions of weather, clothing recommendations

# Project structure:
The repository consists of two main branches:
1. master - the "production" branch from which the github pages demo of the application can be accessed
2. develop - the development branch. This branch aggregates the pull requests from working branches

While Weather Bunny is an exclusively front-end application, it heavily relies on Node.js during development. Its files are contained in two folders: /src (source files) and /docs (output folder). Most contents of the latter are loaded from /src folder using webpack - the version 1.0.0 contains, however, three exceptions (due to be eliminated in further development):
 - index.html (the main index file)
 - bunny.svg
 - search.svg

# Application architecture:
The application contains very little in the way of controler, therefore it eschews the typical MVC architecture in favor of pushing task-oriented modules to the top of package structure, following the principles of screaming architecture. The folder structure of 1.0.0 version is as follows:

 - *src*
    - *assets*  - (static assets, locally stored images and icons used by the application)
      - *icons*
      - *img*
    - *userInterface* - (weather data display and interaction with the user)
    - *locationSource* - (determining the location)
    - *weatherSource* - (acquisition of weather data)
    - *model* - (model classes)

The /src folder directly contains two files
index.js - application initializer
App.js - the main class of the application responsible for its loading and start-up
