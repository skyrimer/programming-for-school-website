from flask import Flask, render_template, abort, send_from_directory, request
from flask_sqlalchemy import SQLAlchemy
from os import getcwd, environ
from os.path import isfile
from os.path import join as join_path
from json import load as json_load
app = Flask(__name__)
app.config["SECRET_KEY"] = environ.get("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///database.sqlite3'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


class FeedbackModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    feedback = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"FeedbackModel(id={self.name}, name={self.name}, email={self.email})"


def getPublications():
    with open("static/publications.json", "r") as publications:
        return json_load(publications)


@app.errorhandler(404)
def code_404(error):
    return render_template("404.html"), 404


@app.route("/")
@app.route("/home")
def home():
    publications = getPublications()
    return render_template("index.html", publications=publications)


@app.route('/about')
def about():
    return render_template("about.html")


@app.route('/projects')
def projects():
    return render_template("projects.html")


@app.route("/contacts", methods=["GET", "POST"])
def contact():
    if request.method == "GET":
        return render_template("contacts.html")
    data = request.get_json(force=True)
    db.session.add(FeedbackModel(name=data["name"],
                                 email=data["email"],
                                 feedback=data["feedback"]))
    db.session.commit()
    return render_template("contacts.html")


@app.route("/publication/<int:publication_id>")
def examples(publication_id):
    if not isfile(join_path(getcwd(), "templates", "publications", f"{publication_id}.html")):
        abort(404)
    return render_template(f"/publications/{publication_id}.html")


@app.route('/robots.txt')
@app.route('/sitemap.xml')
@app.route('/serviceworker.js')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


if __name__ == "__main__":
    app.run(debug=True)
