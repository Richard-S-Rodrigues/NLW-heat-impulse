import { FormEvent, useContext, useState } from "react";

import { api } from "../../services/api";
import { AuthContext } from "../../contexts/auth";

import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import styles from "./styles.module.scss";

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  async function sendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    await api.post("messages", { message });

    setMessage("");
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>
      <header className={styles.userInfo}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form
        onSubmit={sendMessage}
        method="POST"
        className={styles.sendMessageForm}
      >
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  );
}
