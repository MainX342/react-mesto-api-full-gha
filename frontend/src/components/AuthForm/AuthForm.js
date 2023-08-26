import { useContext } from "react";
import SendContext from "../../contexts/SendContext";

export default function AuthForm({
  name,
  titleButton,
  children,
  isValid,
  onSubmit,
  sendingText
}) {
  const isSending = useContext(SendContext);

  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      <button
        type="submit"
        className={`login__button${isValid ? "" : " login__button_disabled"}`}
        disabled={isSending}
      >
        {isSending ? sendingText : titleButton || "Сохранить"}
      </button>
    </form>
  );
}
