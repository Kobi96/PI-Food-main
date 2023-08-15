import style from "./Form.module.css";
import { useState } from "react";
import { postRecipe } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import validator from "./validation";

const Form = () => {
  const dispatch = useDispatch();

  const dietList = useSelector((state) => state.diets);

  // Estados locales
  const [form, setForm] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: 0,
    instructions: "",
    diets: [],
  });
  const [errors, setErrors] = useState({});
  const [aux, setAux] = useState([]);

  //Funciones Handlers
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });

    const validationErrors = validator({ ...form, [property]: value });

    if (validationErrors[property]) {
      setErrors({
        ...errors,
        [property]: validationErrors[property],
      });
    } else {
      setErrors({
        ...errors,
        [property]: "",
      });
    }
  };

  const dietsHandler = (event) => {
    const id = event.target.id;

    setAux([...aux, Number(id)]);

    const countOccurrences = (array, number) => {
      return array.reduce((count, current) => {
        if (current === number) {
          return count + 1;
        }
        return count;
      }, 0);
    };

    const finalCount = countOccurrences(aux, Number(id));

    if (finalCount % 2 === 0) {
      setForm({ ...form, diets: [...form.diets, Number(id)] });
    } else if (finalCount % 2 === 1) {
      const filteredDiets = form.diets.filter(
        (dietId) => dietId !== Number(id)
      );
      setForm({ ...form, diets: filteredDiets });
      if (form.diets.length);
    }

    const validationErrors = validator({ ...form, diets: form.diets });
    setErrors({
      ...errors,
      diets: form.diets.length === 0 ? [] : validationErrors.diets || "",
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const validationErrors = validator(form);
    setErrors(validationErrors);
    console.log(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(postRecipe(form));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className={style.formWrapper}>
      <form
        className={style.form_container}
        onSubmit={submitHandler}
        noValidate
      >
        <h1 className={style.form_title}>Crear Nueva Receta</h1>
        <label>Nombre:</label>
        <input
          className={style.input}
          type="text"
          name="name"
          value={form.name}
          onChange={changeHandler}
          required
        />
        {errors.name && <p className={style.errors}>{errors.name}</p>}
        <br />
        <label for="resumen">Resumen del plato:</label>
        <textarea
          className={style.textarea}
          name="summary"
          value={form.summary}
          onChange={changeHandler}
          required
        ></textarea>
        {errors.summary && <p className={style.errors}>{errors.summary}</p>}
        <br />
        <label for="healthScore">
          Nivel de comida saludable (del 1 al 100):
        </label>
        <input
          className={style.input}
          type="number"
          name="healthScore"
          value={form.healthScore}
          onChange={changeHandler}
          required
        />
        {errors.healthScore && (
          <p className={style.errors}>{errors.healthScore}</p>
        )}
        <br />
        <label for="pasos">Paso a paso:</label>
        <textarea
          className={style.textarea}
          name="instructions"
          value={form.instructions}
          onChange={changeHandler}
          required
        ></textarea>
        {errors.instructions && (
          <p className={style.errors}>{errors.instructions}</p>
        )}
        <br />
        <label for="imagen">Imagen:</label>
        <input
          className={style.input}
          type="text"
          name="image"
          value={form.image}
          autoComplete="off"
          onChange={changeHandler}
        ></input>
        {errors.image && <p className={style.errors}>{errors.image}</p>}
        <br />
        <label>Tipos de dieta:</label>
        {errors.diets && <p className={style.errors}>{errors.diets}</p>}
        <br />
        {dietList.map((diet, index) => {
          return (
            <div key={index}>
              <label htmlFor={diet.id}>{diet.name}</label>
              <input
                type="checkbox"
                id={diet.id}
                value={form.diets}
                onChange={dietsHandler}
              />
            </div>
          );
        })}
        <button className={style.submit_button} type="submit">
          Crear Receta
        </button>
      </form>
    </div>
  );
};

export default Form;
