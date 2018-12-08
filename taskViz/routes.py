from flask import render_template, url_for, flash, redirect, request, Response, jsonify
from taskViz import app, db, bcrypt
from taskViz.forms import RegistrationForm, LoginForm, NewCategoryForm, NewTaskForm
from taskViz.models import User, Category, Task
from flask_login import login_user, current_user, logout_user, login_required
import json
from flask_moment import Moment

moment = Moment(app)

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
	#new_cat = Category(category_name=category_name, category_color=category_color, is_checked=False, user_id=current_user.id)
	categories = Category.query.filter_by(user_id=current_user.id).all()
	print(categories)
	# tasks = Task.query.all()    # also not used ... not yet anyway...
	return render_template('task_viz.html', categories=categories, new_category_form=new_category_form) #`new_category_form` sin't being used? should it?

@app.route("/register", methods=['GET', 'POST'])
def register():     # NOTE: when creating new account, thing to say it worked is RED. change colour later
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)   # TODO: fix. User only has 2 inputs
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

'''Eventually this function will be a route to a page where the user will be able to
view and edit their account info.
'''
@app.route("/account")
@login_required
def account():
    return render_template('account.html', title='Account')

@app.route('/categories', methods=['GET', 'POST'])
def category():
	category_name = request.form.get('category_name')
	category_color = request.form.get('category_color')
	category_form = NewCategoryForm(request.form)
	if request.method == 'POST':
		print(category_name, category_color)
		new_cat = Category(category_name=category_name, category_color=category_color, is_checked=False, user_id=current_user.id)
		if(category_name):
			db.session.add(new_cat)
			db.session.commit()
			print(Category.query.all())
		return redirect(url_for('home'))
	cat = Category.query.all()
	print(cat, 'categories')
	return render_template('forms/category_form.html', new_category_form=category_form, category_name=category_name, category_color=category_color, edit_bool=False)

@app.route("/category/<int:category_id>")
@login_required
def get_category_id(category_id):
	category = Category.query.get_or_404(category_id)
	return render_template('category.html', category_id=category.category_id, category_name=category.category_name, category=category, user_id=current_user.id)

@app.route("/category/<int:category_id>/edit", methods=['GET', 'POST'])
@login_required
def edit_category(category_id):
    category = Category.query.get(category_id)
    form = NewCategoryForm()
    if category.user_id != current_user.id:
        abort(403)
    if request.method == 'POST':
        category.category_name=request.form['category_name']
        category.category_color=request.form['category_color']
        db.session.commit()
        flash('Your category has been updated!', 'success')
        return redirect(url_for('home', category=category_id))
    elif request.method == 'GET':
        form.category_name.data = category.category_name
        form.category_color.data = category.category_color
    return render_template('forms/category_form.html',
                           new_category_form=form)

#We should decide where we want to have the options for deleting categories.
@app.route("/category/<int:category_id>/delete", methods=['POST'])
@login_required
def delete_category(category_id):
    category = Category.query.get_or_404(category_id)
    if category.user_id != current_user.id:
        abort(403)
    db.session.delete(category)
    db.session.commit()
    flash('Your category has been deleted!', 'success')
    return redirect(url_for('home'))

@app.route('/update', methods=['POST'])
def update():

	task = Task.query.filter_by(task_id=request.form['task_id']).all()
	task.task_name = request.form['task_name']
	# task.task_start_date = request.form['task_start_date']
	# task.task_end_date = request.form['task_end_date']

	db.session.commit()

	return jsonify({'result' : 'success', 'task_name' : task_name})

@app.route('/signUpUser', methods=['POST'])
def signUpUser():
    user =  request.form['username'];
    password = request.form['password'];
    return json.dumps({'status':'OK','user':user,'pass':password});
