exports.getAllNumbers = async (req, res) => {
  const numbers = await req.context.models.Number.findAll();

  if (!numbers) {
    return res.status(404).send({ msg: "No numbers found" });
  }

  return res.send(numbers);
};

exports.getNumber = async (req, res) => {
  const number = await req.context.models.Number.findByPk(req.params.numberId);

  if (!number) {
    res.status(404).send({ msg: "Number not found" });
  }

  return res.send(number);
};

exports.createNumber = async (req, res) => {
  const number = await req.context.models.Number.findByNumber(req.body.number);

  if (number) {
    return res.status(400).send({ msg: "Number already exsists" });
  } else {
    const newNumber = await req.context.models.Number.create({
      number: req.body.number,
      contactId: req.body.contactId
    });

    return res.send(newNumber);
  }
};

exports.deleteNumber = async (req, res) => {
  const result = await req.context.models.Number.destroy({
    where: { id: req.params.numberId }
  });

  return res.send(true);
};

exports.getAllNumbersInContact = async (req, res) => {
  const numbers = await req.context.models.Number.findAllByContactPk(
    req.params.contactId
  );
  return res.send(numbers);
};
