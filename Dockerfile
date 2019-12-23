FROM node:13-alpine AS client
ADD . ./bianca_classifier
WORKDIR /bianca_classifier
RUN npm install --unsafe-perm && npm run build

FROM mc706/pipenv-3.7
COPY --from=client /bianca_classifier /bianca_classifier
WORKDIR /bianca_classifier
RUN pipenv install
CMD ["pipenv", "run" ,"python" ,"./server/server.py"]