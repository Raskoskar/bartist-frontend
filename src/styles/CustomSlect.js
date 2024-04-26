import styles from "./Profil.module.css"
export const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "1px solid #3F88C5",
    borderRadius: "16px",
    width: "100%",
    height: "44px",
    fontSize: "14px",
    color: "white", // Assure que le texte dans le contrôle est blanc
  }),
  menu: (provided) => ({
    ...provided,
    padding: "0px",
    color: "white",
    fontSize: "12px",
    backgroundColor: "#3F88C5" // Change la couleur de fond du menu déroulant
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#3F88C5" : "white",
    color: state.isSelected ? "white" : "black",
    fontSize: "12px",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#3F88C5",
    color: "white",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white" // Définit la couleur du placeholder en blanc
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "gray" : "white", // Assure que la valeur sélectionnée est aussi en blanc, sauf si désactivée
  })
};
