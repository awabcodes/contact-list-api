const Json2csvParser = require("json2csv").Parser;

exports.getAllContacts = async (req, res) => {
  const contacts = await req.context.models.Contact.findAll({
    include: [
      {
        model: req.context.models.Number
      }
    ]
  });

  if (!contacts) {
    return res.status(404).send({ msg: "No contacts found" });
  }

  return res.send(contacts);
};

exports.getContact = async (req, res) => {
  const contact = await req.context.models.Contact.findByPk(
    req.params.contactId
  );

  if (!contact) {
    return res.status(404).send({ msg: "Contact not found" });
  }

  return res.send(contact);
};

exports.createContact = async (req, res) => {
  const contact = await req.context.models.Contact.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname
  });

  return res.send(contact);
};

exports.deleteContact = async (req, res) => {
  const result = await req.context.models.Contact.destroy({
    where: { id: req.params.contactId }
  });

  return res.send(true);
};

exports.searchContacts = async (req, res) => {
  let contact = await req.context.models.Contact.findByFirstName(
    req.params.query
  );

  if (!contact) {
    contact = await req.context.models.Contact.findByLastName(req.params.query);
  }

  if (!contact) {
    let number = await req.context.models.Number.findByNumber(req.params.query);
    if (number) {
      contact = await req.context.models.Contact.findByPk(number.contactId);
    } else {
      return res.status(404).send({ msg: "Contact not found" });
    }
  }

  return res.send(contact);
};

exports.exportToCsv = async (req, res) => {
  let contacts = await req.context.models.Contact.findAll({
    include: [
      {
        model: req.context.models.Number
      }
    ]
  });

  const fields = ["firstname", "lastname", "numbers"];

  try {
    const json2csvParser = new Json2csvParser({
      fields
    });
    const csv = json2csvParser.parse(contacts);

    res.attachment("report.csv");
    res.status(200).send(csv);
  } catch (err) {
    return res.status(500).send({ msg: "Failed to export csv" });
  }
};

exports.uploadImage = async (req, res) => {
  const image = {
    url: req.file.url,
    contactId: req.params.contactId,
    cloudinaryId: req.file.public_id
  };
  if (image) {
    req.context.models.Image.create(image);
    return res.status(200).send(image);
  } else {
    return res.status(500).send({ msg: "Failed to save image" });
  }
};

exports.getImage = async (req, res) => {
  const image = await req.context.models.Image.findByContactPk(
    req.params.contactId
  );

  if (!image) {
    res.status(404).send({ msg: "Image not found" });
  }

  return res.send(image);
};
