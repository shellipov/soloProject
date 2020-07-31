import mongoose from 'mongoose';

const address = 'mongodb://localhost:27017/searchformusicians';

mongoose.connect(address,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String },
  socialNetworks: [{ type: String }],
  instrument: [{ type: String }],
  style: [{ type: String }],
  address: { type: String, required: true },
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  inSearch: { type: Boolean, required: true },
  about: { type: String },
  admin: Boolean,
});

const instrumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  displayed: { type: Boolean, required: true },
  about: { type: String },
});

const styleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  displayed: { type: Boolean, required: true },
  about: { type: String },
});

const userModel = mongoose.model('users', userSchema);
const instrumentModel = mongoose.model('instruments', instrumentSchema);
const styleModel = mongoose.model('styles', styleSchema);

export { userModel, instrumentModel, styleModel };
