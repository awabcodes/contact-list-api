const number = (sequelize, DataTypes) => {
  const Number = sequelize.define("number", {
    number: { type: DataTypes.STRING, unique: true }
  });

  Number.associate = models => {
    Number.belongsTo(models.Contact);
  };

  Number.findByNumber = async number => {
    let result = await Number.findOne({
      where: { number: number }
    });

    return result;
  };

  Number.findAllByContactPk = async contactId => {
    let result = await Number.findAll({
      where: { contactId: contactId }
    });

    return result;
  };

  return Number;
};

export default number;
