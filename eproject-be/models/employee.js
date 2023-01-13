const mogoose = require("mongoose");
const Schema = mogoose.Schema;
const bcrypt = require("bcryptjs");

const EmployeeSchema = new Schema({
  name: String,
  password: String,
  email: { type: String, unique: true },
  zone: String,
  image: String,
  role: { type: String, default: "Employee" },
  phone: String,
  enrollDate: { type: Date, default: Date.now },
  status: { type: String, default: "Working" },
});

EmployeeSchema.methods.gravatar = function (size) {
  if (!this.size) size = 200;
  if (!this.email) {
    return "https://gravatar.com/avatar/?s" + size + "&d=retro";
  } else {
    var md5 = bcrypt.hashSync(this.email, 10);
    return "http://gravatar.com/avatar/" + md5 + "?s" + size + "&d=retro";
  }
};

module.exports = mogoose.model("Employee", EmployeeSchema);
