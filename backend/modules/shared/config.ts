const {
  MONGODB_LOCAL_URL: mongoDBLocalUrl = "",
  MONGODB_ATLAS_URL: mongoDBAtlasURL = "",
  HF_API_KEY: hfApiKey = "",
} = import.meta.env;

const mongoUrl = mongoDBLocalUrl || mongoDBAtlasURL;

export { mongoUrl, hfApiKey };
