import { useState, useEffect } from "react";

export function useTypewriter(phrases: string[]) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullPhrase = phrases[currentPhraseIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(
            currentFullPhrase.substring(0, currentText.length + 1)
          );
          if (currentText === currentFullPhrase) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setCurrentText(
            currentFullPhrase.substring(0, currentText.length - 1)
          );
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex, phrases]);

  return currentText;
}
