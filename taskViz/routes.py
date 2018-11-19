from flask import render_template, url_for, flash, redirect, request
from taskViz import app, db, bcrypt
from taskViz.forms import RegistrationForm, LoginForm, NewCategoryForm
from taskViz.models import User, Calendar, Category
from flask_login import login_user, current_user, logout_user, login_required

@app.route("/")
@app.route("/home")
@login_required
def home():
	return render_template('home.html')

@app.route("/register", methods=['GET', 'POST'])
def register():
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
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html', title='Login', form=form)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))


@app.route("/weekly_planner")
@login_required
def weekly_planner():
    return render_template('weekly_planner.html')

@app.route("/task_viz", methods=['GET', 'POST'])
@login_required
def task_viz():
    new_category_form = NewCategoryForm()
    category_name = new_category_form.category_name.data 
    if new_category_form.validate_on_submit():
        new_category_form = Category(category_name=new_category_form.categoryName.data, category_color=new_category_form.category_color.data, is_checked=new_category_form.is_checked.data)
        db.session.add(new_category_form)
        db.session.commit()
    return render_template('task_viz.html', new_category_form=new_category_form, category_name=category_name)


@app.route("/account")
@login_required
def account():
    return render_template('account.html', title='Account')