import { useState } from "react";
import styles from "./Form.module.css";
import validation from "../Validation/Validation";

const Form = ({ login }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); //* Nuevo estado para controlar la visibilidad de la contraseña
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    let property = event.target.name;
    let value = event.target.value;
    // console.log(property, value);
    setUserData({ ...userData, [property]: value });
    validation({ ...userData, [property]: value }, errors, setErrors);
  };
  
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); //* Cambiar el estado para alternar la visibilidad de la contraseña
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

  return (
    <div className={styles.divContainer}>
      <form className={styles.form} onSubmit={handleSubmit} >
        <div className={styles.Login}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="email">E-mail: </label>
            <input
              className={styles.input}
              type="text"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className={styles.spanErrors}> {errors.email} </p>
            )}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="password">Password: </label>
            <div className={styles.inputpasword}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"} //* Cambia el tipo según el estado showPassword
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
             <button
              type="button"
              className={styles.togglePasswordButton}
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? (
                <img 
                  className={styles.vision}
                  src="novisible.png"
                  alt="Hide Password"
                />
              ) : (
                <img
                  className={styles.vision}
                  src="visible.png"
                  alt="Show Password"
                />
              )}
              </button>
              </div>
          </div>
        <button className={styles.buttonForm} type="submit">
          Login
        </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
