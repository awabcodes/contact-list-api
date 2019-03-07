const image = (sequelize, DataTypes) => {
  const Image = sequelize.define("image", {
    cloudinaryId: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING }
  });

  Image.associate = models => {
    Image.belongsTo(models.Contact);
  };

  Image.findByContactPk = async contactId => {
    let result = await Image.findOne({
      where: { contactId: contactId }
    });

    return result;
  };

  return Image;
};

export default image;
