from io import BytesIO
import responder
from fastai.vision import load_learner, open_image

MODEL_PATH = "./models"
MODEL_NAME = "bclass_v1_006.pkl"

print(f"Loading learner with model {MODEL_NAME}")
learner = load_learner(MODEL_PATH, MODEL_NAME)

api = responder.API(static_dir="./client/build", static_route="/")

api.add_route("/", static=True)


@api.route("/predict")
class Prediction:
    async def on_post(self, req, resp):
        formData = await req.media(format="files")
        img = open_image(BytesIO(formData['file']['content']))
        _, _, losses = learner.predict(img)
        resp.media = {"predictions": sorted(
            zip(learner.data.classes, map(float, losses)),
            key=lambda p: p[1],
            reverse=True
        )}


api.run()
