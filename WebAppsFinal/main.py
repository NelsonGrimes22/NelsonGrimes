from flask import Flask, request, render_template, jsonify, redirect, url_for
import os, json, util
from flask_sqlalchemy import SQLAlchemy


basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] =\
'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


bad_input_flag = 0

class School(db.Model):
	__tablename__ = 'School'
	id = db.Column(db.Integer, primary_key=True)
	schoolName = db.Column(db.String(64), unique=False)
	color1 = db.Column(db.String(7), unique=False)
	color2 = db.Column(db.String(7), unique=False)
	logo = db.Column(db.String(255), unique=False)
	# give them a readable string representation that can be used for debugging and testing purposes
	def __repr__(self):
		return '<%r>' % self.schoolName

@app.before_first_request
def create_table():
	json_data = json.load(open(os.path.join(app.static_folder, "data/UNC_Schools.json")))
	db.drop_all()
	db.create_all()
	for schoolItem in json_data:
		school = School(schoolName=schoolItem['schoolName'], color1=schoolItem['color1'],
		 color2=schoolItem['color2'], logo=schoolItem['logo'])
		db.session.add(school)
		db.session.commit()

@app.route('/')
def index():
	school_data = util.parse_schools(db.session.query(School).all())
	return render_template('index.html', data=school_data)

@app.route('/select_add', methods=['GET', 'POST'])
def select_add():
	global bad_input_flag
	school_data = util.parse_schools(db.session.query(School).all())
	if request.method == 'GET':
		return render_template('select_add.html',data=school_data,error_status=bad_input_flag)
	elif request.method == 'POST':
		return render_template('select_add.html',data=school_data,error_status=bad_input_flag)

@app.route('/schools')
def schools():
    school_data = util.parse_schools(db.session.query(School).all())
    return render_template('schools.html', data=school_data)

@app.route('/add_school', methods=['POST'])
def add_school():
	global bad_input_flag
	if (request.form['schoolName'] and util.check_hex(request.form['C1']) and
	 util.check_hex(request.form['C2']) and request.form['logo']):
		school = School(schoolName=request.form['schoolName'],
		 color1=util.clean_hex(request.form['C1']), color2=util.clean_hex(request.form['C2']),
		 logo=request.form['logo'])
		db.session.add(school)
		db.session.commit()
		bad_input_flag = 0
	else:
		bad_input_flag = 1
	return redirect(url_for('select_add'))

if __name__ == '__main__':
    app.debug = True
    ip = '127.0.0.1'
    app.run(host=ip)
