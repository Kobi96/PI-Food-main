import style from "./Form.module.css";
import { useState } from "react";
import { postRecipe } from "../../redux/actions";
import { useDispatch } from "react-redux";
import validator from "./validation";

const Form = () => {
  const dispatch = useDispatch();

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
    setErrors({});
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
      setErrors({});
    } else if (finalCount % 2 === 1) {
      const filteredDiets = form.diets.filter(
        (dietId) => dietId !== Number(id)
      );
      setForm({ ...form, diets: filteredDiets });
      if (form.diets.length) setErrors({});
    }
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
    <div>
      <form
        className={style.form_container}
        onSubmit={submitHandler}
        noValidate
      >
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={changeHandler}
          required
        />
        {errors.name && <p className={style.errors}>{errors.name}</p>}
        <label for="resumen">Resumen del plato:</label>
        <textarea
          name="summary"
          value={form.summary}
          onChange={changeHandler}
          required
        ></textarea>
        {errors.summary && <p className={style.errors}>{errors.summary}</p>}
        <label for="healthScore">
          Nivel de comida saludable (del 1 al 100):
        </label>
        <input
          type="number"
          name="healthScore"
          value={form.healthScore}
          onChange={changeHandler}
          required
        />
        {errors.healthScore && (
          <p className={style.errors}>{errors.healthScore}</p>
        )}
        <label for="pasos">Paso a paso:</label>
        <textarea
          name="instructions"
          value={form.instructions}
          onChange={changeHandler}
          required
        ></textarea>
        {errors.instructions && (
          <p className={style.errors}>{errors.instructions}</p>
        )}
        <label for="imagen">Imagen:</label>
        <input
          type="text"
          name="image"
          value={form.image}
          autoComplete="off"
          onChange={changeHandler}
        ></input>
        {errors.image && <p className={style.errors}>{errors.image}</p>}
        <label>Tipos de dieta:</label>
        {errors.diets && <p className={style.errors}>{errors.diets}</p>}
        <input
          type="checkbox"
          id={1}
          value={form.diets}
          onChange={dietsHandler}
        />{" "}
        Gluten Free
        <input
          type="checkbox"
          id={2}
          value={form.diets}
          onChange={dietsHandler}
        />{" "}
        Dairy Free
        <input
          type="checkbox"
          id={3}
          value={form.diets}
          onChange={dietsHandler}
        />{" "}
        Lacto Ovo Vegetarian
        <input
          type="checkbox"
          id={4}
          value={form.diets}
          onChange={dietsHandler}
        />{" "}
        Vegan
        <input
          type="checkbox"
          id={5}
          value={form.diets}
          onChange={dietsHandler}
        />{" "}
        Paleolithic
        <input
          type="checkbox"
          id={6}
          value={form.diets}
          onChange={dietsHandler}
        />{" "}
        Primal
        <input
          type="checkbox"
          id={7}
          value={form.diets}
          onChange={dietsHandler}
        />{" "}
        Whole 30
        <input
          type="checkbox"
          id={8}
          value={form.diets}
          onChange={dietsHandler}
        />{" "}
        Pescatarian
        <input
          type="checkbox"
          id={9}
          value={form.diets}
          onChange={dietsHandler}
        />{" "}
        Ketogenic
        <input
          type="checkbox"
          id={10}
          value={form.diets}
          onChange={dietsHandler}
        />{" "}
        Fodmap Friendly
        <button type="submit">Crear Receta</button>
      </form>
    </div>
  );
};

export default Form;
