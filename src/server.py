import responder

api = responder.API()

@api.route("/")
def index(req, resp, *, who):
  resp.text = "hello"

api.run()