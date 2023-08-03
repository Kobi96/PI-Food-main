const cleanDiets = (arr) => {
  const array = arr.map((ele) => ele.diets).flat();

  const dietsRaw = array.filter((valor, indice) => {
    return array.indexOf(valor) === indice;
  });

  const diets = dietsRaw.map((name) => ({ name }));

  return diets;
};

const cleanDiet = (arr) => {
  const array = arr.map((ele) => {
    return {
      id: ele.id,
      name: ele.name,
      image: ele.image,
      summary: ele.summary,
      healthScore: ele.healthScore,
      instructions: ele.instructions,
      created: true,
      diets: ele.diets.map((diet) => diet.name),
    };
  });

  return array;
};
const cleanArray = (arr) => {
  const array = arr.map((ele) => {
    return {
      id: ele.id,
      name: ele.title,
      image: ele.image,
      summary: ele.summary,
      healthScore: ele.healthScore,
      diets: ele.diets.map((ele) => ele),
      instructions: ele.analyzedInstructions.reduce(
        (accumulator, instruction) => {
          const steps = instruction.steps.map((step) => step.step);
          return accumulator.concat(steps.join(" "));
        },
        ""
      ),
      created: false,
    };
  });

  return array;
};

module.exports = {
  cleanArray,
  cleanDiet,
  cleanDiets,
};
