from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, TextField, DateField, SelectField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from taskViz.models import User, Category, Task

class RegistrationForm(FlaskForm):
    username = StringField('Username',
                           validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password',
                                     validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('That username is taken. Please choose a different one.')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('That email is taken. Please choose a different one.')


class LoginForm(FlaskForm):
    email = StringField('Email Address:', validators=[DataRequired(), Email()])
    password = PasswordField('Password:', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')

class NewCategoryForm(FlaskForm):
    category_name = StringField('Category Name:', validators=[DataRequired()])
    category_color = StringField('Category Color:', validators=[DataRequired()])
    submit = SubmitField('Submit')

class NewTaskForm(FlaskForm):
    task_name = StringField('Task Name', validators=[DataRequired()])
    task_start_date = DateField('Start Date', validators=[DataRequired()])
    task_end_date = DateField('Start Date', validators=[DataRequired()])
    # category = SelectField('Category Name', choices=[], validators=[DataRequired()])
    submit = SubmitField('Submit')
