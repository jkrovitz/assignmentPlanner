'''
This file is composed of routes used to handle site
navigation including loging in and out, as well as
handling the general home view where the tasks and
categories get displayed. Various functions also
render templates that are used for task creation,
as well as category creation, editing, and deletion.

'''

from flask import render_template, url_for, flash, redirect, request, jsonify, abort, json
from taskViz import app, db, bcrypt
from taskViz.forms import RegistrationForm, LoginForm, NewCategoryForm, NewTaskForm
from taskViz.models import User, Category, Task, Milestone 
from flask_login import login_user, current_user, logout_user, login_required
import json


@app.route("/")
def AuthenticationRedirect():
	if current_user.is_authenticated:
		return redirect(url_for('home'))
	else:
		return redirect(url_for('login'))


@app.route("/home", methods=['GET', 'POST'])
@login_required
def home():
	new_category_form = category()
	categories = Category.query.filter_by(user_id=current_user.id).all()
	tasks = Task.query.all()
	milestones = Milestone.query.all()
	if request.form :
		task_name = request.form['taskNameAttribute']
		taskThing = json.dumps({'status':'OK', 'task_name':task_name});
	return render_template('task_viz.html', categories=categories, new_category_form=new_category_form, tasks=tasks, milestones=milestones) 


@app.route("/register", methods=['GET', 'POST'])
def register():
	if current_user.is_authenticated:
		return redirect(url_for('home'))
	form = RegistrationForm()
	if form.validate_on_submit():
		hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
		user = User(username=form.username.data, email=form.email.data, password=hashed_password)   # TODO: fix. User only has 2 inputs
		db.session.add(user)
		db.session.commit()
		flash('Your account has been created! You are now able to login.', 'success')
		return redirect(url_for('login'))
	return render_template('register.html', title='Register', form=form)


@app.route("/login", methods=['GET', 'POST'])
def login():
	if current_user.is_authenticated:
		return redirect(url_for('home'))
	form = LoginForm()
	if form.validate_on_submit():
		user = User.query.filter_by(email=form.email.data).first()
		if user and bcrypt.check_password_hash(user.password, form.password.data):
			login_user(user, remember=form.remember.data)
			next_page = request.args.get('next')
			return redirect(next_page) if next_page else redirect(url_for('home'))
		else:
			flash('Login Unsuccessful. Please check email and password', 'error')
	return render_template('login.html', title='Login', form=form)


@app.route("/logout")
def logout():
	logout_user()
	return redirect(url_for('home'))


@app.route('/categories', methods=['GET', 'POST'])
def category():
	"""Used to create category and add it to the database."""
	category_name = request.form.get('category_name')
	category_color = request.form.get('category_color')
	category_form = NewCategoryForm(request.form)
	if request.method == 'POST':
		new_cat = Category(category_name=category_name, category_color=category_color, is_checked=False, user_id=current_user.id)
		if(category_name):
			db.session.add(new_cat)
			db.session.commit()
		return redirect(url_for('home'))
	cat = Category.query.all()
	return render_template('forms/category_form.html', new_category_form=category_form, category_name=category_name, category_color=category_color, edit_bool=False)




@app.route("/category/<int:category_id>/edit", methods=['GET', 'POST'])
@login_required
def edit_category(category_id):
	"""This function gets category by category_id.
	It renders a template where the user
	is able to edit the category and
	update the entry in the database.
	"""
	category = Category.query.get(category_id)
	form = NewCategoryForm()
	if category.user_id != current_user.id:
		abort(403)
	if request.method == 'POST':
		category.category_name=request.form['category_name']
		category.category_color=request.form['category_color']
		db.session.commit()
		return redirect(url_for('home', category=category_id))
	elif request.method == 'GET':
		form.category_name.data = category.category_name
		form.category_color.data = category.category_color
	new_category_form = form
	return render_template('category.html', new_category_form=new_category_form, category=category, category_id=category_id)


@app.route("/category/<int:category_id>/delete", methods=['POST'])
@login_required
def delete_category(category_id):
	"""This function gets category by category_id.
	It deletes the category from the screen and database.
	"""
	category = Category.query.get_or_404(category_id)
	if category.user_id != current_user.id:
		abort(403)
	db.session.delete(category)
	db.session.commit()
	return redirect(url_for('home'))


@app.route('/create', methods=['GET','POST'])
@login_required
def create():
	"""Route for the ajax call."""
	if request.method != 'POST':
		abort(403)
	task_name = request.form['new_task_input']
	task_start_date = request.form['new_task_start_date_input']
	task_end_date = request.form['new_task_end_date_input']
	new_task_category = request.form['new_task_category']
	milestone_name = request.form['milestone_name']
	milestone_date = request.form['milestone_date']
	if not task_name:
		abort(403)
	new_task = Task(task_name=task_name, task_start_date=task_start_date, task_end_date=task_end_date, category_id=new_task_category, user_id = current_user.id)
	db.session.add(new_task)
	db.session.commit()
	new_task_id = new_task.task_id 
	new_milestone = Milestone (milestone_name = milestone_name, milestone_date=milestone_date, task_id=new_task_id)
	db.session.add(new_milestone)
	db.session.commit()
	return jsonify({'status':'OK'})


@app.route('/retrieveTasks')
@login_required
def retrieve_tasks():
	'''This function queries all the tasks in the database filtering by user.
	It adds each task to an array and then sends a JSON response to the browser.
	'''
	tasks = Task.query.filter_by(user_id=current_user.id).all()
	task_list = []
	for task in tasks:
		json_task = {"task_name":task.task_name, "task_start_date":task.task_start_date, "task_end_date":task.task_end_date, "category_id":task.category_id, "category":task.category.category_name, "milestones":task.milestones, "milestone_name":task.milestone.milestone_name, "milestone_date" :task.milestone.milestone_date}
	return jsonify(task_list)
