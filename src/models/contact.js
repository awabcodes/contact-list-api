const contact = (sequelize, DataTypes) => {
  const Contact = sequelize.define("contact", {
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    }
  });

  Contact.associate = models => {
    Contact.hasMany(models.Number, { onDelete: "CASCADE" });
    Contact.hasOne(models.Image, { onDelete: "CASCADE" });
  };

  Contact.findByFirstName = async name => {
    let contact = await Contact.findOne({
      where: { firstname: name }
    });

    return contact;
  };

  Contact.findByLastName = async name => {
    let contact = await Contact.findOne({
      where: { lastname: name }
    });

    return contact;
  };

  return Contact;
};

export default contact;
