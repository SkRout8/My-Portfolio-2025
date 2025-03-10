const Schema = require("../Model/Schema");

exports.PostData = async (req, res) => {
  try {
    const { Mail, Messege } = req.body;

    const response = await Schema.create({ Mail, Messege });

    res.status(200).json({
      success: true,
      data: response,
      message: "Sab Ho Gya",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,  
      message: "Error Ho Gya",
    });
  }
};
