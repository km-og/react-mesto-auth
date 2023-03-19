function renderLoading(popup, initialValue, isLoading) {
  const saveBtn = popup.querySelector(".popup__save-button");
  if (isLoading) {
    saveBtn.textContent = "Сохранение...";
  } else {
    saveBtn.textContent = initialValue;
  }
}

export { renderLoading };
