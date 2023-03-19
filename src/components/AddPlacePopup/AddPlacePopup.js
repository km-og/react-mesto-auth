import { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export function AddPlacePopup({ isOpen, onClose, onUpdateCard }) {
  const [cardName, setCardName] = useState("");

  function handleAddCardName(evt) {
    setCardName(evt.target.value);
    console.log(evt.target.value);
  }

  const [cardLink, setCardLink] = useState("");

  function handleAddCardLink(evt) {
    setCardLink(evt.target.value);
  }

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateCard({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      nameBtn="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label className="popup__error-box">
          <input
            id="title-input"
            type="text"
            className="popup__item popup__item_type_name"
            name="cardName"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            value={cardName}
            onChange={handleAddCardName}
          />
          <span className="popup__error title-input-error"></span>
        </label>
        <div className="popup__error-box">
          <input
            id="link-input"
            type="url"
            className="popup__item popup__item_type_link"
            name="cardLink"
            placeholder="Ссылка на картинку"
            required
            value={cardLink}
            onChange={handleAddCardLink}
          />
          <span className="popup__error link-input-error"></span>
        </div>
      </>
    </PopupWithForm>
  );
}
