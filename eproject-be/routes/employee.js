const router = require("express").Router();
const Employee = require("../models/employee");
const bcrypt = require("bcryptjs");
const config = require("../config");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res, next) => {
  let employee = new Employee();

  employee.name = req.body.name;
  employee.email = req.body.email;
  employee.password = bcrypt.hashSync(req.body.password);
  employee.zone = req.body.zone;
  employee.role = req.body.role;
  employee.phone = req.body.phone;
  employee.image = employee.gravatar();
  employee.status = req.body.status;

  try {
    employee = await employee.save();
    if (!employee) {
      return res.status(500).json({
        success: false,
        message: "The employee cannot be created1",
      });
    }
    res.json({
      success: true,
      employee: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "The employee cannot be created2",
      error: error,
    });
  }
});

router.get("/", async (req, res, next) => {
  const employeeList = await Employee.find().select("-password");

  if (!employeeList) {
    return res.status(500).json({
      success: false,
      message: "No employee Existed",
    });
  }
  res.json({
    success: true,
    employees: employeeList,
  });
});
router.put("/:id", async (req, res, next) => {
  const employeeExist = await Employee.findById(req.params.id).select(
    "-password"
  );

  if (!employeeExist) {
    return res.status(500).json({
      success: false,
      message: "No employee Existed",
    });
  }
  let newPassword = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : employeeExist.password;

  let employee = {
    name: req.body.name,
    email: req.body.email,
    password: newPassword,
    zone: req.body.zone,
    role: req.body.role,
    phone: req.body.phone,
    // employee.image = employee.gravatar();
    status: req.body.status,
  };

  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, employee, {
      new: true,
    });

    if (!emp) {
      return res.status(500).json({
        success: false,
        message: "The employee cannot be created3",
      });
    }
    res.json({
      success: true,
      employee: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "The employee cannot be created4",
      error: error,
    });
  }
});

router.delete("/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id)
    .then((employee) => {
      if (employee) {
        return res.status(200).json({
          success: true,
          message: "The employee isd deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        error: error,
      });
    });
});

router.get("/get/count", async (req, res) => {
  const employeeCount = await Employee.count({});

  if (!employeeCount) {
    return res.status(500).json({
      success: false,
      message: "No employee existed",
    });
  }
  res.json({
    success: true,
    employeeCount: employeeCount,
  });
});

router.get("/:id", async (req, res, next) => {
  const employee = await Employee.findById(req.params.id).select("-password");

  if (!employee) {
    return res.status(500).json({
      success: false,
      message: "No employee Existed",
    });
  }
  res.json({
    success: true,
    employee: employee,
  });
});

router.post("/login", async (req, res, next) => {
  try {
    let employee = await Employee.findOne({ email: req.body.email });

    if (!employee) {
      return res.status(500).json({
        success: false,
        message: "The employee not found1",
      });
    }

    if (employee && bcrypt.compareSync(req.body.password, employee.password)) {
      const token = jwt.sign(
        {
          employeeId: employee.id,
        },
        config.SECRET,
        { expisesIn: "1d" }
      );

      res.status(200).json({
        success: true,
        employee: employee.employeeId,
        token: token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "password is wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
});
module.exports = router;
