const validator = (data) => {
  let errors = {};

  if (!data.name) {
    errors.name = "*Ingresar un nombre";
  }

  if (!data.summary) {
    errors.summary = "*Ingresar un resumen del plato";
  } else if (data.summary.length < 75 || data.summary.length > 500) {
    errors.summary = "*El resumen debe tener entre 75 y 500 caracteres";
  }

  if (data.healthScore <= 0 || data.healthScore > 100) {
    errors.healthScore =
      "*El puntaje saludable de la receta debe ser entre 1 y 100";
  }

  if (!data.instructions) {
    errors.instructions =
      "*Ingresar un paso a paso acerca de la preparación del plato";
  } else if (data.instructions.length < 75 || data.instructions.length > 500) {
    errors.instructions =
      "*El paso a paso debe tener entre 75 y 500 caracteres";
  }

  if (!data.image) {
    errors.image = "*Ingresar un link a una imagen apropiada para la receta";
  } else if (!/\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(data.image)) {
    errors.image =
      "*El enlace debe ser una URL de imagen válida (JPEG, JPG, PNG, GIF, BMP o WebP)";
  }

  if (!data.diets.length) {
    errors.diets = "*Ingresar al menos 1 receta";
  }

  return errors;
};

export default validator;
