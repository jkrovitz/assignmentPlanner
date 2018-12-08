from datetime import datetime
from taskViz import db, login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):    # TODO: what is UserMixin
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
   # categories = db.relationship('Category', backref='author', lazy=True)

    #This line is saying that it has a relationship to our calendar model,
    #specify a backref, which is similar to adding another column to
    #category model. What the backref allows us to do is use the calendarCreator
    #attribute to get the user who created the post. The lazy
    #argument just defines when SQLAlchemy loads the data
    #from the database, so True means that SQLAlchemy will
    #load the data as necessary in one go. This relationship
    # will allow us to get all of the posts created by an
    #individual user.


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
        return f"User('{self.first_name}', '{self.last_name}', '{self.username}', '{self.email}')"


class Category(db.Model):
    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(100), nullable=False)
    category_color = db.Column(db.String(100), nullable=False)
    is_checked = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Category('{self.category_name}', '{self.category_color}')"     # why doesn't this return `category_id` or`is_checked`?


class Subcategory(db.Model):
    subcategory_id = db.Column(db.Integer, primary_key=True)
    subcategory_name = db.Column(db.String(100), nullable=False)
    is_checked = db.Column(db.Boolean, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.category_id'), nullable=True)

    def __repr__(self):
        return f"Subcategory('{self.subcategory_id}', '{self.subcategory_name}', '{self.category_id}')" # should this return `is_checked`?


class Task(db.Model):
    task_id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(100), nullable=False)
    task_start_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    task_end_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    # for some reason this doesn't work
    category_id = db.Column(db.Integer, db.ForeignKey('category.category_id'), nullable=True)

    def __repr__(self):
        return f"Task('{self.task_id}', '{self.task_name}', '{self.task_start_date}', '{self.task_end_date}', '{self.category_id}')"
        # return f"Task('{self.task_id}', '{self.task_name}', '{self.task_start_date}', '{self.task_end_date}', '{self.category_id}')"


class Milestone(db.Model):
    milestone_id = db.Column(db.Integer, primary_key=True)
    milestone_name = db.Column(db.String(100), nullable=False)
    milestone_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    task_id = db.Column(db.Integer, db.ForeignKey('task.task_id'), nullable=True)

    def __repr__(self):
        return f"Milestone('{self.milestone_id}', '{self.milestone_name}', '{self.milestone_date}', '{self.task_id}')"
