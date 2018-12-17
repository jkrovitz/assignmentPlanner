'''
In this file each of the models that are used within the 
website are created.  

'''

from datetime import datetime
from taskViz import db, login_manager
from flask_login import UserMixin


#This line changes the default message category, so the message background will appear in red instead of white.
login_manager.login_message_category = "error"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

     # Flask-Login integration
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    # Required for administrative interface
    def __unicode__(self):
        return self.username

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"


class Category(db.Model):
    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(100), nullable=False)
    category_color = db.Column(db.String(100), nullable=False)
    is_checked = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref="categories")

    def __repr__(self):
        return f"Category('{self.category_name}', '{self.category_color}')"     # why doesn't this return `category_id` or`is_checked`?


class Subcategory(db.Model):
    subcategory_id = db.Column(db.Integer, primary_key=True)
    subcategory_name = db.Column(db.String(100), nullable=False)
    is_checked = db.Column(db.Boolean, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.category_id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Subcategory('{self.subcategory_id}', '{self.subcategory_name}', '{self.category_id}')" # should this return `is_checked`?

class Task(db.Model):

    task_id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(100), nullable=False)
    task_start_date = db.Column(db.String(100), nullable=False)
    task_end_date = db.Column(db.String(100), nullable=False)
    # task_milestone_name = db.Column(db.String(100), nullable = False)
    # task_milestone_date = db.Column(db.String(100), nullable = False) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref='tasks')
    category_id = db.Column(db.Integer, db.ForeignKey('category.category_id'))
    category = db.relationship('Category', backref="tasks")
    milestones = db.relationship('Milestone', backref='task', lazy=True)

    def __repr__(self):
        return f"Task('{self.task_id}', '{self.task_name}', '{self.task_start_date}', '{self.task_end_date}', '{self.category_id}')"

class Milestone(db.Model):

    milestone_id = db.Column(db.Integer, primary_key=True)
    milestone_name = db.Column(db.String(100), nullable=False)
    milestone_date = db.Column(db.String(100), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('task.task_id'), nullable=False)

    def __repr__(self):
        return f"Milestone('{self.milestone_id}', '{self.milestone_name}', '{self.milestone_date}', '{self.task_id}')"
