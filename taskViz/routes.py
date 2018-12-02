from flask import render_template, url_for, flash, redirect, request, Response
from taskViz import app, db, bcrypt
from taskViz.forms import RegistrationForm, LoginForm, NewCategoryForm, NewTaskForm
from taskViz.models import User, Calendar, Category
from flask_login import login_user, current_user, logout_user, login_required
import json


@app.route("/")
def AuthenticationRedirect():
	if current_user.is_authenticated:
		return redirect(url_for('home'))
	else:
		return redirect(url_for('login'))

@app.route("/home")
@login_required
def home():
	new_task_form=NewTaskForm()
	new_category_form = NewCategoryForm()
	if new_category_form.validate_on_submit():
		new_category = self.model(category_id.data, category_name.data, category_color.data, is_checked.data)
		self.db.session.add(new_category)
		self.db.session.commit()
		new_category_form = NewCategoryForm()
		return redirect(url_for(task_viz))
	return render_template('task_viz.html', new_category_form=new_category_form,
			new_task_form=new_task_form)

@app.route("/register", methods=['GET', 'POST'])
def register():     # NOTE: when creating new account, thing to say it worked is RED. change colour later
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)


@app.route("/login", methods=['GET', 'POST'])
def login():        # can only log in using email, not username? change later if possible
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
			flash('Login Unsuccessful. Please check email and password', 'danger')
	return render_template('login.html', title='Login', form=form)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))



@app.route("/task_viz", methods=['GET', 'POST'])
@login_required
def task_viz():
	new_task_form = NewTaskForm()
	new_category_form = NewCategoryForm()
	print(request.method,'request method')
	if request.method == 'POST':
		return Response(json.dumps({'id': '1', 'name': 'books', 'color': '#222'}))
	# if new_category_form.validate_on_submit():
	# 	print(self.model, 'category model')
	# 	new_category = self.model(category_id.data, category_name.data, category_color.data, is_checked.data)
	# 	self.db.session.add(new_category)
	# 	self.db.session.commit()
	# 	return redirect(url_for(task_viz))

	if request.method == 'POST':
		print(new_task_form.data, 'NewTaskForm')

	return render_template(
		'task_viz.html',
		new_category_form=new_category_form,
		new_task_form=new_task_form
		)
@app.route('/categories', methods=['GET', 'POST'])
def category():

	#new_cat = Category(category_name='Math', category_color="#222", is_checked=False)
	#db.session.add(new_cat)

	if request.method == 'POST':
		#category_form = NewCategoryForm(request.form)
		cat_name = request.form.get('category')
		cat_color = request.form.get('color')
		print(cat_name, cat_color)
		new_cat = Category(category_name=cat_name, category_color=cat_color, is_checked=False)
		db.session.add(new_cat)
		db.session.commit()
		print(Category.query.all())
		return Response({})
	cat = Category.query.all()
	print(cat, 'categories')
	return Response(json.dumps([]))







@app.route("/account")
@login_required
def account():
    return render_template('account.html', title='Account')
