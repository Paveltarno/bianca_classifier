import responder
from fastai.vision import load_learner

MODEL_PATH = "./models"
MODEL_NAME = "bclass_v1_006.pkl"

print(f"Loading learner with model {MODEL_NAME}")
learner = load_learner(MODEL_PATH, MODEL_NAME)

api = responder.API(static_dir="./client/build", static_route="/")

api.add_route("/", static=True)

api.run()