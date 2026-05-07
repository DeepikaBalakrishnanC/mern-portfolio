const Certificate = require("../models/Certificate");

const getCertificates = async (req, res) => {
  const certificates = await Certificate.find().sort({ createdAt: -1 });
  res.json(certificates);
};

const createCertificate = async (req, res) => {
  const certificate = new Certificate(req.body);
  await certificate.save();
  res.status(201).json(certificate);
};

const deleteCertificate = async (req, res) => {
  const certificate = await Certificate.findByIdAndDelete(req.params.id);

  if (!certificate) {
    return res.status(404).json({ message: "Certificate not found" });
  }

  res.json({ success: true });
};

module.exports = { getCertificates, createCertificate, deleteCertificate };
