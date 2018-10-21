# The Workplace Web Scheduler

## Project Description

We are building an app that finds common scheduling times for employers and employees. There will be two interfaces - one for employers and one for employees.

The employer interface will allow employers to select a specific type of calendar to meet their scheduling needs. For example: scheduling employees for shifts. They will select the particular calendar on their end. We will then have a page where the employee can login and list the events they have on a certain day, what time the events are, and whether it is a recurring event. 

Employers can build schedules of available work shifts, either by manually inputting them into a shared calendar or creating a repeating schedule. Employees can either sign up for shifts manually or be assigned to shifts automatically based upon their availability. 

For the employee interface we will give the employees the ability to select their workplace, which will send a message to the employer to confirm the individual is employed with the company. Once the employer confirms the individual’s employment, employees will be able to input their availability into a calendar as well as options for how many hours they want to work, and other scheduling preferences (times of day, length, etc)

This scheduler can also be used for functions such as finding common meeting times, and other such scheduling needs. 


## To run project: 

### On a Mac: 
1. Download the Workplace Web Scheduler code folder from Github. 
2. Open the terminal. 
3. Type &lt;cd&gt; and drag project folder into terminal. 
4. Type &lt;pip install -r requirements.txt&gt; into terminal.
5. Type &lt;python main.py&gt; in the terminal. 
6. Open a web browser and paste &lt;http://127.0.0.1:5000/&gt; into the address bar. 
7. Our project will be displayed. 

## Project Requirements 

The project will involve having employers being able to select a type of calendar and then schedule an employee based off of the availability that the employee enters on their end. Both the employer and the employee will have a calendar. We are planning to use Python, specifically the Flask framework, HTML, Sass, CSS, JavaScript, jQuery, AJAX, and potentially PHP. 

