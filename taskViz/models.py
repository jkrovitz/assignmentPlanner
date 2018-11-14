from datetime import datetime
from taskViz import db, login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    #This line is saying that it has a relationship to our calendar model, 
    #specify a backref, which is similar to adding another column to 
    #Calendar model. What the backref allows us to do is use the calendarCreator
    #attribute to get the user who created the post. The lazy 
    #argument just defines when SQLAlchemy loads the data 
    #from the database, so True means that SQLAlchemy will
    #load the data as necessary in one go. This relationship 
    # will allow us to get all of the posts created by an 
    #individual user. 
    calendars = db.relationship('Calendar', backref='calendarCreator', lazy=True)


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


#This class will be eventually called Calendar or a similar name. 
#I am just calling the class Post right now, as I am coding 
# along with video tutorial that I am watching. 
class Calendar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable = False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Calendar('{self.title}', '{self.date_posted}')"